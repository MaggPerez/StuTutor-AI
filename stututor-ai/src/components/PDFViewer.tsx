'use client'
import { useState, useEffect, useRef, useMemo } from 'react'
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  Loader2,
  File
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { jsPDF } from 'jspdf';

// Set up the worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
  file?: File | Blob | null
  pdf?: jsPDF | null
  fetchingFile?: File | Blob | null
  fetchPDFUrl?: string | null
  setFile?: (file: File) => void
}

export default function PDFViewer({ file, pdf, fetchingFile, fetchPDFUrl, setFile }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [rotation, setRotation] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [inputPage, setInputPage] = useState<string>('1');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Constraints
  const minScale = 0.5;
  const maxScale = 3.0;

  // Reset viewer state when PDF changes
  useEffect(() => {
    setPageNumber(1);
    setInputPage('1');
    setScale(1.0);
    setRotation(0);
    setNumPages(0);
  }, [file, pdf, fetchPDFUrl]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
    setLoading(false);
  }

  function onDocumentLoadStart() {
    setLoading(true);
  }

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, maxScale));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, minScale));
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= numPages) {
      setPageNumber(newPage);
      setInputPage(newPage.toString());
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
        setFile?.(file)
    }
}

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPage(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const page = parseInt(inputPage);
      if (!isNaN(page)) {
        handlePageChange(page);
      } else {
        // Reset to current page if invalid
        setInputPage(pageNumber.toString());
      }
    }
  };
  
  // Ensure input stays synced when pageNumber changes via buttons
  useEffect(() => {
    setInputPage(pageNumber.toString());
  }, [pageNumber]);

  // Convert jsPDF instance to a format react-pdf can consume
  const pdfSource = useMemo(() => {
    if (file) return file;
    if (pdf) return { data: new Uint8Array(pdf.output('arraybuffer')) };
    if (fetchingFile) return fetchingFile;
    if (fetchPDFUrl) return fetchPDFUrl;
    return null;
  }, [file, pdf, fetchingFile, fetchPDFUrl]);

  return (
    <div className="flex flex-col h-full w-full bg-gray-100/50 dark:bg-zinc-900/50 border rounded-md overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-2 bg-background border-b shadow-sm z-10 shrink-0">
        <div className="flex items-center gap-1">

          {/* Previous Page Button */}
           <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handlePageChange(pageNumber - 1)} 
                    disabled={pageNumber <= 1 || loading}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Previous Page</TooltipContent>
            </Tooltip>
           </TooltipProvider>

          {/* Page Input */}
          <div className="flex items-center gap-2 mx-2">
            <Input 
                className="h-8 w-12 text-center px-1" 
                value={inputPage}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                disabled={loading}
            />
            <span className="text-sm text-muted-foreground whitespace-nowrap">
                / {numPages || '--'}
            </span>
          </div>

          {/* Next Page Button */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handlePageChange(pageNumber + 1)} 
                    disabled={pageNumber >= numPages || loading}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Next Page</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex items-center gap-1">
          <Separator orientation="vertical" className="h-6 mx-2" />
          
          {/* Zoom Out Button */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={handleZoomOut} disabled={scale <= minScale || loading}>
                    <ZoomOut className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Zoom Out</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <span className="text-sm w-12 text-center select-none">
            {Math.round(scale * 100)}%
          </span>

          {/* Zoom In Button */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={handleZoomIn} disabled={scale >= maxScale || loading}>
                    <ZoomIn className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Zoom In</TooltipContent>
            </Tooltip>
          </TooltipProvider>

           <Separator orientation="vertical" className="h-6 mx-2" />

          {/* Rotate Button */}
           <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={handleRotate} disabled={loading}>
                    <RotateCw className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Rotate</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Main Viewer Area */}
      <div className="flex-1 w-full bg-gray-100 dark:bg-zinc-950/50 overflow-hidden relative">
        <ScrollArea className="h-full w-full">
            <div className="flex justify-center p-8 min-h-full">

              {/* PDF Document */}
                {pdfSource ? (
                  <Document
                  file={pdfSource}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadStart={onDocumentLoadStart}
                  loading={
                      <div className="flex flex-col items-center justify-center h-64 gap-2">
                          <Loader2 className="h-8 w-8 animate-spin text-primary" />
                          <p className="text-sm text-muted-foreground">Loading PDF...</p>
                      </div>
                  }
                  error={
                      <div className="flex flex-col items-center justify-center h-64 gap-2 text-destructive">
                           <p>Failed to load PDF.</p>
                      </div>
                  }
                  className="shadow-lg"
              >

                  {/* Current Page */}
                  <Page 
                      pageNumber={pageNumber} 
                      scale={scale} 
                      rotate={rotation}
                      className="shadow-md"
                      renderTextLayer={true}
                      renderAnnotationLayer={true}
                  />
              </Document>
                ) : (
                  // If no PDF file is selected, show a message and a button to select a PDF file
                  <div className="flex flex-col items-center justify-center h-64 gap-4">
                    <div className="rounded-full bg-muted p-6">
                      <File className="h-16 w-16 text-muted-foreground" />
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <p className="text-lg font-medium">No PDF loaded</p>
                      <p className="text-sm text-muted-foreground">Upload a PDF file to get started</p>
                    </div>
                    <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                      <File className="h-4 w-4 mr-2" />
                      Choose PDF File
                    </Button>
                    <input type="file" className="hidden" onChange={handleFileChange} ref={fileInputRef} />
                  </div>
                )}
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}