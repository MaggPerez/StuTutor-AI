import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Conversation, Message } from '@/types/chat';
import {
  createConversation as apiCreateConversation,
  getConversations as apiGetConversations,
  getMessages as apiGetMessages,
} from '@/lib/api';

interface ChatContextType {
  conversations: Conversation[];
  currentConversationId: string | null;
  isTyping: boolean;
  isLoading: boolean;
  createNewConversation: () => Promise<void>;
  setCurrentConversation: (id: string) => Promise<void>;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  setIsTyping: (isTyping: boolean) => void;
  getCurrentConversation: () => Conversation | null;
  refreshConversations: () => Promise<void>;
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
        const conversationsData: Conversation[] = data.map((conv) => ({
          id: conv.id,
          title: conv.title,
          messages: [], // Messages loaded separately
          createdAt: new Date(conv.created_at),
          updatedAt: new Date(conv.updated_at),
        }));

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

  const addMessage = (message: Omit<Message, 'id' | 'timestamp'>) => {
    if (!currentConversationId) {
      console.error('No conversation selected');
      return;
    }

    const newMessage: Message = {
      ...message,
      id: `temp-${Date.now()}-${Math.random()}`,
      timestamp: new Date(),
    };

    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === currentConversationId) {
          const updatedMessages = [...conv.messages, newMessage];

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
  };

  const getCurrentConversation = () => {
    return conversations.find((conv) => conv.id === currentConversationId) || null;
  };

  const refreshConversations = async () => {
    await loadConversations();
  };

  return (
    <ChatContext.Provider
      value={{
        conversations,
        currentConversationId,
        isTyping,
        isLoading,
        createNewConversation,
        setCurrentConversation,
        addMessage,
        setIsTyping,
        getCurrentConversation,
        refreshConversations,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
