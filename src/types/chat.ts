export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  fileAttachment?: FileAttachment;
}

export interface FileAttachment {
  name: string;
  size: number;
  type: string;
  url?: string;
}

export interface PDFMetadata {
  fileName: string;
  fileSize: number;
  storageUrl: string;
  filePath: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  pdfMetadata?: PDFMetadata;
}

export interface ChatState {
  conversations: Conversation[];
  currentConversationId: string | null;
  isTyping: boolean;
}
