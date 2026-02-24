export interface StudyNotes {
    id: string
    summary: string
    key_concepts: string[]
    important_terms: string[]
    practice_questions: string[]
    topic?: string
    course?: string
    focus?: string
}


export interface Note {
    id: string
    title: string
    courseId: string
    fileName: string
    storagePath: string
    createdAt: string
}