import React from 'react';
import { ChatHistory } from './ChatHistory';
import { ChatArea } from './ChatArea';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

export const ChatLayout: React.FC = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    // Mobile layout with Sheet (drawer) for sidebar
    return (
      <div className="flex flex-col h-screen">
        {/* Mobile Header */}
        <div className="border-b border-border p-3 flex items-center gap-2 bg-background">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-[280px]">
              <ChatHistory />
            </SheetContent>
          </Sheet>
          <h1 className="text-lg font-semibold">StuTutor AI</h1>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-hidden">
          <ChatArea />
        </div>
      </div>
    );
  }

  // Desktop layout with resizable panels
  return (
    <div className="h-screen">
      <ResizablePanelGroup direction="horizontal">
        {/* Sidebar Panel */}
        <ResizablePanel defaultSize={25} minSize={20} maxSize={35}>
          <ChatHistory />
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Main Chat Panel */}
        <ResizablePanel defaultSize={75} minSize={50}>
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="border-b border-border p-4 bg-background">
              <h1 className="text-xl font-semibold">StuTutor AI</h1>
              <p className="text-sm text-muted-foreground">
                Your AI-powered learning assistant
              </p>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-hidden">
              <ChatArea />
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
