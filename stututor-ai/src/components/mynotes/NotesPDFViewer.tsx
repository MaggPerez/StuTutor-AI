'use client'

import dynamic from 'next/dynamic'
import { Loader2 } from 'lucide-react'

const PDFViewer = dynamic(() => import('@/components/PDFViewer'), {
    ssr: false,
    loading: () => (
        <div className="flex flex-col items-center justify-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground mt-2">Loading PDF viewer...</p>
        </div>
    ),
})

interface NotesPDFViewerProps {
    selectedNoteId: string | null
}

export default function NotesPDFViewer({ selectedNoteId }: NotesPDFViewerProps) {
    // TODO: Replace with actual PDF URL from Supabase based on selectedNoteId
    // For now, always show the placeholder constitution.pdf
    const pdfUrl = '/constitution.pdf'

    return (
        <div className="h-full w-full">
            <PDFViewer fetchPDFUrl={pdfUrl} />
        </div>
    )
}
