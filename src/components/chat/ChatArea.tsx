import React from 'react';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { useChatContext } from '@/context/ChatContext';
import { sendMessageToAI } from '@/services/chatService';
import type { FileAttachment } from '@/types/chat';

export const ChatArea: React.FC = () => {
  const { getCurrentConversation, addMessage, isTyping, setIsTyping, currentConversationId, createNewConversation, setCurrentPDF } = useChatContext();
  const currentConversation = getCurrentConversation();

  // Handle when user attaches a PDF - show it immediately
  const handleFileAttach = (file: File) => {
    const fileUrl = URL.createObjectURL(file);
    setCurrentPDF({
      fileUrl: fileUrl,
      fileName: file.name,
    });
  };

  // Handle when user removes the attached PDF - hide viewer
  const handleFileRemove = () => {
    setCurrentPDF(null);
  };

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
      const fileUrl = URL.createObjectURL(file);
      fileAttachment = {
        name: file.name,
        size: file.size,
        type: file.type,
        url: fileUrl,
      };

      // Keep the PDF displayed in the viewer after sending
      setCurrentPDF({
        fileUrl: fileUrl,
        fileName: file.name,
      });
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
      <MessageInput 
        onSendMessage={handleSendMessage}
        onFileAttach={handleFileAttach}
        onFileRemove={handleFileRemove}
        disabled={isTyping} 
      />
    </div>
  );
};
