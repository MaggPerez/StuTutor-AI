import { StudyNotesProvider } from '@/contexts/StudyNotesContext'
import React from 'react'

export default function MyNotesLayout({
    children,
}: {
    children: React.ReactNode
}) {
  return (
    <StudyNotesProvider>
        {children}
    </StudyNotesProvider>
  )
}
