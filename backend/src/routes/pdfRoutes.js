/**
 * PDF routes
 * Defines routes for PDF upload and document listing (protected)
 */

import express from 'express';
import multer from 'multer';
import { uploadPDF, listDocuments } from '../controllers/pdfController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// Configure multer for file uploads (memory storage)
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

// All PDF routes require authentication
router.use(authenticate);

router.post('/upload/pdf', upload.single('pdf'), uploadPDF);
router.get('/docs', listDocuments);

export default router;

