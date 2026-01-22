'use client'
import { useEffect, useState } from 'react'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { getUserCourses } from '../../../lib/supabase/database-client'
import { Course } from '@/types/Courses'
import { SiteHeader } from '@/components/site-header'
import CourseItem from '@/components/courses/CourseItem'
import AddCourseDialog from '@/components/courses/AddCourseDialog'


export default function Courses() {
    const [courses, setCourses] = useState<Course[]>([])

    useEffect(() => {
        getUserCourses().then((courses) => {
            setCourses(courses)
        })
    }, [])



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
                                    <CourseItem key={course.id} course={course} />
                                ))}


                                {/* Add Course Dialog */}
                                <AddCourseDialog courses={courses} setCourses={setCourses} />
                            </div>
                        </div>
                    ) : (

                        // No courses found, show a message to create a new course
                        <div className="flex flex-col gap-4 justify-center items-center h-full">
                            <h1 className="text-2xl font-bold">Set up your courses!</h1>
                            <p>Click the button below to create a new course</p>
                            <AddCourseDialog courses={courses} setCourses={setCourses} />
                        </div>
                    )}
                </SidebarInset>
            </SidebarProvider>
        </div>
    )
}
