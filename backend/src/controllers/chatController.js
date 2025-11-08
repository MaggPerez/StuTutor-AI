/**
 * Chat controller
 * Handles user message input, AI responses, and thread tracking via aiService.js
 */

import Chat from '../models/Chat.js';
import User from '../models/User.js';
import Document from '../models/Document.js';
import { sendSuccess, sendError } from '../utils/responseHelper.js';
import { getAIResponse } from '../services/aiService.js';
import { v4 as uuidv4 } from 'uuid';

/**
 * Send user message and get AI response
 */
export const sendMessage = async (req, res, next) => {
  try {
    const { message, threadId, documentId } = req.body;
    const userId = req.userId;

    // Validation
    if (!message || !message.trim()) {
      return sendError(res, 'Message is required.', 400);
    }

    let chat;
    let currentThreadId = threadId;

    // Get or create chat thread
    if (currentThreadId) {
      chat = await Chat.findOne({ threadId: currentThreadId, userId });
      if (!chat) {
        return sendError(res, 'Chat thread not found.', 404);
      }
    } else {
      // Create new thread
      currentThreadId = uuidv4();
      chat = await Chat.create({
        userId,
        threadId: currentThreadId,
        messages: [],
        documentId: documentId || null,
      });

      // Add chat reference to user
      await User.findByIdAndUpdate(userId, {
        $push: { chats: chat._id },
      });
    }

    // Get document context if documentId is provided
    let documentContext = null;
    if (chat.documentId || documentId) {
      const document = await Document.findById(chat.documentId || documentId);
      if (document) {
        documentContext = document.content;
      }
    }

    // Add user message to chat
    chat.messages.push({
      role: 'user',
      content: message.trim(),
      timestamp: new Date(),
    });

    // Get conversation history for context
    const conversationHistory = chat.messages.slice(-10).map(msg => ({
      role: msg.role,
      content: msg.content,
    }));

    // Get AI response
    const aiResponse = await getAIResponse(
      message.trim(),
      conversationHistory,
      documentContext
    );

    // Add AI response to chat
    chat.messages.push({
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date(),
    });

    // Save chat
    await chat.save();

    return sendSuccess(res, {
      message: 'Message sent successfully.',
      threadId: currentThreadId,
      response: aiResponse,
      chatHistory: chat.messages,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Fetch chat history by threadId
 */
export const getChatHistory = async (req, res, next) => {
  try {
    const { threadId } = req.params;
    const userId = req.userId;

    const chat = await Chat.findOne({ threadId, userId });

    if (!chat) {
      return sendError(res, 'Chat thread not found.', 404);
    }

    return sendSuccess(res, {
      threadId: chat.threadId,
      messages: chat.messages,
      documentId: chat.documentId,
      createdAt: chat.createdAt,
      updatedAt: chat.updatedAt,
    });
  } catch (error) {
    next(error);
  }
};

