'use client'
import dynamic from 'next/dynamic'
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import ChatHistory from '@/components/aitutor/ChatHistory'
import ChatBox from '@/components/aitutor/ChatBox'
import { Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import { usePDF } from '@/contexts/PDFContext'

// Import PDFViewer without SSR
const PDFViewer = dynamic(() => import('@/components/PDFViewer'), {
    ssr: false,
    loading: () => <div className="flex flex-col items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Loading PDF viewer...</p>
    </div>
})

export default function ChatPage() {
    const { id } = useParams<{ id: string }>()
    const { currentPDF, setCurrentPDF, fetchingPDF, fetchingPDFUrl } = usePDF();

    return (
        <div className="h-full w-full">
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={15} className="h-full w-full">
                    <ChatHistory initialActiveChatId={id} />
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={40} className="h-full">
                    <PDFViewer file={currentPDF || fetchingPDF} fetchingFile={fetchingPDF} fetchPDFUrl={fetchingPDFUrl} setFile={setCurrentPDF} />
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={20} className="h-full w-full">
                    <ChatBox />
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}