"use client"

import { StudyNotesProvider } from '@/contexts/StudyNotesContext'

export default function StudyNotesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <StudyNotesProvider>{children}</StudyNotesProvider>
}