"use client"

import React, { createContext, useContext, useState } from 'react'
import { QuizQuestion } from '@/types/QuizQuestion'
import { sendQuizWithPDFToGemini, sendQuizWithTopicToGemini } from '../components/quizgen/quizApi'

interface QuizContextType {
    questions: QuizQuestion[]
    setQuestions: (questions: QuizQuestion[]) => void
    topic: string
    setTopic: (topic: string) => void
    difficulty: string
    setDifficulty: (difficulty: string) => void
    numQuestions: number
    setNumQuestions: (numQuestions: number) => void
    isLoading: boolean
    generateQuiz: (id?: string) => Promise<string | null>
    quizId: string | null
    generateQuizFromPDF: (id?: string) => Promise<string | null>
    setFile: (file: File) => void
}


const QuizContext = createContext<QuizContextType | undefined>(undefined)

export function QuizProvider({ children }: { children: React.ReactNode }) {
    const [topic, setTopic] = useState<string>('')
    const [difficulty, setDifficulty] = useState<string>('Easy')
    const [numQuestions, setNumQuestions] = useState<number>(5)
    const [file, setFile] = useState<File | null>(null)
    const [questions, setQuestions] = useState<QuizQuestion[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [quizId, setQuizId] = useState<string | null>(null)


    /**
     * Generates a quiz from a topic
     * @param id - The ID of the quiz to generate
     * @returns The ID of the quiz
     */
    async function generateQuiz(id?: string): Promise<string | null> {
        try {
            const quizUuid = id || crypto.randomUUID()
            setIsLoading(true)
            setQuizId(quizUuid)
            const quiz = await sendQuizWithTopicToGemini(topic, difficulty, numQuestions)
            const parsed = JSON.parse(quiz.message)
            const quizQuestions = parsed.questions as QuizQuestion[]
            setQuestions(quizQuestions)
            setIsLoading(false)
            return quizUuid
        } catch (error) {
            console.error('Error generating quiz:', error)
            setIsLoading(false)
            return null
        }
    }


    /**
     * Generates a quiz from a PDF
     * @param id - The ID of the quiz to generate
     * @returns The ID of the quiz
     */
    async function generateQuizFromPDF(id?: string): Promise<string | null> {
        try {
            const quizUuid = id || crypto.randomUUID()
            setIsLoading(true)
            setQuizId(quizUuid)
            const quiz = await sendQuizWithPDFToGemini(file as File, difficulty, numQuestions)
            const parsed = JSON.parse(quiz.message)
            const quizQuestions = parsed.questions as QuizQuestion[]
            setQuestions(quizQuestions)
            setIsLoading(false)
            return quizUuid
        }
        catch (error) {
            console.error('Error generating quiz:', error)
            setIsLoading(false)
            return null
        }
    }


    return (
        <QuizContext.Provider value={{ questions, setQuestions, topic, setTopic, difficulty, setDifficulty, numQuestions, setNumQuestions, isLoading, generateQuiz, quizId, generateQuizFromPDF, setFile }}>
            {children}
        </QuizContext.Provider>
    )
}

export function useQuiz() {
    const context = useContext(QuizContext)
    if (!context) {
        throw new Error('useQuiz must be used within a QuizProvider')
    }
    return context
}