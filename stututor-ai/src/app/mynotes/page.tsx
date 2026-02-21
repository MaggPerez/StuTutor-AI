'use client'

import { useState } from 'react'
import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable'
import CoursesSidebar from '@/components/mynotes/CoursesSidebar'
import NotesList from '@/components/mynotes/NotesList'
import NotesPDFViewer from '@/components/mynotes/NotesPDFViewer'
import React from 'react'

export default function MyNotes() {
    const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null)
    const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null)

    const handleSelectCourse = (courseId: string) => {
        setSelectedCourseId(courseId)
        setSelectedNoteId(null)
    }

    const handleSelectNote = (noteId: string) => {
        setSelectedNoteId(noteId)
    }

    return (
        <div>
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
                    <div className="flex flex-col h-[calc(100vh-var(--header-height))]">
                        <div className="px-4 py-4 shrink-0">
                            <h1 className="text-3xl font-bold">My Notes</h1>
                            <p className="text-sm text-muted-foreground mt-1">
                                Browse your courses and view generated notes
                            </p>
                        </div>

                        {/* Desktop: Three resizable columns */}
                        <div className="flex-1 px-4 pb-4 min-h-0 hidden lg:block">
                            <ResizablePanelGroup direction="horizontal" className="h-full rounded-lg">
                                <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
                                    <CoursesSidebar
                                        selectedCourseId={selectedCourseId}
                                        onSelectCourse={handleSelectCourse}
                                    />
                                </ResizablePanel>

                                <ResizableHandle withHandle />

                                <ResizablePanel defaultSize={30} minSize={20} maxSize={45}>
                                    <NotesList
                                        selectedCourseId={selectedCourseId}
                                        selectedNoteId={selectedNoteId}
                                        onSelectNote={handleSelectNote}
                                    />
                                </ResizablePanel>

                                <ResizableHandle withHandle />

                                <ResizablePanel defaultSize={50} minSize={30}>
                                    <NotesPDFViewer selectedNoteId={selectedNoteId} />
                                </ResizablePanel>
                            </ResizablePanelGroup>
                        </div>

                        {/* Mobile: Stacked layout */}
                        <div className="flex-1 px-4 pb-4 space-y-4 overflow-auto lg:hidden">
                            <div className="h-64">
                                <CoursesSidebar
                                    selectedCourseId={selectedCourseId}
                                    onSelectCourse={handleSelectCourse}
                                />
                            </div>
                            <div className="h-72">
                                <NotesList
                                    selectedCourseId={selectedCourseId}
                                    selectedNoteId={selectedNoteId}
                                    onSelectNote={handleSelectNote}
                                />
                            </div>
                            <div className="h-[500px]">
                                <NotesPDFViewer selectedNoteId={selectedNoteId} />
                            </div>
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </div>
    )
}
