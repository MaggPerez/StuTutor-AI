'use client'

import { ChatProvider } from '@/contexts/ChatContext'
import { PDFProvider } from '@/contexts/PDFContext'

export default function AITutorLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ChatProvider>
            <PDFProvider>
                {children}
            </PDFProvider>
        </ChatProvider>
    )
}
