'use client'

import { useState } from 'react'
import { Course, CourseIcon } from '@/types/Courses'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import {
    IconMath,
    IconBook,
    IconAtom,
    IconFlask,
    IconPalette,
    IconMusic,
    IconRun,
    IconLanguage,
    IconBrain,
    IconCode,
    Icon,
} from '@tabler/icons-react'
import { BookOpen } from 'lucide-react'

const courseIcons: Record<CourseIcon, { name: string; icon: Icon }> = {
    math: { name: 'Mathematics', icon: IconMath },
    science: { name: 'Science', icon: IconAtom },
    chemistry: { name: 'Chemistry', icon: IconFlask },
    literature: { name: 'Literature', icon: IconBook },
    art: { name: 'Art', icon: IconPalette },
    music: { name: 'Music', icon: IconMusic },
    physical: { name: 'Physical Education', icon: IconRun },
    language: { name: 'Language', icon: IconLanguage },
    psychology: { name: 'Psychology', icon: IconBrain },
    programming: { name: 'Programming', icon: IconCode },
}

// Placeholder courses for UI development
const placeholderCourses: Course[] = [
    {
        id: '1',
        title: 'Calculus II',
        professor: 'Dr. Smith',
        course_days: ['Monday', 'Wednesday', 'Friday'],
        course_start_time: '09:00',
        course_end_time: '10:00',
        icon: 'math',
    },
    {
        id: '2',
        title: 'Organic Chemistry',
        professor: 'Dr. Johnson',
        course_days: ['Tuesday', 'Thursday'],
        course_start_time: '11:00',
        course_end_time: '12:30',
        icon: 'chemistry',
    },
    {
        id: '3',
        title: 'Data Structures',
        professor: 'Prof. Lee',
        course_days: ['Monday', 'Wednesday'],
        course_start_time: '14:00',
        course_end_time: '15:30',
        icon: 'programming',
    },
    {
        id: '4',
        title: 'American Literature',
        professor: 'Dr. Williams',
        course_days: ['Tuesday', 'Thursday'],
        course_start_time: '13:00',
        course_end_time: '14:30',
        icon: 'literature',
    },
]

interface CoursesSidebarProps {
    selectedCourseId: string | null
    onSelectCourse: (courseId: string) => void
}

export default function CoursesSidebar({ selectedCourseId, onSelectCourse }: CoursesSidebarProps) {
    // TODO: Replace with actual user courses from Supabase
    const courses = placeholderCourses

    return (
        <div className="flex flex-col h-full border rounded-md bg-background">
            <div className="p-4 border-b shrink-0">
                <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <h2 className="text-lg font-semibold">My Courses</h2>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                    Select a course to view notes
                </p>
            </div>

            <ScrollArea className="flex-1">
                <div className="p-2 space-y-1">
                    {courses.map((course) => {
                        const CourseIconComponent = courseIcons[course.icon]?.icon
                        const isSelected = selectedCourseId === course.id

                        return (
                            <button
                                key={course.id}
                                onClick={() => onSelectCourse(course.id!)}
                                className={cn(
                                    'w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-all duration-150',
                                    isSelected
                                        ? 'bg-primary/10 text-primary border border-primary/20'
                                        : 'hover:bg-muted/60 text-foreground'
                                )}
                            >
                                <div
                                    className={cn(
                                        'rounded-md p-2 shrink-0 transition-colors',
                                        isSelected
                                            ? 'bg-primary/20'
                                            : 'bg-muted/50'
                                    )}
                                >
                                    {CourseIconComponent && (
                                        <CourseIconComponent className="size-4" />
                                    )}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium truncate">
                                        {course.title}
                                    </p>
                                    <p className="text-xs text-muted-foreground truncate">
                                        {course.professor}
                                    </p>
                                </div>
                            </button>
                        )
                    })}
                </div>
            </ScrollArea>
        </div>
    )
}
