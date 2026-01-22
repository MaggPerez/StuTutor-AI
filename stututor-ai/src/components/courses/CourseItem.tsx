'use client'
import { useState } from 'react'
import { Course, CourseIcon } from '@/types/Courses'
import { deleteCourse } from '../../../lib/supabase/database-client'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { format } from 'date-fns'
import { IconMath, IconBook, IconAtom, IconFlask, IconPalette, IconMusic, IconRun, IconLanguage, IconBrain, IconCode, Icon, IconDotsVertical, IconEdit, IconTrash } from '@tabler/icons-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import EditCourseDialog from './EditCourseDialog'


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


interface CourseItemProps {
    course: Course
    onUpdate?: (updatedCourse: Course) => void
    onDelete?: (courseId: string) => void
}

export default function CourseItem({ course, onUpdate, onDelete }: CourseItemProps) {
    const CourseIcon = courseIcons[course.icon as CourseIcon].icon as Icon
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [showEditDialog, setShowEditDialog] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)


    const handleDelete = async () => {
        if (!course.id) return

        setIsDeleting(true)
        try {
            await deleteCourse(course.id)
            onDelete?.(course.id)
            setShowDeleteDialog(false)
        } catch (error) {
            console.error('Failed to delete course:', error)
        } finally {
            setIsDeleting(false)
        }
    }

    const handleEdit = () => {
        setShowEditDialog(true)
    }

    const handleUpdate = (updatedCourse: Course) => {
        onUpdate?.(updatedCourse)
    }

    return (
        <>
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

                        {/* Three-dot menu */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <IconDotsVertical className="size-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={handleEdit}>
                                    <IconEdit className="size-4 mr-2" />
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    variant="destructive"
                                    onClick={() => setShowDeleteDialog(true)}
                                >
                                    <IconTrash className="size-4 mr-2" />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
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
                            {course.course_days.join(', ')} at {course.course_start_time} - {course.course_end_time}
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Edit Course Dialog */}
            <EditCourseDialog
                course={course}
                open={showEditDialog}
                onOpenChange={setShowEditDialog}
                onUpdate={handleUpdate}
            />

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Course</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete "{course.title}"? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {isDeleting ? 'Deleting...' : 'Delete'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
