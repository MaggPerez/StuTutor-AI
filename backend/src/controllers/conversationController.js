/**
 * Conversation controller
 * Handles conversation CRUD operations with Supabase
 */

import { supabase } from '../supabaseClient.js';
import { sendSuccess, sendError } from '../utils/responseHelper.js';

/**
 * Get all conversations
 */
export const getConversations = async (req, res, next) => {
  try {
    const { data: conversations, error } = await supabase
      .from('conversations')
      .select('id, title, created_at, updated_at, pdf_file_name, pdf_file_path, pdf_file_size, pdf_storage_url')
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return sendError(res, 'Failed to fetch conversations.', 500);
    }

    return res.json(conversations || []);
  } catch (error) {
    console.error('Get conversations error:', error);
    next(error);
  }
};

/**
 * Create a new conversation
 */
export const createConversation = async (req, res, next) => {
  try {
    const { title } = req.body;

    const { data: conversation, error } = await supabase
      .from('conversations')
      .insert({
        title: title || 'New Conversation',
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return sendError(res, 'Failed to create conversation.', 500);
    }

    return res.status(201).json(conversation);
  } catch (error) {
    console.error('Create conversation error:', error);
    next(error);
  }
};

/**
 * Get messages for a conversation
 */
export const getMessages = async (req, res, next) => {
  try {
    const { conversationId } = req.params;

    const { data: messages, error } = await supabase
      .from('messages')
      .select('id, conversation_id, role, content, timestamp')
      .eq('conversation_id', conversationId)
      .order('timestamp', { ascending: true });

    if (error) {
      console.error('Supabase error:', error);
      return sendError(res, 'Failed to fetch messages.', 500);
    }

    return res.json(messages || []);
  } catch (error) {
    console.error('Get messages error:', error);
    next(error);
  }
};

/**
 * Delete a conversation
 */
export const deleteConversation = async (req, res, next) => {
  try {
    const { conversationId } = req.params;

    // Delete conversation (messages will cascade delete due to foreign key)
    const { error } = await supabase
      .from('conversations')
      .delete()
      .eq('id', conversationId);

    if (error) {
      console.error('Supabase error:', error);
      return sendError(res, 'Failed to delete conversation.', 500);
    }

    return sendSuccess(res, { message: 'Conversation deleted successfully.' });
  } catch (error) {
    console.error('Delete conversation error:', error);
    next(error);
  }
};

/**
 * Get a single conversation by ID (including PDF metadata)
 */
export const getConversation = async (req, res, next) => {
  try {
    const { conversationId } = req.params;

    const { data: conversation, error } = await supabase
      .from('conversations')
      .select('id, title, created_at, updated_at, pdf_file_name, pdf_file_path, pdf_file_size, pdf_storage_url')
      .eq('id', conversationId)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return sendError(res, 'Conversation not found.', 404);
    }

    return res.json(conversation);
  } catch (error) {
    console.error('Get conversation error:', error);
    next(error);
  }
};

/**
 * Add a message to a conversation
 */
export const addMessage = async (req, res, next) => {
  try {
    const { conversationId } = req.params;
    const { role, content } = req.body;

    // Validate input
    if (!role || !content) {
      return sendError(res, 'Role and content are required.', 400);
    }

    if (!['user', 'assistant'].includes(role)) {
      return sendError(res, 'Role must be either "user" or "assistant".', 400);
    }

    // Check if conversation exists
    const { data: conversation, error: convError } = await supabase
      .from('conversations')
      .select('id')
      .eq('id', conversationId)
      .single();

    if (convError || !conversation) {
      return sendError(res, 'Conversation not found.', 404);
    }

    // Insert message
    const { data: message, error: insertError } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
        role,
        content,
      })
      .select()
      .single();

    if (insertError) {
      console.error('Supabase error:', insertError);
      return sendError(res, 'Failed to add message.', 500);
    }

    return res.status(201).json(message);
  } catch (error) {
    console.error('Add message error:', error);
    next(error);
  }
};

