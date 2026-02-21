'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { FileText, Calendar, StickyNote } from 'lucide-react'

interface Note {
    id: string
    title: string
    courseId: string
    createdAt: string
    topic: string
}

// Placeholder notes for UI development
const placeholderNotes: Record<string, Note[]> = {
    '1': [
        { id: 'n1', title: 'Integration by Parts', courseId: '1', createdAt: '2026-02-18', topic: 'Chapter 7 - Techniques of Integration' },
        { id: 'n2', title: 'Trigonometric Substitution', courseId: '1', createdAt: '2026-02-15', topic: 'Chapter 7 - Techniques of Integration' },
        { id: 'n3', title: 'Sequences and Series', courseId: '1', createdAt: '2026-02-10', topic: 'Chapter 11 - Infinite Sequences' },
    ],
    '2': [
        { id: 'n4', title: 'Alkanes & Cycloalkanes', courseId: '2', createdAt: '2026-02-17', topic: 'Chapter 4 - Hydrocarbons' },
        { id: 'n5', title: 'Stereochemistry', courseId: '2', createdAt: '2026-02-12', topic: 'Chapter 5 - Stereoisomerism' },
    ],
    '3': [
        { id: 'n6', title: 'Binary Search Trees', courseId: '3', createdAt: '2026-02-19', topic: 'Trees & Graphs' },
        { id: 'n7', title: 'Hash Tables', courseId: '3', createdAt: '2026-02-14', topic: 'Hashing' },
        { id: 'n8', title: 'Graph Traversals (BFS/DFS)', courseId: '3', createdAt: '2026-02-08', topic: 'Trees & Graphs' },
        { id: 'n9', title: 'Dynamic Programming', courseId: '3', createdAt: '2026-02-03', topic: 'Algorithm Design' },
    ],
    '4': [
        { id: 'n10', title: 'The Great Gatsby Analysis', courseId: '4', createdAt: '2026-02-16', topic: 'Modernist Fiction' },
    ],
}

interface NotesListProps {
    selectedCourseId: string | null
    selectedNoteId: string | null
    onSelectNote: (noteId: string) => void
}

export default function NotesList({ selectedCourseId, selectedNoteId, onSelectNote }: NotesListProps) {
    // TODO: Replace with actual notes from Supabase
    const notes = selectedCourseId ? (placeholderNotes[selectedCourseId] ?? []) : []

    return (
        <div className="flex flex-col h-full border rounded-md bg-background">
            <div className="p-4 border-b shrink-0">
                <div className="flex items-center gap-2">
                    <StickyNote className="h-5 w-5 text-primary" />
                    <h2 className="text-lg font-semibold">Generated Notes</h2>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                    {selectedCourseId
                        ? `${notes.length} note${notes.length !== 1 ? 's' : ''} found`
                        : 'Select a course to view notes'}
                </p>
            </div>

            <ScrollArea className="flex-1">
                {!selectedCourseId ? (
                    <div className="flex flex-col items-center justify-center h-64 gap-3 px-4">
                        <div className="rounded-full bg-muted p-4">
                            <FileText className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <p className="text-sm text-muted-foreground text-center">
                            Select a course from the sidebar to view its generated notes
                        </p>
                    </div>
                ) : notes.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 gap-3 px-4">
                        <div className="rounded-full bg-muted p-4">
                            <StickyNote className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <p className="text-sm text-muted-foreground text-center">
                            No notes generated for this course yet
                        </p>
                    </div>
                ) : (
                    <div className="p-2 space-y-1">
                        {notes.map((note) => {
                            const isSelected = selectedNoteId === note.id

                            return (
                                <button
                                    key={note.id}
                                    onClick={() => onSelectNote(note.id)}
                                    className={cn(
                                        'w-full flex items-start gap-3 px-3 py-3 rounded-lg text-left transition-all duration-150',
                                        isSelected
                                            ? 'bg-primary/10 text-primary border border-primary/20'
                                            : 'hover:bg-muted/60 text-foreground'
                                    )}
                                >
                                    <div
                                        className={cn(
                                            'rounded-md p-2 shrink-0 mt-0.5 transition-colors',
                                            isSelected
                                                ? 'bg-primary/20'
                                                : 'bg-muted/50'
                                        )}
                                    >
                                        <FileText className="size-4" />
                                    </div>
                                    <div className="min-w-0 flex-1 space-y-1">
                                        <p className="text-sm font-medium leading-snug">
                                            {note.title}
                                        </p>
                                        <p className="text-xs text-muted-foreground truncate">
                                            {note.topic}
                                        </p>
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                            <Calendar className="size-3" />
                                            <span>{note.createdAt}</span>
                                        </div>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                )}
            </ScrollArea>
        </div>
    )
}
