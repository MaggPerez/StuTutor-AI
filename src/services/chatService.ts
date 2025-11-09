import { Message } from '@/types/chat';
import {
  sendMessage as apiSendMessage,
  askPDFQuestion,
  analyzePDF,
  type ConversationHistoryItem
} from '@/lib/api';

export const sendMessageToAI = async (
  userMessage: string,
  conversationId: string,
  conversationHistory: Message[] = [],
  fileAttachment?: File
): Promise<Message> => {
  // Convert Message[] to ConversationHistoryItem[] for API
  const historyForApi: ConversationHistoryItem[] = conversationHistory.map((msg) => ({
    role: msg.role,
    content: msg.content,
  }));

  // Call the backend API
  const { data, error } = await apiSendMessage(
    conversationId,
    userMessage,
    historyForApi
  );

  if (error || !data) {
    throw new Error(error || 'Failed to get AI response');
  }

  // Convert the API response to our Message type
  const aiMessage: Message = {
    id: data.aiMessage.id,
    content: data.aiMessage.content,
    role: data.aiMessage.role,
    timestamp: new Date(data.aiMessage.timestamp),
  };

  return aiMessage;
};

export const uploadPDF = async (file: File): Promise<{ success: boolean; url?: string }> => {
  // Validate PDF file
  if (file.type !== 'application/pdf') {
    throw new Error('Only PDF files are allowed');
  }

  // Simulate upload delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Mock successful upload
  return {
    success: true,
    url: URL.createObjectURL(file),
  };
};

/**
 * Send PDF to Gemini AI for question answering
 * Uses Python backend with Gemini AI (native PDF support)
 */
export const sendPDFToGemini = async (
  pdfFile: File,
  question: string
): Promise<string> => {
  // Validate PDF file
  if (pdfFile.type !== 'application/pdf') {
    throw new Error('Only PDF files are allowed');
  }

  // If no question is provided, ask Gemini to analyze the document
  if (!question || !question.trim()) {
    const { data, error } = await analyzePDF(pdfFile);

    if (error || !data) {
      throw new Error(error || 'Failed to analyze PDF with Gemini AI');
    }

    return data.summary;
  }

  // Ask specific question about the PDF
  const { data, error } = await askPDFQuestion(pdfFile, question.trim());

  if (error || !data) {
    throw new Error(error || 'Failed to get response from Gemini AI');
  }

  return data.answer;
};
