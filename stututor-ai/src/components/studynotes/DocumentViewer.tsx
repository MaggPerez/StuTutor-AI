'use client'
import React from 'react'
import { useStudyNotes } from '@/contexts/StudyNotesContext'
import dynamic from 'next/dynamic'
import { File, Loader2 } from 'lucide-react'
import { Button } from '../ui/button'

// Import PDFViewer without SSR
const PDFViewer = dynamic(() => import('@/components/aitutor/PDFViewer'), {
    ssr: false,
    loading: () => <div className="flex flex-col items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Loading PDF viewer...</p>
    </div>
})


export default function DocumentViewer() {
    const { file, pdf } = useStudyNotes()
    return (
        <div className="h-full w-full">
            {file || pdf ? (
                <PDFViewer file={file} pdf={pdf} />
            ) : (
                // message to user to upload a PDF file or use the chat to generate a PDF file
                <div className="flex flex-col items-center justify-center h-64 gap-4">
                    <div className="rounded-full bg-muted p-6">
                        <File className="h-16 w-16 text-muted-foreground" />
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-lg font-medium">Your notes will appear here</p>
                        <p className="text-sm text-muted-foreground">Upload a PDF file or use the chat to generate a PDF file</p>
                    </div>
                </div>
            )}
        </div>
    );
}
