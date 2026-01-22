export type CourseIcon = 'math' | 'science' | 'chemistry' | 'literature' | 'art' | 'music' | 'physical' | 'language' | 'psychology' | 'programming'

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'

export interface Course {
    id?: string
    title: string
    professor: string
    course_days: DayOfWeek[]
    course_start_time: string
    course_end_time: string
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
    created_by?: string
    created_at?: Date
    updated_at?: Date
}