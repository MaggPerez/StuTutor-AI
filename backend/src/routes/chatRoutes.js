/**
 * Chat routes
 * Defines routes for chat endpoints (protected)
 */

import express from 'express';
import { sendMessage, getChatHistory } from '../controllers/chatController.js';
// import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// TODO: Add proper Supabase authentication when implementing user accounts
// For now, routes are public to allow basic functionality
// router.use(authenticate);

router.post('/', sendMessage);
router.get('/:threadId', getChatHistory);

export default router;

