'use client'
import { useEffect, useState } from 'react'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { getUserCourses } from '../../../lib/supabase/database-client'
import { Course } from '@/types/Courses'
import { SiteHeader } from '@/components/site-header'
import CourseItem from '@/components/courses/CourseItem'
import AddCourseDialog from '@/components/courses/AddCourseDialog'
import { useUser } from '@/contexts/UserContext'


export default function Courses() {
    const [createdCourses, setCreatedCourses] = useState<Course[]>([])
    const { courses, setCourses } = useUser()

    const handleCourseUpdate = (updatedCourse: Course) => {
        setCreatedCourses(prevCourses =>
            prevCourses.map(course =>
                course.id === updatedCourse.id ? updatedCourse : course
            )
        )
    }

    const handleCourseDelete = (courseId: string) => {
        setCreatedCourses(prevCourses =>
            prevCourses.filter(course => course.id !== courseId)
        )
    }



    return (
        <div className='flex flex-col gap-4'>
            <SidebarProvider
                style={
                    {
                        "--sidebar-width": "calc(var(--spacing) * 72)",
                        "--header-height": "calc(var(--spacing) * 12)",
                    } as React.CSSProperties
                }
            >
                <AppSidebar variant="inset" />
                <SidebarInset className="bg-transparent">
                    <SiteHeader />

                    {/* Display Courses if there are any */}
                    {courses && courses.length > 0 ? (
                        <div className="p-6 max-w-7xl mx-auto w-full">


                            {/* Page Header */}
                            <div className="mb-6">
                                <h1 className="text-3xl font-bold">Courses</h1>
                                <p className="text-muted-foreground mt-1">Manage your course library</p>
                            </div>


                            {/* Courses Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                                {/* Display Courses */}
                                {courses.map((course) => (
                                    <CourseItem
                                        key={course.id}
                                        course={course}
                                        onUpdate={handleCourseUpdate}
                                        onDelete={handleCourseDelete}
                                    />
                                ))}


                                {/* Add Course Dialog */}
                                <AddCourseDialog courses={createdCourses} setCourses={setCreatedCourses} />
                            </div>
                        </div>
                    ) : (

                        // No courses found, show a message to create a new course
                        <div className="flex flex-col gap-4 justify-center items-center h-full">
                            <h1 className="text-2xl font-bold">Set up your courses!</h1>
                            <p>Click the button below to create a new course</p>
                            <AddCourseDialog courses={createdCourses} setCourses={setCreatedCourses} />
                        </div>
                    )}
                </SidebarInset>
            </SidebarProvider>
        </div>
    )
}
