'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { File, Loader2 } from 'lucide-react'
import { useUser } from '@/contexts/UserContext'
import { getNoteSignedUrl } from '../../../lib/supabase/database-client'

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
   const { userNotes } = useUser()
   const [pdfUrl, setPdfUrl] = useState<string | null>(null)

   useEffect(() => {
    // If no note is selected, clear the PDF URL
    if (!selectedNoteId) {
        setPdfUrl(null)
        return
    }
    // Find the note in the user's notes
    const note = userNotes.find((note) => note.id === selectedNoteId)
    if (!note) return 

    // Get the signed URL for the note
    getNoteSignedUrl(note.storagePath).then((url) => {
        setPdfUrl(url)
    })

   }, [selectedNoteId, userNotes])

    return (
        <div className="h-full w-full">
            {pdfUrl ? (
                <PDFViewer fetchPDFUrl={pdfUrl} />
            ) : (
                <div className="flex flex-col items-center justify-center h-64 gap-4">
                    <div className="rounded-full bg-muted p-6">
                        <File className="h-16 w-16 text-muted-foreground" />
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-lg font-medium">No selected note</p>
                        <p className="text-sm text-muted-foreground">Select a note to view its PDF file</p>
                    </div>
                </div>
            )}
        </div>
    )
}
