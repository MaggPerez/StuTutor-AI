import { Message } from '@/types/chat';

// Mock AI responses for demonstration
const mockResponses = [
  "I'd be happy to help you with that! Could you please provide more details about what you're studying?",
  "That's a great question! Let me break this down for you step by step.",
  "Based on the document you've uploaded, I can help explain this concept in detail.",
  "I understand your question. Here's an explanation that might help clarify things.",
  "Let me help you understand this better. This topic is important because...",
  "Great question! This is a fundamental concept in this subject area.",
];

export const sendMessageToAI = async (
  userMessage: string,
  fileAttachment?: File
): Promise<Message> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000));

  // Get a random response
  const responseContent =
    mockResponses[Math.floor(Math.random() * mockResponses.length)];

  const response: Message = {
    id: `msg-${Date.now()}-${Math.random()}`,
    content: responseContent,
    role: 'assistant',
    timestamp: new Date(),
  };

  return response;
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
