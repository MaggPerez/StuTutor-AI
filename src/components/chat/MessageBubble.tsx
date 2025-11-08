import React from 'react';
import type { Message } from '@/types/chat';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const timestamp = new Date(message.timestamp).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });

  return (
    <div
      className={cn(
        'flex gap-3 mb-4 animate-in fade-in-50 slide-in-from-bottom-2',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      {/* Avatar */}
      <Avatar className="h-8 w-8 mt-1">
        <AvatarFallback className={cn(
          isUser ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
        )}>
          {isUser ? 'U' : 'AI'}
        </AvatarFallback>
      </Avatar>

      {/* Message Content */}
      <div className={cn('flex flex-col max-w-[70%]', isUser ? 'items-end' : 'items-start')}>
        <Card
          className={cn(
            'shadow-sm',
            isUser
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted'
          )}
        >
          <CardContent className="p-3">
            <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>

            {/* File Attachment */}
            {message.fileAttachment && (
              <div className="mt-2 pt-2 border-t border-border/50">
                <Badge variant="secondary" className="gap-1">
                  <FileText className="h-3 w-3" />
                  <span className="text-xs">{message.fileAttachment.name}</span>
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Timestamp */}
        <span className="text-xs text-muted-foreground mt-1 px-1">{timestamp}</span>
      </div>
    </div>
  );
};
