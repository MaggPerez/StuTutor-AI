import React from 'react';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { useChatContext } from '@/context/ChatContext';
import { sendMessageToAI, sendPDFToGemini } from '@/services/chatService';

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

    // If file is provided, keep the PDF displayed in the viewer
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setCurrentPDF({
        fileUrl: fileUrl,
        fileName: file.name,
      });
    }

    // Set typing indicator
    setIsTyping(true);

    try {
      // If a PDF file is uploaded, use Gemini AI (Python backend)
      if (file) {
        // Call Gemini AI to process the PDF
        const geminiResponse = await sendPDFToGemini(file, content || '');

        // Add AI message to UI
        addMessage({
          content: geminiResponse,
          role: 'assistant',
        });
      } else {
        // No PDF - use regular chat flow with OpenAI (Node.js backend)
        // Add user message to UI
        addMessage({
          content,
          role: 'user',
        });

        // Get conversation history
        const conversationHistory = currentConversation?.messages || [];

        // Get AI response from OpenAI
        const aiResponse = await sendMessageToAI(
          content,
          conversationId,
          conversationHistory
        );

        // Add AI message to UI
        addMessage({
          content: aiResponse.content,
          role: 'assistant',
        });
      }
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
