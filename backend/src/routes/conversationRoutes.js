/**
 * Conversation routes
 * Defines routes for conversation CRUD operations
 */

import express from 'express';
import {
  getConversations,
  createConversation,
  getMessages,
  deleteConversation,
  getConversation,
  addMessage,
} from '../controllers/conversationController.js';
// import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// TODO: Add proper Supabase authentication when implementing user accounts
// For now, routes are public to allow basic functionality
// router.use(authenticate);

// Conversation routes
router.get('/', getConversations);
router.post('/', createConversation);
router.get('/:conversationId', getConversation);
router.delete('/:conversationId', deleteConversation);

// Message routes
router.get('/:conversationId/messages', getMessages);
router.post('/:conversationId/messages', addMessage);

export default router;

