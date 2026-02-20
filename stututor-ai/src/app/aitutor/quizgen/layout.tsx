'use client'

import { QuizProvider } from '@/contexts/QuizContext'

export default function QuizGenLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <QuizProvider>
            {children}
        </QuizProvider>
    )
}