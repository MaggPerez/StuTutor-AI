'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"

// Import PDFViewer without SSR
const PDFViewer = dynamic(() => import('@/components/aitutor/PDFViewer'), {
    ssr: false,
    loading: () => <div>Loading PDF viewer...</div>
})

export default function AITutor() {
    return (
        <div className="h-full w-full">
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={15} className="h-full w-full">Chat History</ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={40} className="h-full">
                    <PDFViewer />
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={20} className="h-full w-full">Chat Box</ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}
