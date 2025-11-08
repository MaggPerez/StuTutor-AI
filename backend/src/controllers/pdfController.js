/**
 * PDF controller
 * Handles PDF upload, text extraction, and saving document metadata using pdfService.js
 */

import Document from '../models/Document.js';
import User from '../models/User.js';
import { sendSuccess, sendError } from '../utils/responseHelper.js';
import { extractTextFromPDF } from '../services/pdfService.js';

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

