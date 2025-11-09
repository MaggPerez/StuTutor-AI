import React, { useState } from 'react';
import { ChatHistory } from './ChatHistory';
import { ChatArea } from './ChatArea';
import { PDFViewer } from './PDFViewer';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { useIsMobile } from '@/hooks/use-mobile';
import { useChatContext } from '@/context/ChatContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Menu } from 'lucide-react';

export const ChatLayout: React.FC = () => {
  const isMobile = useIsMobile();
  const { currentPDF, setCurrentPDF } = useChatContext();
  const [showPDFModal, setShowPDFModal] = useState(false);

  // Show PDF in modal when PDF is set on mobile
  React.useEffect(() => {
    if (isMobile && currentPDF) {
      setShowPDFModal(true);
    }
  }, [isMobile, currentPDF]);

  const handleClosePDFModal = () => {
    setShowPDFModal(false);
    setCurrentPDF(null);
  };

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

        {/* PDF Modal for Mobile */}
        <Dialog open={showPDFModal} onOpenChange={setShowPDFModal}>
          <DialogContent className="max-w-[95vw] max-h-[95vh] h-[95vh] p-0">
            <DialogTitle className="sr-only">PDF Viewer</DialogTitle>
            {currentPDF && (
              <PDFViewer
                fileUrl={currentPDF.fileUrl}
                fileName={currentPDF.fileName}
                onClose={handleClosePDFModal}
                isMobile={true}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // Desktop layout with resizable panels (3-panel: History | PDF | Chat)
  return (
    <div className="h-screen">
      <ResizablePanelGroup direction="horizontal">
        {/* Chat History Panel (Left) */}
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <ChatHistory />
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* PDF Viewer Panel (Center) - Only shown when PDF is loaded */}
        {currentPDF && (
          <>
            <ResizablePanel defaultSize={35} minSize={25} maxSize={50}>
              <PDFViewer
                fileUrl={currentPDF.fileUrl}
                fileName={currentPDF.fileName}
                onClose={() => setCurrentPDF(null)}
                isMobile={false}
              />
            </ResizablePanel>

            <ResizableHandle withHandle />
          </>
        )}

        {/* Chat Area Panel (Right) */}
        <ResizablePanel defaultSize={currentPDF ? 45 : 80} minSize={40}>
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
