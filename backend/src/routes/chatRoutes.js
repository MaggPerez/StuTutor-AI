/**
 * Chat routes
 * Defines routes for chat endpoints (protected)
 */

import express from 'express';
import { sendMessage, getChatHistory } from '../controllers/chatController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// All chat routes require authentication
router.use(authenticate);

router.post('/', sendMessage);
router.get('/:threadId', getChatHistory);

export default router;

