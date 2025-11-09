import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Conversation, Message, PDFMetadata } from '@/types/chat';
import {
  createConversation as apiCreateConversation,
  getConversations as apiGetConversations,
  getMessages as apiGetMessages,
  addMessageToConversation as apiAddMessage,
} from '@/lib/api';

interface PDFState {
  fileUrl: string;
  fileName: string;
}

interface ChatContextType {
  conversations: Conversation[];
  currentConversationId: string | null;
  isTyping: boolean;
  isLoading: boolean;
  currentPDF: PDFState | null;
  createNewConversation: () => Promise<void>;
  setCurrentConversation: (id: string) => Promise<void>;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => Promise<void>;
  setIsTyping: (isTyping: boolean) => void;
  getCurrentConversation: () => Conversation | null;
  refreshConversations: () => Promise<void>;
  setCurrentPDF: (pdf: PDFState | null) => void;
  updateConversationPDFMetadata: (conversationId: string, pdfMetadata: PDFMetadata) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within ChatProvider');
  }
  return context;
};

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPDF, setCurrentPDF] = useState<PDFState | null>(null);

  // Load conversations from backend on mount
  useEffect(() => {
    loadConversations();
  }, []);

  // Load messages when conversation changes
  useEffect(() => {
    if (currentConversationId) {
      loadMessages(currentConversationId);
    }
  }, [currentConversationId]);

  // Auto-load PDF when conversation ID changes
  useEffect(() => {
    if (currentConversationId) {
      const currentConv = conversations.find((conv) => conv.id === currentConversationId);
      if (currentConv?.pdfMetadata) {
        // Load PDF from storage
        setCurrentPDF({
          fileUrl: currentConv.pdfMetadata.storageUrl,
          fileName: currentConv.pdfMetadata.fileName,
        });
      } else {
        // Clear PDF when switching to conversation without one
        setCurrentPDF(null);
      }
    }
  }, [currentConversationId]); // Only run when conversation ID changes

  // Update PDF URL when metadata is added to current conversation
  // This handles the case where PDF is uploaded after initial display
  useEffect(() => {
    if (currentConversationId) {
      const currentConv = conversations.find((conv) => conv.id === currentConversationId);
      // If conversation has PDF metadata and we have a current PDF that's different (blob URL vs storage URL)
      if (currentConv?.pdfMetadata) {
        setCurrentPDF((prevPDF) => {
          // Only update if URL changed (from blob to storage) or PDF wasn't set
          if (!prevPDF || prevPDF.fileUrl !== currentConv.pdfMetadata!.storageUrl) {
            return {
              fileUrl: currentConv.pdfMetadata!.storageUrl,
              fileName: currentConv.pdfMetadata!.fileName,
            };
          }
          return prevPDF; // No change needed
        });
      }
    }
  }, [conversations, currentConversationId]); // Only depend on conversations and conversation ID

  const loadConversations = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await apiGetConversations();

      if (error) {
        console.error('Failed to load conversations:', error);
        return;
      }

      if (data) {
        // Convert API data to Conversation type
        const conversationsData: Conversation[] = data.map((conv: any) => {
          const conversation: Conversation = {
            id: conv.id,
            title: conv.title,
            messages: [], // Messages loaded separately
            createdAt: new Date(conv.created_at),
            updatedAt: new Date(conv.updated_at),
          };

          // Add PDF metadata if available
          if (conv.pdf_storage_url && conv.pdf_file_name) {
            conversation.pdfMetadata = {
              fileName: conv.pdf_file_name,
              fileSize: conv.pdf_file_size || 0,
              storageUrl: conv.pdf_storage_url,
              filePath: conv.pdf_file_path || '',
            };
          }

          return conversation;
        });

        setConversations(conversationsData);

        // Set current conversation to the most recent one if none selected
        if (!currentConversationId && conversationsData.length > 0) {
          setCurrentConversationId(conversationsData[0].id);
        }
      }
    } catch (error) {
      console.error('Error loading conversations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMessages = async (conversationId: string) => {
    try {
      const { data, error } = await apiGetMessages(conversationId);

      if (error) {
        console.error('Failed to load messages:', error);
        return;
      }

      if (data) {
        // Update conversation with messages
        setConversations((prev) =>
          prev.map((conv) => {
            if (conv.id === conversationId) {
              const messages: Message[] = data.map((msg) => ({
                id: msg.id,
                content: msg.content,
                role: msg.role,
                timestamp: new Date(msg.timestamp),
              }));
              return { ...conv, messages };
            }
            return conv;
          })
        );
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const createNewConversation = async () => {
    try {
      const { data, error } = await apiCreateConversation('New Chat');

      if (error || !data) {
        console.error('Failed to create conversation:', error);
        return;
      }

      const newConversation: Conversation = {
        id: data.id,
        title: data.title,
        messages: [],
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at),
      };

      setConversations((prev) => [newConversation, ...prev]);
      setCurrentConversationId(newConversation.id);
    } catch (error) {
      console.error('Error creating conversation:', error);
    }
  };

  const setCurrentConversation = async (id: string) => {
    setCurrentConversationId(id);
  };

  const addMessage = async (message: Omit<Message, 'id' | 'timestamp'>) => {
    if (!currentConversationId) {
      console.error('No conversation selected');
      return;
    }

    // Add message to UI immediately for instant feedback
    const tempMessage: Message = {
      ...message,
      id: `temp-${Date.now()}-${Math.random()}`,
      timestamp: new Date(),
    };

    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === currentConversationId) {
          const updatedMessages = [...conv.messages, tempMessage];

          // Update title based on first user message
          const title =
            conv.messages.length === 0 && message.role === 'user'
              ? message.content.slice(0, 50) + (message.content.length > 50 ? '...' : '')
              : conv.title;

          return {
            ...conv,
            messages: updatedMessages,
            title,
            updatedAt: new Date(),
          };
        }
        return conv;
      })
    );

    // Save message to Supabase in the background
    try {
      const { data, error } = await apiAddMessage(
        currentConversationId,
        message.role,
        message.content
      );

      if (error) {
        console.error('Failed to save message to Supabase:', error);
        // Message is still visible in UI, just not persisted
        return;
      }

      // Update the temp message with the real ID from Supabase
      if (data) {
        setConversations((prev) =>
          prev.map((conv) => {
            if (conv.id === currentConversationId) {
              return {
                ...conv,
                messages: conv.messages.map((msg) =>
                  msg.id === tempMessage.id
                    ? {
                        ...msg,
                        id: data.id,
                        timestamp: new Date(data.timestamp),
                      }
                    : msg
                ),
              };
            }
            return conv;
          })
        );
      }
    } catch (error) {
      console.error('Error saving message:', error);
    }
  };

  const getCurrentConversation = () => {
    return conversations.find((conv) => conv.id === currentConversationId) || null;
  };

  const refreshConversations = async () => {
    await loadConversations();
  };

  const updateConversationPDFMetadata = (conversationId: string, pdfMetadata: PDFMetadata) => {
    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            pdfMetadata,
            updatedAt: new Date(),
          };
        }
        return conv;
      })
    );
  };

  return (
    <ChatContext.Provider
      value={{
        conversations,
        currentConversationId,
        isTyping,
        isLoading,
        currentPDF,
        createNewConversation,
        setCurrentConversation,
        addMessage,
        setIsTyping,
        getCurrentConversation,
        refreshConversations,
        setCurrentPDF,
        updateConversationPDFMetadata,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
