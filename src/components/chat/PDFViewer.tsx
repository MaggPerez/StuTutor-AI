import { useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  ZoomIn,
  ZoomOut,
  Download,
  Search,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  LayoutGrid,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

// Import CSS for react-pdf
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure PDF.js worker - match react-pdf's bundled version
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
  fileUrl: string;
  fileName?: string;
  onClose?: () => void;
  isMobile?: boolean;
}

export function PDFViewer({ fileUrl, fileName, onClose }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [searchText, setSearchText] = useState<string>('');
  const [showThumbnails, setShowThumbnails] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('=== PDFViewer Component ===');
    console.log('fileUrl:', fileUrl);
    console.log('fileName:', fileName);
    console.log('pdfjs version:', pdfjs.version);
    console.log('worker source:', pdfjs.GlobalWorkerOptions.workerSrc);

    // Reset state when fileUrl changes
    setPageNumber(1);
    setScale(1.0);
    setError(null);
    setNumPages(0);
  }, [fileUrl, fileName]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    console.log('✅ PDF loaded successfully!');
    console.log('Number of pages:', numPages);
    setNumPages(numPages);
    setError(null);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error('❌ Error loading PDF:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('PDF URL:', fileUrl);

    let errorMessage = 'Failed to load PDF';
    if (error.message.includes('Missing PDF')) {
      errorMessage = 'Invalid PDF file or corrupted document';
    } else if (error.message.includes('fetch')) {
      errorMessage = 'Failed to fetch PDF file';
    } else {
      errorMessage = error.message;
    }

    setError(errorMessage);
  };

  const onSourceError = (error: Error) => {
    console.error('❌ Source error:', error);
    setError(`Source error: ${error.message}`);
  };

  const onSourceSuccess = () => {
    console.log('✅ Source loaded');
  };

  const handlePreviousPage = () => {
    setPageNumber((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setPageNumber((prev) => Math.min(numPages, prev + 1));
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(3.0, prev + 0.25));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(0.5, prev - 0.25));
  };

  const handleFitToWidth = () => {
    setScale(1.0);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName || 'document.pdf';
    link.click();
  };

  const handlePageJump = (page: number) => {
    setPageNumber(page);
    setShowThumbnails(false);
  };

  const renderToolbar = () => (
    <div className="flex items-center justify-between gap-2 p-3 bg-muted/50 border-b">
      <div className="flex items-center gap-2 flex-wrap">
        {/* Navigation Controls */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePreviousPage}
            disabled={pageNumber <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm whitespace-nowrap px-2">
            Page {pageNumber} of {numPages}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleNextPage}
            disabled={pageNumber >= numPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1 border-l pl-2">
          <Button variant="ghost" size="sm" onClick={handleZoomOut} disabled={scale <= 0.5}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm px-2 whitespace-nowrap">{Math.round(scale * 100)}%</span>
          <Button variant="ghost" size="sm" onClick={handleZoomIn} disabled={scale >= 3.0}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={handleFitToWidth} title="Fit to width">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Additional Controls */}
        <div className="flex items-center gap-1 border-l pl-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowThumbnails(!showThumbnails)}
            title="Toggle thumbnails"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={handleDownload} title="Download PDF">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Search and Close */}
      <div className="flex items-center gap-2">
        <div className="relative hidden md:block">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search in PDF..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="pl-8 h-8 w-40"
          />
        </div>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose} title="Close PDF viewer">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );

  const renderThumbnails = () => (
    <div className="w-48 border-r bg-muted/30 overflow-y-auto">
      <div className="p-2 space-y-2">
        {Array.from({ length: numPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageJump(page)}
            className={cn(
              'w-full p-2 rounded border bg-background hover:bg-accent transition-colors',
              pageNumber === page && 'ring-2 ring-primary'
            )}
          >
            <Document file={fileUrl} loading="">
              <Page
                pageNumber={page}
                width={150}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </Document>
            <p className="text-xs text-center mt-1">Page {page}</p>
          </button>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    if (error) {
      return (
        <div className="flex items-center justify-center h-full">
          <Card className="p-6 max-w-md">
            <div className="text-center">
              <X className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Error Loading PDF</h3>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button onClick={() => window.location.reload()} size="sm">
                Reload Page
              </Button>
            </div>
          </Card>
        </div>
      );
    }

    return (
      <div className="flex h-full">
        {showThumbnails && numPages > 0 && renderThumbnails()}
        <ScrollArea className="flex-1">
          <div className="flex justify-center p-4">
            <Document
              file={fileUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              onSourceError={onSourceError}
              onSourceSuccess={onSourceSuccess}
              loading={
                <div className="flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-2"></div>
                    <p className="text-sm text-muted-foreground">Loading PDF document...</p>
                  </div>
                </div>
              }
              error={
                <div className="flex items-center justify-center p-8">
                  <Card className="p-6">
                    <div className="text-center text-destructive">
                      <X className="h-8 w-8 mx-auto mb-2" />
                      <p>Failed to load PDF document</p>
                    </div>
                  </Card>
                </div>
              }
            >
              {numPages > 0 && (
                <Page
                  pageNumber={pageNumber}
                  scale={scale}
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                  className="shadow-lg"
                  loading={
                    <div className="flex items-center justify-center p-8">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                        <p className="text-xs text-muted-foreground">Loading page {pageNumber}...</p>
                      </div>
                    </div>
                  }
                />
              )}
            </Document>
          </div>
        </ScrollArea>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {renderToolbar()}
      <div className="flex-1 overflow-hidden">{renderContent()}</div>
      {fileName && (
        <div className="px-3 py-2 text-xs text-muted-foreground border-t bg-muted/30 truncate">
          {fileName}
        </div>
      )}
    </div>
  );
}
