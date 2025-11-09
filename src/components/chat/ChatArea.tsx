import React from 'react';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { useChatContext } from '@/context/ChatContext';
import { sendMessageToAI } from '@/services/chatService';
import type { FileAttachment } from '@/types/chat';

export const ChatArea: React.FC = () => {
  const { getCurrentConversation, addMessage, isTyping, setIsTyping, currentConversationId, createNewConversation } = useChatContext();
  const currentConversation = getCurrentConversation();

  const handleSendMessage = async (content: string, file?: File) => {
    // Ensure we have a conversation
    let conversationId = currentConversationId;
    if (!conversationId) {
      await createNewConversation();
      conversationId = currentConversationId;
      if (!conversationId) {
        console.error('Failed to create conversation');
        return;
      }
    }

    // Create file attachment if file is provided
    let fileAttachment: FileAttachment | undefined;
    if (file) {
      fileAttachment = {
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
      };
    }

    // Add user message to UI immediately
    addMessage({
      content,
      role: 'user',
      fileAttachment,
    });

    // Set typing indicator
    setIsTyping(true);

    try {
      // Get conversation history (exclude the message we just added as it's already included)
      const conversationHistory = currentConversation?.messages || [];

      // Get AI response - this will save both user and AI messages to backend
      const aiResponse = await sendMessageToAI(
        content,
        conversationId,
        conversationHistory,
        file
      );

      // Add AI message to UI
      addMessage({
        content: aiResponse.content,
        role: 'assistant',
      });
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      addMessage({
        content: `Sorry, I encountered an error: ${errorMessage}. Please try again.`,
        role: 'assistant',
      });
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <MessageList
        messages={currentConversation?.messages || []}
        isTyping={isTyping}
      />

      {/* Input Area */}
      <MessageInput onSendMessage={handleSendMessage} disabled={isTyping} />
    </div>
  );
};
