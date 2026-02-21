"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { StudyNotes } from '@/types/StudyNotes'
import { generateStudyNotesWithTopic, generateStudyNotesWithPDF } from '../components/studynotes/studynotesApi'
import { jsPDF } from 'jspdf'

interface StudyNotesContextType {
    notes: StudyNotes
    setNotes: (notes: StudyNotes) => void
    file: File | null
    setFile: (file: File) => void
    topic: string
    setTopic: (topic: string) => void
    focus: string
    setFocus: (focus: string) => void
    course: string
    setCourse: (course: string) => void
    pdf: jsPDF | null
    generateNotesFromTopic: (topic: string, course?: string, focus?: string) => Promise<void | null>
    generateNotesFromPDF: (file: File, course?: string, focus?: string) => Promise<void | null>
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
    const [topic, setTopic] = useState<string>('')
    const [focus, setFocus] = useState<string>('')
    const [course, setCourse] = useState<string>('')
    const [pdf, setPdf] = useState<jsPDF | null>(null)

    // testing file with constitution.pdf
    // useEffect(() => {
    //     fetch('/constitution.pdf')
    //         .then(res => {
    //             if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`)
    //             return res.blob()
    //         })
    //         .then(blob => {
    //             const file = new File([blob], 'constitution.pdf', { type: 'application/pdf' })
    //             setFile(file)
    //         })
    //         .catch(err => console.error('PDF fetch error:', err))
    // }, [])


    async function generateNotesFromTopic(topic: string, course?: string, focus?: string): Promise<void | null> {
        await generateStudyNotesWithTopic(topic, focus).then((notes) => {
            generatePDFDocument(JSON.parse(notes.message))
        }).catch((error) => {
            throw new Error('Error generating notes from topic:', error)
        })

    }

    async function generateNotesFromPDF(file: File, course?: string, focus?: string): Promise<void | null> {
        await generateStudyNotesWithPDF(file, focus).then((notes) => {
            generatePDFDocument(JSON.parse(notes.message))
        }).catch((error) => {
            throw new Error('Error generating notes from PDF:', error)
        })
    }

    function generatePDFDocument(notes: StudyNotes) {
        // create a PDF document
        const pdf = new jsPDF()
        pdf.text(notes.summary, 10, 10)
        pdf.text(notes.key_concepts.join('\n'), 10, 30)
        pdf.text(notes.important_terms.join('\n'), 10, 50)
        pdf.text(notes.practice_questions.join('\n'), 10, 70)
        // pdf.save('notes.pdf')
        setPdf(pdf)
    }

    return (
        <StudyNotesContext.Provider value={{ notes, setNotes, file, setFile, topic, setTopic, focus, setFocus, course, setCourse, pdf, generateNotesFromTopic, generateNotesFromPDF }}>
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