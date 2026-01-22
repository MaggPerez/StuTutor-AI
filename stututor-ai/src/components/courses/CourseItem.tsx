'use client'
import { useState } from 'react'
import { Course, CourseIcon } from '@/types/Courses'
import { updateCourse } from '../../../lib/supabase/database-client'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { format } from 'date-fns'
import { IconMath, IconBook, IconAtom, IconFlask, IconPalette, IconMusic, IconRun, IconLanguage, IconBrain, IconCode, Icon } from '@tabler/icons-react'


const courseIcons = {
    math: { name: "Mathematics", icon: IconMath },
    science: { name: "Science", icon: IconAtom },
    chemistry: { name: "Chemistry", icon: IconFlask },
    literature: { name: "Literature", icon: IconBook },
    art: { name: "Art", icon: IconPalette },
    music: { name: "Music", icon: IconMusic },
    physical: { name: "Physical Education", icon: IconRun },
    language: { name: "Language", icon: IconLanguage },
    psychology: { name: "Psychology", icon: IconBrain },
    programming: { name: "Programming", icon: IconCode },
}


export default function CourseItem({ course }: { course: Course }) {
    const CourseIcon = courseIcons[course.icon as CourseIcon].icon as Icon

    return (
        <Card key={course.id} className="cursor-pointer hover:shadow-lg transition-all duration-200 group">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-primary/10 p-2.5 group-hover:bg-primary/20 transition-colors">
                            <CourseIcon className="size-6 text-primary" />
                        </div>
                        <CardTitle className="text-xl font-bold line-clamp-2">
                            {course.title}
                        </CardTitle>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="space-y-1.5">
                    <p className="text-sm font-medium text-muted-foreground">
                        Professor: <span className="text-foreground">{course.professor}</span>
                    </p>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {course.description}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {format(course.course_date, "PPP")} at {course.course_time}
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
