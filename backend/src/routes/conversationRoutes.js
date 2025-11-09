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
} from '../controllers/conversationController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// All conversation routes require authentication
router.use(authenticate);

// Conversation routes
router.get('/', getConversations);
router.post('/', createConversation);
router.get('/:conversationId', getConversation);
router.delete('/:conversationId', deleteConversation);

// Message routes
router.get('/:conversationId/messages', getMessages);

export default router;

