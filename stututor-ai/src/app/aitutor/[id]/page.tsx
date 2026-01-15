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
import { Loader2 } from 'lucide-react'

// Import PDFViewer without SSR
const PDFViewer = dynamic(() => import('@/components/aitutor/PDFViewer'), {
    ssr: false,
    loading: () => <div className="flex flex-col items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Loading PDF viewer...</p>
    </div>
})

function ChatPageContent({ id }: { id: string }) {

    return (
        <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={15} className="h-full w-full">
                <ChatHistory initialActiveChatId={id} />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={40} className="h-full">
                <PDFViewer />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={20} className="h-full w-full">
                <ChatBox />
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}

export default async function ChatPage({ params, }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    return (
        <div className="h-full w-full">
            <PDFProvider>
                <ChatPageContent id={id} />
            </PDFProvider>
        </div>
    )
}