/**
 * PDF controller
 * Handles PDF upload, text extraction, and saving document metadata using pdfService.js
 */

import { sendSuccess, sendError } from '../utils/responseHelper.js';
import { extractTextFromPDF, uploadPDFToSupabase, deletePDFFromSupabase } from '../services/pdfService.js';
import { supabase } from '../supabaseClient.js';

/**
 * Upload and process PDF
 * NOTE: This route is for legacy MongoDB-based document management
 * For Supabase-based PDF uploads, use uploadPDFToStorage instead
 */
export const uploadPDF = async (req, res, next) => {
  try {
    return sendError(res, 'This endpoint is deprecated. Use /api/upload/storage instead.', 410);
  } catch (error) {
    next(error);
  }
};

/**
 * List user documents
 * NOTE: This route is for legacy MongoDB-based document management
 * For Supabase-based documents, query the conversations table directly
 */
export const listDocuments = async (req, res, next) => {
  try {
    return sendError(res, 'This endpoint is deprecated. Use conversations API instead.', 410);
  } catch (error) {
    next(error);
  }
};

/**
 * Simple PDF upload handler (no external storage)
 * Just accepts the file and returns metadata
 */
export const uploadPDFToStorage = async (req, res, next) => {
  try {
    const { conversationId } = req.body;

    console.log('📤 Upload request received:', {
      conversationId,
      hasFile: !!req.file,
      fileName: req.file?.originalname
    });

    if (!conversationId) {
      return sendError(res, 'Conversation ID is required.', 400);
    }

    if (!req.file) {
      return sendError(res, 'No PDF file provided.', 400);
    }

    // Check if file is PDF
    if (req.file.mimetype !== 'application/pdf') {
      return sendError(res, 'File must be a PDF.', 400);
    }

    console.log('✅ PDF upload successful:', {
      fileName: req.file.originalname,
      fileSize: req.file.size,
      conversationId
    });

    // Return success - frontend will handle the PDF using blob URLs
    return sendSuccess(res, {
      message: 'PDF uploaded successfully.',
      pdfMetadata: {
        fileName: req.file.originalname,
        fileSize: req.file.size,
        storageUrl: `local://${conversationId}/${req.file.originalname}`,
        filePath: `${conversationId}/${req.file.originalname}`,
      },
    }, 200);
  } catch (error) {
    console.error('❌ Upload PDF error:', error);
    next(error);
  }
};

