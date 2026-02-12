import QuizQuestionsCard from '@/components/quizgen/QuestionsCard'
import React from 'react'

export default function QuizPage({ params }: { params: { id: string } }) {
  return (
    <div>
        <QuizQuestionsCard quizId={params.id} />
    </div>
  )
}
