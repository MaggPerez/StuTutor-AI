import { createClient } from './client'
import { Chat, ChatMessage, PDFDocument } from '@/types/Messages'


export async function createChat(title: string = "New Chat", pdfDocumentId?: string) {
    const supabase = createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        throw new Error('User not found')
    }

    const { data, error } = await supabase.from('chats').insert({
        user_id: user.id,
        title: title,
        pdfDocumentId: pdfDocumentId
    }).select().single()


    if (error) {
        throw new Error('Failed to create chat: ' + error.message)
    }
    return transformChatFromDB(data)

}


/**
 * Gets all chats for the current user
 */
export async function getUserChats(limit: number = 20): Promise<Chat[]> {
    const supabase = createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')

    const { data, error } = await supabase
        .from('chats')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })
        .limit(limit)

    if (error) throw error

    return data.map(transformChatFromDB)
}


/**
 * Gets a single chat by ID
 */
export async function getChatById(chatId: string | null): Promise<Chat | null> {
    const supabase = createClient()

    const { data, error } = await supabase
        .from('chats')
        .select('*')
        .eq('id', chatId)
        .single()

    if (error) {
        if (error.code === 'PGRST116') return null // Not found
        throw error
    }

    return transformChatFromDB(data)
}


/**
 * Updates a chat
 */
export async function updateChat(chatId: string, updates: Partial<Chat>) {
    const supabase = createClient()

    const { data, error } = await supabase
        .from('chats')
        .update({
            title: updates.title,
            pdf_document_id: updates.pdfDocumentId,
            pdf_document_name: updates.pdfDocumentName,
            pdf_document_url: updates.pdfDocumentUrl
        })
        .eq('id', chatId)
        .select()
        .single()

    if (error) throw error

    return transformChatFromDB(data)
}


/**
 * Deletes a chat (soft delete)
 */
export async function deleteChat(chatId: string) {
    const supabase = createClient()

    const { data, error } = await supabase
        .from('chats')
        .delete()
        .eq('id', chatId)
        .select()
        .single()

    if (error) throw error

    return transformChatFromDB(data)
}


// =============================== MESSAGE OPERATIONS ===============================
/**
 * Gets all messages for a chat
 */
export async function getChatMessages(chatId: string): Promise<ChatMessage[]> {
    const supabase = createClient()

    const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('chat_id', chatId)
        .order('timestamp', { ascending: true })

    if (error) throw error

    return data.map(transformMessageFromDB)
}


/**
 * Creates a new message
 */
export async function createMessage(
    chatId: string,
    role: 'user' | 'assistant',
    content: string,
    metadata?: any
): Promise<ChatMessage> {
    const supabase = createClient()

    const { data, error } = await supabase
        .from('chat_messages')
        .insert({
            chat_id: chatId,
            role,
            content,
            metadata: metadata || {}
        })
        .select()
        .single()

    if (error) throw error

    return transformMessageFromDB(data)
}


/**
 * Creates multiple messages in batch
 */
export async function createMessages(
    chatId: string,
    messages: Array<{ role: 'user' | 'assistant'; content: string; metadata?: any }>
): Promise<ChatMessage[]> {
    const supabase = createClient()

    const messagesToInsert = messages.map(msg => ({
        chat_id: chatId,
        role: msg.role,
        content: msg.content,
        metadata: msg.metadata || {}
    }))

    const { data, error } = await supabase
        .from('chat_messages')
        .insert(messagesToInsert)
        .select()

    if (error) throw error

    return data.map(transformMessageFromDB)
}


// =============================== PDF OPERATIONS ===============================

/**
 * Creates a PDF document record
 */
export async function createPDFDocument(
    fileName: string,
    fileSize: number,
    storagePath: string,
    metadata?: any
): Promise<PDFDocument> {
    const supabase = createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')

    const { data, error } = await supabase
        .from('pdf_documents')
        .insert({
            user_id: user.id,
            file_name: fileName,
            file_size: fileSize,
            storage_path: storagePath,
            metadata: metadata || {}
        })
        .select()
        .single()

    if (error) throw error

    return transformPDFFromDB(data)
}




/**
 * Gets a PDF document by ID
 */
export async function getPDFDocument(pdfId: string): Promise<PDFDocument | null> {
    const supabase = createClient()

    const { data, error } = await supabase
        .from('pdf_documents')
        .select('*')
        .eq('id', pdfId)
        .single()

    if (error) {
        if (error.code === 'PGRST116') return null
        throw error
    }

    return transformPDFFromDB(data)
}



export async function getPDFDocumentName(chatId: string | null) {
    const supabase = createClient()
    const { data, error } = await supabase.from('chats').select('*').eq('id', chatId).single()
    if (error) {
        console.error('Failed to get PDF document name:', error.message)
        return null
    }
    return data
}



/**
 * Stores a PDF file in the database
 */
export async function storePDF(file: File) {
    const supabase = createClient()
    const { data, error } = await supabase.storage.from('pdf-documents').upload(file.name, file, {
        upsert: true,
    })
    if (error) {
        throw new Error('Failed to store PDF: ' + error.message)
    }
    return data
}



/**
 * Gets a PDF URL by chat ID
 */
export async function getPDFUrl(chatId: string | null) {    
    const supabase = createClient()
    const chat = await getPDFDocumentName(chatId)
    if (!chat) {
        console.error('Chat not found')
        return null
    }
    const fileName = chat.pdf_document_name
    

    if (!fileName) {
        console.error('PDF document name not found')
        return null
    }
    
    const { data, error } = await supabase.storage.from('pdf-documents').download(fileName)
    
    if (error) {
        console.error('Failed to download PDF:', error.message)
        return null
    }
    return data
}



// =============================== HELPER FUNCTIONS ===============================


/**
 * Transform database chat to TypeScript interface
 */
function transformChatFromDB(data: any): Chat {
    return {
        id: data.id,
        userId: data.user_id,
        title: data.title,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at),
        pdfDocumentId: data.pdf_document_id,
        pdfDocumentName: data.pdf_document_name,
        pdfDocumentUrl: data.pdf_document_url,
        messageCount: data.message_count
    }
}


/**
 * Transform database message to TypeScript interface
 */
function transformMessageFromDB(data: any): ChatMessage {
    return {
        id: data.id,
        chatId: data.chat_id,
        role: data.role,
        content: data.content,
        timestamp: new Date(data.timestamp),
        metadata: data.metadata
    }
}

/**
 * Transform database PDF to TypeScript interface
 */
function transformPDFFromDB(data: any): PDFDocument {
    return {
        id: data.id,
        userId: data.user_id,
        fileName: data.file_name,
        fileSize: data.file_size,
        storagePath: data.storage_path,
        publicUrl: data.public_url,
        uploadedAt: new Date(data.uploaded_at),
        metadata: data.metadata
    }
}
