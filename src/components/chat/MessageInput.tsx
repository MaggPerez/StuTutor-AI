import React, { useState, useRef, type KeyboardEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Send, Paperclip, X, FileText, Sparkles, NotebookPen, MessageCircleQuestion } from 'lucide-react';
import { toast } from 'sonner';

interface MessageInputProps {
  onSendMessage: (message: string, file?: File) => void;
  onFileAttach?: (file: File) => void;
  onFileRemove?: () => void;
  disabled?: boolean;
}

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  prompt: string;
  color: string;
}

export const MessageInput: React.FC<MessageInputProps> = ({ 
  onSendMessage, 
  onFileAttach,
  onFileRemove,
  disabled 
}) => {
  const [message, setMessage] = useState('');
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Quick action shortcuts for PDF documents
  const quickActions: QuickAction[] = [
    {
      id: 'summarize',
      label: 'Summarize',
      icon: <Sparkles className="h-4 w-4" />,
      prompt: 'Please provide a comprehensive summary of this document, highlighting the key points and main ideas.',
      color: 'bg-blue-500/10 hover:bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-500/20',
    },
    {
      id: 'notes',
      label: 'Create Notes',
      icon: <NotebookPen className="h-4 w-4" />,
      prompt: 'Please create detailed study notes from this document, organizing the information into clear sections with bullet points.',
      color: 'bg-purple-500/10 hover:bg-purple-500/20 text-purple-700 dark:text-purple-400 border-purple-500/20',
    },
    {
      id: 'questions',
      label: 'Study Questions',
      icon: <MessageCircleQuestion className="h-4 w-4" />,
      prompt: 'Please generate a list of study questions based on this document that would help me understand the material better.',
      color: 'bg-green-500/10 hover:bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/20',
    },
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate PDF only
    if (file.type !== 'application/pdf') {
      toast.error('Only PDF files are allowed');
      return;
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      toast.error('File size must be less than 10MB');
      return;
    }

    setAttachedFile(file);
    toast.success('PDF file attached successfully');
    
    // Immediately notify parent component to show PDF viewer
    if (onFileAttach) {
      onFileAttach(file);
    }
  };

  const handleRemoveFile = () => {
    setAttachedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    // Notify parent to hide PDF viewer
    if (onFileRemove) {
      onFileRemove();
    }
  };

  const handleSend = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage && !attachedFile) {
      return;
    }

    onSendMessage(trimmedMessage || 'Uploaded document', attachedFile || undefined);
    setMessage('');
    setAttachedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);

    // Auto-resize textarea
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
  };

  const handleQuickAction = (action: QuickAction) => {
    if (!attachedFile) return;
    
    // Send the pre-defined prompt with the attached file
    onSendMessage(action.prompt, attachedFile);
    
    // Clear the attached file
    setAttachedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="border-t border-border bg-background p-4">
      {/* File Attachment Preview */}
      {attachedFile && (
        <div className="mb-3">
          <Badge variant="secondary" className="gap-2 py-2 px-3">
            <FileText className="h-4 w-4" />
            <span className="text-sm">{attachedFile.name}</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 hover:bg-transparent"
              onClick={handleRemoveFile}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        </div>
      )}

      {/* Quick Actions - Show when PDF is attached */}
      {attachedFile && (
        <div className="mb-3">
          <p className="text-xs text-muted-foreground mb-2">Quick actions:</p>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action) => (
              <Button
                key={action.id}
                variant="outline"
                size="sm"
                onClick={() => handleQuickAction(action)}
                disabled={disabled}
                className={`gap-2 transition-all ${action.color}`}
              >
                {action.icon}
                <span className="font-medium">{action.label}</span>
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="flex gap-2 items-end">
        {/* File Upload Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
          className="shrink-0"
        >
          <Paperclip className="h-4 w-4" />
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          className="hidden"
          onChange={handleFileSelect}
        />

        {/* Message Textarea */}
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={handleTextareaChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your message... (Shift+Enter for new line)"
          disabled={disabled}
          className="min-h-[44px] max-h-[200px] resize-none"
          rows={1}
        />

        {/* Send Button */}
        <Button
          onClick={handleSend}
          disabled={disabled || (!message.trim() && !attachedFile)}
          size="icon"
          className="shrink-0"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>

      {/* Helper Text */}
      <p className="text-xs text-muted-foreground mt-2">
        Press Enter to send, Shift+Enter for new line. PDFs only (max 10MB).
      </p>
    </div>
  );
};
