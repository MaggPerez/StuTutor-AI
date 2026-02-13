'use client'

import { ChatProvider } from '@/contexts/ChatContext'
import { PDFProvider } from '@/contexts/PDFContext'
import { QuizProvider } from '@/contexts/QuizContext'

export default function AITutorLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ChatProvider>
            <PDFProvider>
                <QuizProvider>
                    {children}
                </QuizProvider>
            </PDFProvider>
        </ChatProvider>
    )
}
