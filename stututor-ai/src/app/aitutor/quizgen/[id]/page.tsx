'use client'
import QuizQuestionsCard from '@/components/quizgen/QuestionsCard'
import React from 'react'
import { useQuiz } from '@/contexts/QuizContext'
import { Spinner } from '@/components/ui/spinner'
import { useParams } from 'next/navigation'

export default function QuizPage() {
  const { isLoading } = useQuiz()
  const params = useParams<{ id: string }>()
  return (
    <div>
        {isLoading && 
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <div className="flex items-center gap-3">
                <h1 className="text-4xl font-bold">Generating quiz...</h1>
                <Spinner className="size-10 animate-spin" />
            </div>
            <p className="text-lg text-muted-foreground">This may take a few minutes</p>
        </div>}
        {!isLoading && <QuizQuestionsCard quizId={params.id} />}

    </div>
  )
}
