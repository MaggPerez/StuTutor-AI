import { SiteHeader } from '@/components/site-header'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'
import InputNotes from '@/components/studynotes/InputNotes'
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import DocumentViewer from '@/components/studynotes/DocumentViewer'

export default function StudyNotesPage() {
    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset" />
            <SidebarInset className="bg-transparent">
                <SiteHeader />
                <div className="container mx-auto py-10 px-4 max-w-10xl">
                    <div className="mb-10 space-y-4">
                        <h1 className="text-4xl font-bold">Study Notes Summarizer</h1>
                        <p className="text-xl text-muted-foreground max-w-3xl">
                            Upload your study notes or topic of choice to get started.
                        </p>
                    </div>

                    <div className="hidden lg:block">
                        <ResizablePanelGroup direction="horizontal" className="h-full space-x-4">
                            <ResizablePanel className="h-full w-full">
                                <InputNotes />
                            </ResizablePanel>
                            <ResizableHandle />
                            <ResizablePanel className="h-full w-full">
                                <DocumentViewer />
                            </ResizablePanel>
                        </ResizablePanelGroup>
                    </div>

                    <div className="lg:hidden">
                        <InputNotes />
                        <DocumentViewer />
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
