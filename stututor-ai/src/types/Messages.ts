export interface Chat {
    id: string
    userId: string
    title: string
    createdAt: Date
    updatedAt: Date
    pdfDocumentId?: string | null
    pdfDocumentName?: string | null
    pdfDocumentUrl?: string | null
    messageCount?: number
    chatMessages?: ChatMessage[]
}

export interface ChatMessage {
    id: string
    chatId: string
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
    metadata?: MessageMetadata | null
}

export interface MessageMetadata {
    pdfPageReferences?: number[]
    tokenCount?: number
    modelUsed?: string
    processingTime?: number
    errorMessage?: string
}

export interface PDFDocument {
    id: string
    userId: string
    fileName: string
    fileSize: number
    storagePath: string
    publicUrl?: string | null
    uploadedAt: Date
    metadata?: PDFMetadata | null
}

export interface PDFMetadata {
    pageCount?: number
    author?: string
    title?: string
    subject?: string
    createdAt?: string
    modifiedAt?: string
}

