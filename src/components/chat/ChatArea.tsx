import React from 'react';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { useChatContext } from '@/context/ChatContext';
import { sendMessageToAI } from '@/services/chatService';
import type { FileAttachment } from '@/types/chat';

export const ChatArea: React.FC = () => {
  const { getCurrentConversation, addMessage, isTyping, setIsTyping } = useChatContext();
  const currentConversation = getCurrentConversation();

  const handleSendMessage = async (content: string, file?: File) => {
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

    // Add user message
    addMessage({
      content,
      role: 'user',
      fileAttachment,
    });

    // Set typing indicator
    setIsTyping(true);

    try {
      // Get AI response
      const aiResponse = await sendMessageToAI(content, file);

      // Add AI message
      addMessage({
        content: aiResponse.content,
        role: 'assistant',
      });
    } catch (error) {
      console.error('Error sending message:', error);
      addMessage({
        content: 'Sorry, I encountered an error. Please try again.',
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
