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
        const pdf = new jsPDF()
        const pageWidth = pdf.internal.pageSize.getWidth()
        const pageHeight = pdf.internal.pageSize.getHeight()
        const margin = 15
        const maxWidth = pageWidth - margin * 2
        const lineHeight = 7
        let y = margin

        // Helper: add a new page if needed and return updated y
        function checkPageBreak(requiredSpace: number) {
            if (y + requiredSpace > pageHeight - margin) {
                pdf.addPage()
                y = margin
            }
        }

        // Helper: write a heading
        function addHeading(text: string) {
            checkPageBreak(lineHeight * 2)
            y += 5
            pdf.setFontSize(16)
            pdf.setFont('helvetica', 'bold')
            pdf.text(text, margin, y)
            y += lineHeight + 3
        }

        // Helper: write wrapped body text
        function addBody(text: string) {
            pdf.setFontSize(11)
            pdf.setFont('helvetica', 'normal')
            const lines: string[] = pdf.splitTextToSize(text, maxWidth)
            for (const line of lines) {
                checkPageBreak(lineHeight)
                pdf.text(line, margin, y)
                y += lineHeight
            }
        }

        // Helper: write a bulleted list
        function addList(items: string[], numbered = false) {
            pdf.setFontSize(11)
            pdf.setFont('helvetica', 'normal')
            const bulletIndent = margin + 5
            const bulletMaxWidth = maxWidth - 5
            items.forEach((item, i) => {
                const prefix = numbered ? `${i + 1}. ` : '• '
                const lines: string[] = pdf.splitTextToSize(prefix + item, bulletMaxWidth)
                for (const line of lines) {
                    checkPageBreak(lineHeight)
                    pdf.text(line, bulletIndent, y)
                    y += lineHeight
                }
            })
        }

        // Title
        if (notes.topic) {
            pdf.setFontSize(22)
            pdf.setFont('helvetica', 'bold')
            const titleLines: string[] = pdf.splitTextToSize(notes.topic, maxWidth)
            for (const line of titleLines) {
                checkPageBreak(10)
                pdf.text(line, margin, y)
                y += 10
            }
            y += 5
        }

        // Summary
        addHeading('Summary')
        addBody(notes.summary)

        // Key Concepts
        if (notes.key_concepts.length > 0) {
            addHeading('Key Concepts')
            addList(notes.key_concepts)
        }

        // Important Terms
        if (notes.important_terms.length > 0) {
            addHeading('Important Terms')
            addList(notes.important_terms)
        }

        // Practice Questions
        if (notes.practice_questions.length > 0) {
            addHeading('Practice Questions')
            addList(notes.practice_questions, true)
        }

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