'use client'

import { ChatProvider } from '@/contexts/ChatContext'
import { PDFProvider } from '@/contexts/PDFContext'

export default function ChatLayout({
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
