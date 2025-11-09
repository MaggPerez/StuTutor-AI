import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { supabase } from './supabaseClient.js';
import { getAIResponse } from './services/aiService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ message: 'Backend + Supabase OK!' });
});

app.get('/api/tutors', async (req, res) => {
  const { data, error } = await supabase.from('tutors').select('*');
  if (error) return res.status(400).json({ error: error.message });
  res.json(data || []);
});

// ===== CHAT ENDPOINTS =====

// Create a new conversation
app.post('/api/conversations', async (req, res) => {
  try {
    const { title } = req.body;

    const { data, error } = await supabase
      .from('conversations')
      .insert([{ title: title || 'New Conversation' }])
      .select()
      .single();

    if (error) {
      console.error('Error creating conversation:', error);
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (error) {
    console.error('Server error creating conversation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all conversations
app.get('/api/conversations', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Error fetching conversations:', error);
      return res.status(400).json({ error: error.message });
    }

    res.json(data || []);
  } catch (error) {
    console.error('Server error fetching conversations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get messages for a specific conversation
app.get('/api/conversations/:id/messages', async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', id)
      .order('timestamp', { ascending: true });

    if (error) {
      console.error('Error fetching messages:', error);
      return res.status(400).json({ error: error.message });
    }

    res.json(data || []);
  } catch (error) {
    console.error('Server error fetching messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Send a message and get AI response
app.post('/api/chat/send', async (req, res) => {
  try {
    const { conversationId, message, conversationHistory } = req.body;

    if (!conversationId || !message) {
      return res.status(400).json({ error: 'conversationId and message are required' });
    }

    // Save user message to database
    const { data: userMessage, error: userMessageError } = await supabase
      .from('messages')
      .insert([{
        conversation_id: conversationId,
        role: 'user',
        content: message,
      }])
      .select()
      .single();

    if (userMessageError) {
      console.error('Error saving user message:', userMessageError);
      return res.status(400).json({ error: userMessageError.message });
    }

    // Get AI response
    const aiResponseText = await getAIResponse(
      message,
      conversationHistory || [],
      null // documentContext - can be added later
    );

    // Save AI response to database
    const { data: aiMessage, error: aiMessageError } = await supabase
      .from('messages')
      .insert([{
        conversation_id: conversationId,
        role: 'assistant',
        content: aiResponseText,
      }])
      .select()
      .single();

    if (aiMessageError) {
      console.error('Error saving AI message:', aiMessageError);
      return res.status(400).json({ error: aiMessageError.message });
    }

    // Note: updated_at is automatically handled by database trigger
    // No need to manually update it

    // Return both messages
    res.json({
      userMessage,
      aiMessage,
    });
  } catch (error) {
    console.error('Server error sending message:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    res.status(500).json({ error: errorMessage });
  }
});

// Delete a conversation
app.delete('/api/conversations/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('conversations')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting conversation:', error);
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: 'Conversation deleted successfully' });
  } catch (error) {
    console.error('Server error deleting conversation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend live → http://localhost:${PORT}`);
});