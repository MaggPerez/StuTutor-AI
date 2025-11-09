import React from 'react';
import { ChatLayout } from '@/components/chat/ChatLayout';
import { ChatProvider } from '@/context/ChatContext';

export const ChatPage: React.FC = () => {
  return (
    <ChatProvider>
      <ChatLayout />
    </ChatProvider>
  );
};
