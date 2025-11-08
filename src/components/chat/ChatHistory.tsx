import React from 'react';
import { useChatContext } from '@/context/ChatContext';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { MessageSquarePlus, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ChatHistory: React.FC = () => {
  const { conversations, currentConversationId, createNewConversation, setCurrentConversation } =
    useChatContext();

  const formatDate = (date: Date) => {
    const now = new Date();
    const messageDate = new Date(date);
    const diffInMs = now.getTime() - messageDate.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return 'Today';
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else if (diffInHours < 168) {
      // Less than a week
      return messageDate.toLocaleDateString('en-US', { weekday: 'long' });
    } else {
      return messageDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    }
  };

  // Group conversations by date
  const groupedConversations = conversations.reduce((acc, conv) => {
    const dateKey = formatDate(conv.updatedAt);
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(conv);
    return acc;
  }, {} as Record<string, typeof conversations>);

  return (
    <div className="flex flex-col h-full bg-muted/30">
      {/* Header */}
      <div className="p-4 space-y-2">
        <h2 className="text-lg font-semibold">Chat History</h2>
        <Button
          onClick={createNewConversation}
          className="w-full"
          variant="default"
        >
          <MessageSquarePlus className="h-4 w-4 mr-2" />
          New Chat
        </Button>
      </div>

      <Separator />

      {/* Conversations List */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-4">
          {Object.keys(groupedConversations).length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground/50 mb-2" />
              <p className="text-sm text-muted-foreground">
                No conversations yet.
                <br />
                Start a new chat to begin!
              </p>
            </div>
          ) : (
            Object.entries(groupedConversations).map(([dateKey, convs]) => (
              <div key={dateKey}>
                <h3 className="text-xs font-semibold text-muted-foreground px-2 mb-2">
                  {dateKey}
                </h3>
                <div className="space-y-1">
                  {convs.map((conv) => (
                    <Button
                      key={conv.id}
                      variant={currentConversationId === conv.id ? 'secondary' : 'ghost'}
                      className={cn(
                        'w-full justify-start text-left h-auto py-3 px-3',
                        currentConversationId === conv.id && 'bg-secondary'
                      )}
                      onClick={() => setCurrentConversation(conv.id)}
                    >
                      <div className="flex flex-col items-start gap-1 w-full overflow-hidden">
                        <span className="text-sm font-medium truncate w-full">
                          {conv.title}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {conv.messages.length} message{conv.messages.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
