import { createClient } from '../../lib/supabase/client'
import type { ChatConversation, ChatMessage, PDFUpload, ConversationWithPDF } from '@/types/chat'

export class ChatService {
  private supabase = createClient()

  // ============ Conversation Methods ============

  async createConversation(title: string, userId: string): Promise<ChatConversation | null> {
    const { data, error } = await this.supabase
      .from('chat_conversations')
      .insert({
        user_id: userId,
        title,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating conversation:', error)
      return null
    }

    return data
  }

  async getConversation(conversationId: string): Promise<ConversationWithPDF | null> {
    const { data, error } = await this.supabase
      .from('chat_conversations')
      .select('*')
      .eq('id', conversationId)
      .single()

    if (error) {
      console.error('Error fetching conversation:', error)
      return null
    }

    // Fetch PDF data separately if conversation has one
    let pdf_upload = null
    if (data.pdf_upload_id) {
      const { data: pdfData } = await this.supabase
        .from('pdf_uploads')
        .select('*')
        .eq('id', data.pdf_upload_id)
        .single()

      pdf_upload = pdfData
    }

    return {
      ...data,
      pdf_upload
    }
  }

  async getUserConversations(userId: string): Promise<ConversationWithPDF[]> {
    const { data, error } = await this.supabase
      .from('chat_conversations')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false })

    if (error) {
      console.error('Error fetching conversations:', error)
      return []
    }

    if (!data) return []

    // Fetch PDF data separately for each conversation that has one
    const conversationsWithPDF = await Promise.all(
      data.map(async (conv: any) => {
        let pdf_upload = null

        if (conv.pdf_upload_id) {
          const { data: pdfData } = await this.supabase
            .from('pdf_uploads')
            .select('*')
            .eq('id', conv.pdf_upload_id)
            .single()

          pdf_upload = pdfData
        }

        // Get message count
        const { count } = await this.supabase
          .from('chat_messages')
          .select('*', { count: 'exact', head: true })
          .eq('conversation_id', conv.id)

        return {
          ...conv,
          pdf_upload,
          message_count: count || 0,
        }
      })
    )

    return conversationsWithPDF
  }

  async updateConversationTitle(conversationId: string, title: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('chat_conversations')
      .update({ title })
      .eq('id', conversationId)

    if (error) {
      console.error('Error updating conversation title:', error)
      return false
    }

    return true
  }

  async deleteConversation(conversationId: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('chat_conversations')
      .delete()
      .eq('id', conversationId)

    if (error) {
      console.error('Error deleting conversation:', error)
      return false
    }

    return true
  }

  async linkPDFToConversation(conversationId: string, pdfUploadId: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('chat_conversations')
      .update({ pdf_upload_id: pdfUploadId })
      .eq('id', conversationId)

    if (error) {
      console.error('Error linking PDF to conversation:', error)
      return false
    }

    return true
  }

  // ============ Message Methods ============

  async createMessage(
    conversationId: string,
    role: 'user' | 'assistant',
    content: string
  ): Promise<ChatMessage | null> {
    const { data, error } = await this.supabase
      .from('chat_messages')
      .insert({
        conversation_id: conversationId,
        role,
        content,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating message:', error)
      return null
    }

    return data
  }

  async getConversationMessages(conversationId: string): Promise<ChatMessage[]> {
    const { data, error } = await this.supabase
      .from('chat_messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Error fetching messages:', error)
      return []
    }

    return data
  }

  async deleteMessage(messageId: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('chat_messages')
      .delete()
      .eq('id', messageId)

    if (error) {
      console.error('Error deleting message:', error)
      return false
    }

    return true
  }

  // ============ PDF Methods ============

  async uploadPDF(
    file: File,
    userId: string,
    conversationId?: string
  ): Promise<PDFUpload | null> {
    try {
      // Create unique file path: userId/conversationId_timestamp_filename
      const timestamp = Date.now()
      const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
      const storagePath = `${userId}/${conversationId || 'temp'}_${timestamp}_${sanitizedFilename}`

      // Upload file to storage
      const { error: uploadError } = await this.supabase.storage
        .from('chat-pdfs')
        .upload(storagePath, file, {
          contentType: 'application/pdf',
          upsert: false,
        })

      if (uploadError) {
        console.error('Error uploading PDF to storage:', uploadError)
        return null
      }

      // Create PDF upload record
      const { data, error: dbError } = await this.supabase
        .from('pdf_uploads')
        .insert({
          user_id: userId,
          conversation_id: conversationId || null,
          filename: file.name,
          storage_path: storagePath,
          file_size: file.size,
        })
        .select()
        .single()

      if (dbError) {
        console.error('Error creating PDF upload record:', dbError)
        // Clean up uploaded file
        await this.supabase.storage.from('chat-pdfs').remove([storagePath])
        return null
      }

      return data
    } catch (error) {
      console.error('Unexpected error uploading PDF:', error)
      return null
    }
  }

  async getPDFUrl(storagePath: string): Promise<string | null> {
    // For private buckets, use createSignedUrl
    const { data: signedUrlData, error } = await this.supabase.storage
      .from('chat-pdfs')
      .createSignedUrl(storagePath, 3600) // 1 hour expiry

    if (error) {
      console.error('Error generating signed URL:', error)
      console.error('Storage path:', storagePath)
      return null
    }

    console.log('PDF URL generated:', signedUrlData?.signedUrl)
    return signedUrlData?.signedUrl || null
  }

  async deletePDF(pdfUploadId: string): Promise<boolean> {
    // First get the storage path
    const { data: pdfData } = await this.supabase
      .from('pdf_uploads')
      .select('storage_path')
      .eq('id', pdfUploadId)
      .single()

    if (!pdfData) {
      return false
    }

    // Delete from storage
    const { error: storageError } = await this.supabase.storage
      .from('chat-pdfs')
      .remove([pdfData.storage_path])

    if (storageError) {
      console.error('Error deleting PDF from storage:', storageError)
    }

    // Delete record from database
    const { error: dbError } = await this.supabase
      .from('pdf_uploads')
      .delete()
      .eq('id', pdfUploadId)

    if (dbError) {
      console.error('Error deleting PDF record:', dbError)
      return false
    }

    return true
  }

  // ============ Helper Methods ============

  async getCurrentUser() {
    const { data: { user } } = await this.supabase.auth.getUser()
    return user
  }
}

// Export singleton instance
export const chatService = new ChatService()
