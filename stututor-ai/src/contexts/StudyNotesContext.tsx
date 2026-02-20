"use client"

import { createContext, useContext, useState } from 'react'
import { StudyNotes } from '@/types/StudyNotes'

interface StudyNotesContextType {
    notes: StudyNotes
    setNotes: (notes: StudyNotes) => void
    file: File | null
    setFile: (file: File) => void
}

const StudyNotesContext = createContext<StudyNotesContextType | undefined>(undefined)

export function StudyNotesProvider({ children }: { children: React.ReactNode }) {
    const [notes, setNotes] = useState<StudyNotes>({
        id: '',
        summary: '',
        key_concepts: [],
        important_terms: [],
        practice_questions: []
    })
    const [file, setFile] = useState<File | null>(null)

    return (
        <StudyNotesContext.Provider value={{ notes, setNotes, file, setFile }}>
            {children}
        </StudyNotesContext.Provider>
    )
}

export function useStudyNotes() {
    const context = useContext(StudyNotesContext)
    if (!context) {
        throw new Error('useStudyNotes must be used within a StudyNotesProvider')
    }
    return context
}