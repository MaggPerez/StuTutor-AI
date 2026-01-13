'use client'
import { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { Button } from '@/components/ui/button';

// Set up the worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PDFViewer() {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);
  const minScale = 0.5;
  const maxScale = 3;

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.25, maxScale));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.25, minScale));
  };


  return (
    <div>
      <p>
        Page {pageNumber} of {numPages}
      </p>
      <Button onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber <= 1}>Previous</Button>
      <Button onClick={() => setPageNumber(pageNumber + 1)} disabled={pageNumber >= (numPages || 0)}>Next</Button>

      {/* Zoom Controls */}
      <div style={{ marginTop: '1rem' }}>
        <Button onClick={handleZoomOut} disabled={scale <= minScale}>Zoom Out</Button>
        <span style={{ margin: '0 1rem' }}>{Math.round(scale * 100)}%</span>
        <Button onClick={handleZoomIn} disabled={scale >= maxScale}>Zoom In</Button>
      </div>

      <Document file="/constitution.pdf" onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} scale={scale} />
      </Document>

    </div>
  );
}
