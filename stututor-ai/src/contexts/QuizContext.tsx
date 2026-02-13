"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { QuizQuestion } from '@/types/QuizQuestion'
import { sendQuizWithPDFToGemini, sendQuizWithTopicToGemini } from '../components/quizgen/quizApi'
import { useRouter } from 'next/navigation'

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
    generateQuiz: () => Promise<string | null>
    quizId: string | null
    generateQuizFromPDF: () => Promise<string | null>
    setFile: (file: File) => void
}


const QuizContext = createContext<QuizContextType | undefined>(undefined)

export function QuizProvider({ children }: { children: React.ReactNode }) {
    const [topic, setTopic] = useState<string>('')
    const [difficulty, setDifficulty] = useState<string>('Easy')
    const [numQuestions, setNumQuestions] = useState<number>(10)
    const [file, setFile] = useState<File | null>(null)
    const [questions, setQuestions] = useState<QuizQuestion[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [quizId, setQuizId] = useState<string | null>(null)

    



    async function generateQuiz(): Promise<string | null> {
        try {
            setIsLoading(true)
            const quiz = await sendQuizWithTopicToGemini(topic, difficulty, numQuestions)
            const parsed = JSON.parse(quiz.message)
            const quizQuestions = parsed.questions as QuizQuestion[]
            setQuestions(quizQuestions)
            const id = crypto.randomUUID()
            setQuizId(id)
            setIsLoading(false)
            return id
        } catch (error) {
            console.error('Error generating quiz:', error)
            setIsLoading(false)
            return null
        }
    }


    async function generateQuizFromPDF(): Promise<string | null> {
        try {
            setIsLoading(true)
            const quiz = await sendQuizWithPDFToGemini(file as File, difficulty, numQuestions)
            const parsed = JSON.parse(quiz.message)
            const quizQuestions = parsed.questions as QuizQuestion[]
            setQuestions(quizQuestions)
            const id = crypto.randomUUID()
            setQuizId(id)
            setIsLoading(false)
            return id
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