'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import ChatHistory from '@/components/aitutor/ChatHistory'
import ChatBox from '@/components/aitutor/ChatBox'
import { PDFProvider } from '@/contexts/PDFContext'
import { usePDF } from '@/contexts/PDFContext'

// Import PDFViewer without SSR
const PDFViewer = dynamic(() => import('@/components/aitutor/PDFViewer'), {
    ssr: false,
    loading: () => <div>Loading PDF viewer...</div>
})

function AITutorContent() {
    const { currentPDF } = usePDF()

    return (
        <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={15} className="h-full w-full">
                <ChatHistory />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={40} className="h-full">
                <PDFViewer file={currentPDF} />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={20} className="h-full w-full">
                <ChatBox />
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}

export default function AITutor() {
    return (
        <div className="h-full w-full">
            <PDFProvider>
                <AITutorContent />
            </PDFProvider>
        </div>
    )
}
