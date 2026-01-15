'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { chatService } from '@/lib/chat-service'
import type { ChatConversation, ChatMessage, PDFUpload, ConversationWithPDF } from '@/types/chat'

interface ChatContextType {
  // Current conversation
  currentConversation: ConversationWithPDF | null
  setCurrentConversation: (conversation: ConversationWithPDF | null) => void

  // Messages
  messages: ChatMessage[]
  addMessage: (role: 'user' | 'assistant', content: string) => Promise<void>
  loadMessages: (conversationId: string) => Promise<void>

  // PDF
  currentPDF: PDFUpload | null
  currentPDFUrl: string | null
  uploadPDF: (file: File) => Promise<boolean>

  // Conversations list
  conversations: ConversationWithPDF[]
  refreshConversations: () => Promise<void>
  createNewConversation: (title: string) => Promise<void>
  deleteConversation: (conversationId: string) => Promise<void>
  updateConversationTitle: (conversationId: string, title: string) => Promise<void>

  // Loading states
  isLoading: boolean

  // User
  userId: string | null
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: ReactNode }) {
  const [currentConversation, setCurrentConversation] = useState<ConversationWithPDF | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [currentPDF, setCurrentPDF] = useState<PDFUpload | null>(null)
  const [currentPDFUrl, setCurrentPDFUrl] = useState<string | null>(null)
  const [conversations, setConversations] = useState<ConversationWithPDF[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)

  // Load user on mount
  useEffect(() => {
    const loadUser = async () => {
      const user = await chatService.getCurrentUser()
      if (user) {
        setUserId(user.id)
        // Load conversations directly with user ID
        const convos = await chatService.getUserConversations(user.id)
        setConversations(convos)
      }
    }
    loadUser()
  }, [])

  // Load PDF URL when currentPDF changes
  useEffect(() => {
    const loadPDFUrl = async () => {
      if (currentPDF) {
        console.log('Loading PDF URL for:', currentPDF.storage_path)
        const url = await chatService.getPDFUrl(currentPDF.storage_path)
        console.log('PDF URL loaded:', url)
        setCurrentPDFUrl(url)
      } else {
        console.log('No current PDF, clearing URL')
        setCurrentPDFUrl(null)
      }
    }
    loadPDFUrl()
  }, [currentPDF])

  // Update currentPDF when conversation changes
  useEffect(() => {
    if (currentConversation?.pdf_upload) {
      setCurrentPDF(currentConversation.pdf_upload)
    } else {
      setCurrentPDF(null)
    }
  }, [currentConversation])

  const refreshConversations = async () => {
    if (!userId) return

    setIsLoading(true)
    try {
      const convos = await chatService.getUserConversations(userId)
      setConversations(convos)
    } finally {
      setIsLoading(false)
    }
  }

  const createNewConversation = async (title: string) => {
    if (!userId) return

    setIsLoading(true)
    try {
      const newConvo = await chatService.createConversation(title, userId)
      if (newConvo) {
        const convoWithPDF: ConversationWithPDF = { ...newConvo, pdf_upload: null }
        setCurrentConversation(convoWithPDF)
        setMessages([])
        await refreshConversations()
      }
    } finally {
      setIsLoading(false)
    }
  }

  const loadMessages = async (conversationId: string) => {
    setIsLoading(true)
    try {
      const [convo, msgs] = await Promise.all([
        chatService.getConversation(conversationId),
        chatService.getConversationMessages(conversationId)
      ])

      if (convo) {
        setCurrentConversation(convo)
      }
      setMessages(msgs)
    } finally {
      setIsLoading(false)
    }
  }

  const addMessage = async (role: 'user' | 'assistant', content: string) => {
    if (!currentConversation) {
      console.error('Cannot add message: No current conversation')
      return
    }

    console.log('Adding message:', { role, content, conversationId: currentConversation.id })

    const newMessage = await chatService.createMessage(
      currentConversation.id,
      role,
      content
    )

    if (newMessage) {
      console.log('Message created successfully:', newMessage)
      setMessages(prev => {
        const updated = [...prev, newMessage]
        console.log('Messages updated. Count:', updated.length)
        return updated
      })
    } else {
      console.error('Failed to create message')
    }
  }

  const uploadPDF = async (file: File): Promise<boolean> => {
    if (!userId) return false

    setIsLoading(true)
    try {
      // If no current conversation, create one
      let conversationId = currentConversation?.id

      if (!conversationId) {
        const title = `Chat about ${file.name}`
        const newConvo = await chatService.createConversation(title, userId)
        if (!newConvo) return false

        conversationId = newConvo.id
        setCurrentConversation({ ...newConvo, pdf_upload: null })
      }

      // Upload PDF
      const pdfUpload = await chatService.uploadPDF(file, userId, conversationId)
      if (!pdfUpload) return false

      // Link PDF to conversation
      await chatService.linkPDFToConversation(conversationId, pdfUpload.id)

      // Update current conversation
      const updatedConvo = await chatService.getConversation(conversationId)
      if (updatedConvo) {
        setCurrentConversation(updatedConvo)
      }

      await refreshConversations()
      return true
    } finally {
      setIsLoading(false)
    }
  }

  const deleteConversation = async (conversationId: string) => {
    setIsLoading(true)
    try {
      await chatService.deleteConversation(conversationId)

      if (currentConversation?.id === conversationId) {
        setCurrentConversation(null)
        setMessages([])
      }

      await refreshConversations()
    } finally {
      setIsLoading(false)
    }
  }

  const updateConversationTitle = async (conversationId: string, title: string) => {
    await chatService.updateConversationTitle(conversationId, title)
    await refreshConversations()

    if (currentConversation?.id === conversationId) {
      setCurrentConversation({ ...currentConversation, title })
    }
  }

  return (
    <ChatContext.Provider
      value={{
        currentConversation,
        setCurrentConversation,
        messages,
        addMessage,
        loadMessages,
        currentPDF,
        currentPDFUrl,
        uploadPDF,
        conversations,
        refreshConversations,
        createNewConversation,
        deleteConversation,
        updateConversationTitle,
        isLoading,
        userId,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export function useChatContext() {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider')
  }
  return context
}
