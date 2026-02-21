"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { StudyNotes } from '@/types/StudyNotes'
import { generateStudyNotesWithTopic, generateStudyNotesWithPDF } from '../components/studynotes/studynotesApi'
import { jsPDF } from 'jspdf'
import { getUserCourses } from '../../lib/supabase/database-client'
import { Course } from '@/types/Courses'

interface StudyNotesContextType {
    notes: StudyNotes
    setNotes: (notes: StudyNotes) => void
    file: File | null
    setFile: (file: File) => void
    topic: string
    setTopic: (topic: string) => void
    focus: string
    setFocus: (focus: string) => void
    selectedCourse: Course | null
    setSelectedCourse: (course: Course) => void
    pdf: jsPDF | null
    generateNotesFromTopic: (topic: string, course?: string, focus?: string) => Promise<void | null>
    generateNotesFromPDF: (file: File, course?: string, focus?: string) => Promise<void | null>
    isLoading: boolean
    downloadPDF: () => void
    userCourses: Course[]
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
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
    const [pdf, setPdf] = useState<jsPDF | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [userCourses, setUserCourses] = useState<Course[]>([])

    // Fetch user courses when the component mounts
    useEffect(() => {
        getUserCourses().then((courses) => {
            setUserCourses(courses)
        })
    }, [])

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


    /**
     * 
     * Generates notes from a topic
     * @param topic - The topic to generate notes from
     * @param course - The course to generate notes for
     * @param focus - The focus to generate notes for
     * @returns void or null
     */
    async function generateNotesFromTopic(topic: string, course?: string, focus?: string): Promise<void | null> {
        setIsLoading(true)
        await generateStudyNotesWithTopic(topic, focus).then((notes) => {
            setNotes(JSON.parse(notes.message))
            generatePDFDocument(JSON.parse(notes.message))
        }).catch((error) => {
            throw new Error('Error generating notes from topic:', error)
        })
        setIsLoading(false)
    }

    /**
     * Generates notes from a PDF file
     * @param file - The PDF file to generate notes from
     * @param course - The course to generate notes for
     * @param focus - The focus to generate notes for
     * @returns void or null
     */
    async function generateNotesFromPDF(file: File, course?: string, focus?: string): Promise<void | null> {
        setIsLoading(true)
        await generateStudyNotesWithPDF(file, focus).then((notes) => {
            setNotes(JSON.parse(notes.message))
            generatePDFDocument(JSON.parse(notes.message))
        }).catch((error) => {
            throw new Error('Error generating notes from PDF:', error)
        })
        setIsLoading(false)
    }

    /**
     * Generates a PDF document from the notes
     * @param notes - The notes to generate a PDF document from
     * @returns void
     */
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

    /**
     * Downloads the PDF document
     * @returns void
     */
    function downloadPDF() {
        if (pdf) {
            const fileName = notes.topic ? notes.topic + '.pdf' : 'notes.pdf'
            pdf.save(fileName)
        }
        else {
            throw new Error('PDF not found')
        }
    }

    return (
        <StudyNotesContext.Provider value={{ notes, setNotes, file, setFile, topic, setTopic, focus, setFocus, 
        selectedCourse, setSelectedCourse, pdf, generateNotesFromTopic, generateNotesFromPDF, isLoading, downloadPDF, userCourses }}>
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