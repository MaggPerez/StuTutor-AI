"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { QuizQuestion } from '@/types/QuizQuestion'
import { sendQuizWithTopicToGemini } from '../components/quizgen/quizApi'
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
    generateQuiz: () => Promise<void>
}


const QuizContext = createContext<QuizContextType | undefined>(undefined)

export function QuizProvider({ children }: { children: React.ReactNode }) {
    const [topic, setTopic] = useState<string>('')
    const [difficulty, setDifficulty] = useState<string>('Easy')
    const [numQuestions, setNumQuestions] = useState<number>(10)
    const [questions, setQuestions] = useState<QuizQuestion[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    
    useEffect(() => {
        if (topic && difficulty && numQuestions) {
            generateQuiz()
        }
    }, [topic, difficulty, numQuestions])


    async function generateQuiz() {
        try {
            setIsLoading(true)
            const quiz = await sendQuizWithTopicToGemini(topic, difficulty, numQuestions)
            const quizQuestions = JSON.parse(quiz.message) as QuizQuestion[]
            setQuestions(quizQuestions)
            setIsLoading(false)
        } catch (error) {
            console.error('Error generating quiz:', error)
            setIsLoading(false)
        }
    }


    return (
        <QuizContext.Provider value={{ questions, setQuestions, topic, setTopic, difficulty, setDifficulty, numQuestions, setNumQuestions, isLoading, generateQuiz }}>
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