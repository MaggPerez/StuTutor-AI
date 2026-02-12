"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Chat, ChatMessage } from '@/types/Messages'
import {
    createChat,
    getUserChats,
    getChatMessages,
    createMessage,
    updateChat,
    deleteChat as deleteChatFromDb
} from '../../lib/supabase/database-client'

interface ChatContextType {
    currentChatId: string | null
    currentChat: Chat | null
    messages: ChatMessage[]
    chats: Chat[]
    isLoading: boolean

    // Actions
    initializeChat: (chatId?: string) => Promise<void>
    sendMessage: (content: string, metadata?: any) => Promise<void>
    receiveMessage: (content: string, metadata?: any) => Promise<void>
    loadChats: () => Promise<void>
    createNewChat: (title?: string, pdfDocumentId?: string) => Promise<string>
    switchChat: (chatId: string) => Promise<void>
    updateChatTitle: (chatId: string, title: string) => Promise<void>
    deleteChat: (chatId: string) => Promise<void>
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: React.ReactNode }) {
    const params = useParams()
    const chatIdFromUrl = params?.id as string | undefined

    const [currentChatId, setCurrentChatId] = useState<string | null>(chatIdFromUrl || null)
    const [currentChat, setCurrentChat] = useState<Chat | null>(null)
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [chats, setChats] = useState<Chat[]>([])
    const [isLoading, setIsLoading] = useState(true)

    // Load chats only once on mount
    useEffect(() => {
        loadChats()
    }, [])

    // Update currentChatId when URL changes
    useEffect(() => {
        if (chatIdFromUrl && chatIdFromUrl !== currentChatId) {
            setCurrentChatId(chatIdFromUrl)
        }
    }, [chatIdFromUrl])

    // Initialize chat when currentChatId changes
    useEffect(() => {
        if (currentChatId) {
            initializeChat(currentChatId)
        }
    }, [currentChatId])



    /**
       * Initialize a chat - load its data and messages
       */
    const initializeChat = async (chatId?: string) => {
        if (!chatId) {
            // Create a new chat if no ID provided
            const newChatId = await createNewChat()
            setCurrentChatId(newChatId)
            return
        }

        // Clear messages immediately when switching chats
        setMessages([])
        setIsLoading(true)

        try {
            const messages = await getChatMessages(chatId)
            setMessages(messages)

            const chat = chats.find(c => c.id === chatId)
            if (chat) {
                setCurrentChat(chat)
            }
        } catch (error) {
            console.error('Error initializing chat:', error)
        } finally {
            setIsLoading(false)
        }
    }

    

    /**
   * Send a user message
   */
    const sendMessage = async (content: string, metadata?: any) => {
        if (!currentChatId) return

        try {
            const message = await createMessage(currentChatId, 'user', content, metadata)
            setMessages(prev => [...prev, message])

            // Update chat title if it's the first message
            if (messages.length === 0) {
                const title = content.slice(0, 50) + (content.length > 50 ? '...' : '')
                await updateChatTitle(currentChatId, title)
            }
        } catch (error) {
            console.error('Error sending message:', error)
            throw error
        }
    }



    /**
     * Receive an assistant message
     */
    const receiveMessage = async (content: string, metadata?: any) => {
        if (!currentChatId) return

        try {
            const message = await createMessage(currentChatId, 'assistant', content, metadata)
            setMessages(prev => [...prev, message])
        } catch (error) {
            console.error('Error receiving message:', error)
            throw error
        }
    }


    /**
   * Load all user chats
   */
    const loadChats = async () => {
        try {
            const userChats = await getUserChats()
            setChats(userChats)
        } catch (error) {
            console.error('Error loading chats:', error)
        }
    }



    /**
     * Create a new chat
     */
    const createNewChat = async (title?: string, pdfDocumentId?: string): Promise<string> => {
        try {
            const chat = await createChat(title, pdfDocumentId)
            setChats(prev => [chat, ...prev])
            return chat.id
        } catch (error) {
            console.error('Error creating chat:', error)
            throw error
        }
    }


    /**
   * Switch to a different chat
   */
    const switchChat = async (chatId: string) => {
        setCurrentChatId(chatId)
    }


    /**
     * Update chat title
     */
    const updateChatTitle = async (chatId: string, title: string) => {
        try {
            await updateChat(chatId, { title })
            setChats(prev => prev.map(c => c.id === chatId ? { ...c, title } : c))
            if (currentChat?.id === chatId) {
                setCurrentChat(prev => prev ? { ...prev, title } : null)
            }
        } catch (error) {
            console.error('Error updating chat title:', error)
        }
    }

    /**
     * Delete a chat
     */
    const deleteChat = async (chatId: string) => {
        try {
            await deleteChatFromDb(chatId)
            setChats(prev => prev.filter(c => c.id !== chatId))

            // If we deleted the current chat, clear the state
            if (currentChatId === chatId) {
                setCurrentChatId(null)
                setCurrentChat(null)
                setMessages([])
            }
        } catch (error) {
            console.error('Error deleting chat:', error)
            throw error
        }
    }

    return (
        <ChatContext.Provider
            value={{
                currentChatId,
                currentChat,
                messages,
                chats,
                isLoading,
                initializeChat,
                sendMessage,
                receiveMessage,
                loadChats,
                createNewChat,
                switchChat,
                updateChatTitle,
                deleteChat
            }}
        >
            {children}
        </ChatContext.Provider>
    )
}

// Custom hook to use the chat context
export function useChat() {
    const context = useContext(ChatContext)
    if (!context) {
        throw new Error('useChat must be used within a ChatProvider')
    }
    return context
}