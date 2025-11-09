/**
 * PDF controller
 * Handles PDF upload, text extraction, and saving document metadata using pdfService.js
 */

import Document from '../models/Document.js';
import User from '../models/User.js';
import { sendSuccess, sendError } from '../utils/responseHelper.js';
import { extractTextFromPDF, uploadPDFToSupabase, deletePDFFromSupabase } from '../services/pdfService.js';
import { supabase } from '../supabaseClient.js';

/**
 * Upload and process PDF
 */
export const uploadPDF = async (req, res, next) => {
  try {
    const userId = req.userId;

    if (!req.file) {
      return sendError(res, 'No PDF file provided.', 400);
    }

    // Check if file is PDF
    if (req.file.mimetype !== 'application/pdf') {
      return sendError(res, 'File must be a PDF.', 400);
    }

    // Extract text from PDF
    const pdfBuffer = req.file.buffer;
    const extractedText = await extractTextFromPDF(pdfBuffer);

    // Create document record
    const document = await Document.create({
      userId,
      title: req.file.originalname.replace('.pdf', ''),
      originalFilename: req.file.originalname,
      content: extractedText,
      fileSize: req.file.size,
    });

    // Add document reference to user
    await User.findByIdAndUpdate(userId, {
      $push: { documents: document._id },
    });

    return sendSuccess(res, {
      message: 'File uploaded successfully.',
      documentId: document._id,
      title: document.title,
      fileSize: document.fileSize,
    }, 201);
  } catch (error) {
    next(error);
  }
};

/**
 * List user documents
 */
export const listDocuments = async (req, res, next) => {
  try {
    const userId = req.userId;

    const documents = await Document.find({ userId })
      .select('-content') // Exclude content for list view
      .sort({ uploadDate: -1 });

    return sendSuccess(res, {
      documents: documents.map(doc => ({
        id: doc._id,
        title: doc.title,
        originalFilename: doc.originalFilename,
        fileSize: doc.fileSize,
        uploadDate: doc.uploadDate,
        createdAt: doc.createdAt,
      })),
      count: documents.length,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Upload PDF to Supabase Storage and link to conversation
 */
export const uploadPDFToStorage = async (req, res, next) => {
  try {
    const { conversationId } = req.body;

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

    // Check if conversation exists
    const { data: conversation, error: conversationError } = await supabase
      .from('conversations')
      .select('id, pdf_file_path')
      .eq('id', conversationId)
      .single();

    if (conversationError || !conversation) {
      return sendError(res, 'Conversation not found.', 404);
    }

    // Delete old PDF if exists
    if (conversation.pdf_file_path) {
      try {
        await deletePDFFromSupabase(conversation.pdf_file_path);
      } catch (deleteError) {
        console.warn('Failed to delete old PDF:', deleteError);
        // Continue anyway - old file will remain but new one will be used
      }
    }

    // Upload PDF to Supabase Storage
    const pdfBuffer = req.file.buffer;
    const { filePath, publicUrl } = await uploadPDFToSupabase(
      pdfBuffer,
      conversationId,
      req.file.originalname
    );

    // Update conversation with PDF metadata
    const { data: updatedConversation, error: updateError } = await supabase
      .from('conversations')
      .update({
        pdf_file_name: req.file.originalname,
        pdf_file_path: filePath,
        pdf_file_size: req.file.size,
        pdf_storage_url: publicUrl,
        updated_at: new Date().toISOString(),
      })
      .eq('id', conversationId)
      .select()
      .single();

    if (updateError) {
      console.error('Failed to update conversation:', updateError);
      return sendError(res, 'Failed to update conversation with PDF metadata.', 500);
    }

    return sendSuccess(res, {
      message: 'PDF uploaded successfully.',
      pdfMetadata: {
        fileName: req.file.originalname,
        fileSize: req.file.size,
        storageUrl: publicUrl,
        filePath: filePath,
      },
    }, 200);
  } catch (error) {
    console.error('Upload PDF error:', error);
    next(error);
  }
};

