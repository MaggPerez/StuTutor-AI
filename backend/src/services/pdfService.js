/**
 * PDF service
 * Extracts and parses PDF content into text, and uploads to Supabase Storage
 */

import pdfParse from 'pdf-parse';
import { supabase } from '../supabaseClient.js';

/**
 * Extract text content from PDF buffer
 * @param {Buffer} pdfBuffer - PDF file buffer
 * @returns {Promise<string>} Extracted text content
 */
export const extractTextFromPDF = async (pdfBuffer) => {
  try {
    const data = await pdfParse(pdfBuffer);
    return data.text;
  } catch (error) {
    console.error('PDF Extraction Error:', error);
    throw new Error('Failed to extract text from PDF. Please ensure the file is a valid PDF.');
  }
};

/**
 * Upload PDF to Supabase Storage
 * @param {Buffer} fileBuffer - PDF file buffer
 * @param {string} conversationId - Conversation ID
 * @param {string} fileName - Original file name
 * @returns {Promise<{filePath: string, publicUrl: string}>} Storage path and public URL
 */
export const uploadPDFToSupabase = async (fileBuffer, conversationId, fileName) => {
  try {
    // Create a unique file path using conversation ID and timestamp
    const timestamp = Date.now();
    const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filePath = `${conversationId}/${timestamp}_${sanitizedFileName}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('pdfs')
      .upload(filePath, fileBuffer, {
        contentType: 'application/pdf',
        upsert: false,
      });

    if (error) {
      console.error('Supabase upload error:', error);
      throw new Error(`Failed to upload PDF to storage: ${error.message}`);
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('pdfs')
      .getPublicUrl(filePath);

    return {
      filePath: data.path,
      publicUrl,
    };
  } catch (error) {
    console.error('PDF Upload Error:', error);
    throw error;
  }
};

/**
 * Get public URL for a stored PDF
 * @param {string} filePath - File path in Supabase Storage
 * @returns {string} Public URL
 */
export const getPDFUrl = (filePath) => {
  const { data: { publicUrl } } = supabase.storage
    .from('pdfs')
    .getPublicUrl(filePath);
  
  return publicUrl;
};

/**
 * Delete PDF from Supabase Storage (useful when replacing PDFs)
 * @param {string} filePath - File path in Supabase Storage
 * @returns {Promise<void>}
 */
export const deletePDFFromSupabase = async (filePath) => {
  try {
    const { error } = await supabase.storage
      .from('pdfs')
      .remove([filePath]);

    if (error) {
      console.error('Supabase delete error:', error);
      throw new Error(`Failed to delete PDF from storage: ${error.message}`);
    }
  } catch (error) {
    console.error('PDF Delete Error:', error);
    throw error;
  }
};

