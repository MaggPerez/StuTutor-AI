export interface ChatConversation {
    id: string;
    user_id: string;
    title: string;
    pdf_upload_id: string | null;
    created_at: string;
    updated_at: string;
}

export interface ChatMessage {
    id: string;
    conversation_id: string;
    role: 'user' | 'assistant';
    content: string;
    created_at: string;
}

export interface PDFUpload {
    id: string;
    conversation_id: string | null;
    user_id: string;
    filename: string;
    storage_path: string;
    file_size: number;
    uploaded_at: string;
}

export interface ConversationWithPDF extends ChatConversation {
    pdf_upload: PDFUpload | null;
    message_count?: number;
    last_message?: string;
}

export interface MessageWithMetadata extends ChatMessage {
    timestamp: Date;
}
