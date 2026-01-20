export type CourseIcon = 'math' | 'science' | 'chemistry' | 'literature' | 'art' | 'music' | 'physical' | 'language' | 'psychology' | 'programming'

export interface Course {
    id?: string
    title: string
    professor: string
    course_date: Date
    course_time: string
    icon: CourseIcon

    description?: string
    course_code?: string
    course_website?: string
    meeting_link?: string
    syllabus_link?: string
    semester?: string
    academic_year?: string
    credits?: number
    is_archived?: boolean
    is_public?: boolean
    max_students?: number
    created_at?: Date
    updated_at?: Date
}