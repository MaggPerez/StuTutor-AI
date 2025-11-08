import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { Conversation, Message } from '@/types/chat';

interface ChatContextType {
  conversations: Conversation[];
  currentConversationId: string | null;
  isTyping: boolean;
  createNewConversation: () => void;
  setCurrentConversation: (id: string) => void;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  setIsTyping: (isTyping: boolean) => void;
  getCurrentConversation: () => Conversation | null;
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

  const createNewConversation = () => {
    const newConversation: Conversation = {
      id: `conv-${Date.now()}`,
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setConversations((prev) => [newConversation, ...prev]);
    setCurrentConversationId(newConversation.id);
  };

  const setCurrentConversation = (id: string) => {
    setCurrentConversationId(id);
  };

  const addMessage = (message: Omit<Message, 'id' | 'timestamp'>) => {
    if (!currentConversationId) {
      // If no conversation exists, create one
      createNewConversation();
      // We'll add the message in the next render cycle
      setTimeout(() => addMessage(message), 0);
      return;
    }

    const newMessage: Message = {
      ...message,
      id: `msg-${Date.now()}-${Math.random()}`,
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

  return (
    <ChatContext.Provider
      value={{
        conversations,
        currentConversationId,
        isTyping,
        createNewConversation,
        setCurrentConversation,
        addMessage,
        setIsTyping,
        getCurrentConversation,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
