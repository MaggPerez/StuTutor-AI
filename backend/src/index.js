import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import { supabase } from './supabaseClient.js';
import { getAIResponse } from './services/aiService.js';
import { extractTextFromPDF } from './services/pdfService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// In-memory storage for PDF content (conversationId -> PDF text)
const pdfContentStore = new Map();

// Configure multer for PDF uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

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

    // Get PDF content for this conversation if available
    const pdfContent = pdfContentStore.get(conversationId);
    const documentContext = pdfContent ? pdfContent.text : null;

    if (pdfContent) {
      console.log('📄 Using PDF context for AI response:', {
        conversationId,
        fileName: pdfContent.fileName,
        textLength: pdfContent.text.length,
      });
    }

    // Get AI response with PDF context
    const aiResponseText = await getAIResponse(
      message,
      conversationHistory || [],
      documentContext
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

// ===== PDF UPLOAD ENDPOINT =====
app.post('/api/upload/storage', upload.single('pdf'), async (req, res) => {
  try {
    const { conversationId } = req.body;

    console.log('📤 Upload request received:', {
      conversationId,
      hasFile: !!req.file,
      fileName: req.file?.originalname
    });

    if (!conversationId) {
      return res.status(400).json({
        success: false,
        error: 'Conversation ID is required.',
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No PDF file provided.',
      });
    }

    // Check if file is PDF
    if (req.file.mimetype !== 'application/pdf') {
      return res.status(400).json({
        success: false,
        error: 'File must be a PDF.',
      });
    }

    // Extract text from PDF
    const pdfBuffer = req.file.buffer;
    const extractedText = await extractTextFromPDF(pdfBuffer);

    // Store PDF text in memory for this conversation
    pdfContentStore.set(conversationId, {
      text: extractedText,
      fileName: req.file.originalname,
      uploadedAt: new Date().toISOString(),
    });

    console.log('✅ PDF upload successful:', {
      fileName: req.file.originalname,
      fileSize: req.file.size,
      conversationId,
      textLength: extractedText.length,
    });

    // Return success - frontend will handle the PDF using blob URLs
    res.json({
      success: true,
      data: {
        message: 'PDF uploaded successfully.',
        pdfMetadata: {
          fileName: req.file.originalname,
          fileSize: req.file.size,
          storageUrl: `local://${conversationId}/${req.file.originalname}`,
          filePath: `${conversationId}/${req.file.originalname}`,
        },
      },
    });
  } catch (error) {
    console.error('❌ Upload PDF error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
});

// Get PDF info for a conversation
app.get('/api/conversations/:id/pdf', (req, res) => {
  try {
    const { id } = req.params;
    const pdfContent = pdfContentStore.get(id);

    if (!pdfContent) {
      return res.json({
        hasPDF: false,
      });
    }

    res.json({
      hasPDF: true,
      fileName: pdfContent.fileName,
      uploadedAt: pdfContent.uploadedAt,
      textLength: pdfContent.text.length,
    });
  } catch (error) {
    console.error('Error getting PDF info:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend live → http://localhost:${PORT}`);
  console.log(`📚 PDF content storage ready (in-memory)`);
});