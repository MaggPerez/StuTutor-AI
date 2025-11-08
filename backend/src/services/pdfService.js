/**
 * PDF service
 * Extracts and parses PDF content into text
 */

import pdfParse from 'pdf-parse';

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

