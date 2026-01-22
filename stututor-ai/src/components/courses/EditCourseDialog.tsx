import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '../ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Course, CourseIcon, DayOfWeek } from '@/types/Courses'
import { toast } from 'sonner'
import { IconMath, IconAtom, IconFlask, IconBook, IconPalette, IconMusic, IconRun, IconLanguage, IconBrain, IconCode } from '@tabler/icons-react'
import { updateCourse } from '../../../lib/supabase/database-client'
import DaySelector from './DaySelector'
import TimeRangeInput from './TimeRangeInput'

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

interface EditCourseDialogProps {
    course: Course
    open: boolean
    onOpenChange: (open: boolean) => void
    onUpdate: (updatedCourse: Course) => void
}

export default function EditCourseDialog({ course, open, onOpenChange, onUpdate }: EditCourseDialogProps) {
    const [courseName, setCourseName] = useState<string>(course.title)
    const [professor, setProfessor] = useState<string>(course.professor)
    const [selectedDays, setSelectedDays] = useState<DayOfWeek[]>(course.course_days)
    const [startTime, setStartTime] = useState<string>(course.course_start_time)
    const [endTime, setEndTime] = useState<string>(course.course_end_time)
    const [description, setDescription] = useState<string>(course.description || "")
    const [selectedIcon, setSelectedIcon] = useState<CourseIcon>(course.icon)
    const [isUpdating, setIsUpdating] = useState(false)

    // Update form when course prop changes
    useEffect(() => {
        setCourseName(course.title)
        setProfessor(course.professor)
        setSelectedDays(course.course_days)
        setStartTime(course.course_start_time)
        setEndTime(course.course_end_time)
        setDescription(course.description || "")
        setSelectedIcon(course.icon)
    }, [course])

    async function onHandleUpdateCourse(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!courseName || !professor || selectedDays.length === 0 || !startTime || !endTime || !description) {
            toast.error("Please fill in all fields", {
                description: "All fields are required to update the course",
                duration: 3000,
                position: "top-right",
            })
            return
        }

        if (!course.id) {
            toast.error("Error updating course", {
                description: "Course ID is missing",
                duration: 3000,
                position: "top-right",
            })
            return
        }

        setIsUpdating(true)
        try {
            const updatedCourseData: Partial<Course> = {
                title: courseName,
                description: description,
                professor: professor,
                course_days: selectedDays,
                course_start_time: startTime,
                course_end_time: endTime,
                icon: selectedIcon
            }

            const updatedCourse = await updateCourse(course.id, updatedCourseData)
            onUpdate(updatedCourse)
            onOpenChange(false)
            toast.success("Course updated", {
                description: `${courseName} has been updated successfully`,
                duration: 3000,
                position: "top-right",
            })
        } catch (error) {
            console.error('Failed to update course:', error)
            toast.error("Failed to update course", {
                description: "Please try again",
                duration: 3000,
                position: "top-right",
            })
        } finally {
            setIsUpdating(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={onHandleUpdateCourse} className="flex flex-col gap-4">
                    <DialogHeader>
                        <DialogTitle>Edit Course</DialogTitle>
                        <DialogDescription>
                            Update your course information
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4">
                        {/* course name */}
                        <div className="grid grid-cols-2 gap-5">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="name-1">Course Name</Label>
                                <Input id="name-1" name="name" placeholder="Math 101"
                                    value={courseName} onChange={(e) => setCourseName(e.target.value)} required />
                            </div>

                            {/* professor */}
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="professor-1">Professor</Label>
                                <Input id="professor-1" name="professor" placeholder="John Doe"
                                    value={professor} onChange={(e) => setProfessor(e.target.value)} required />
                            </div>
                        </div>

                        {/* days of week */}
                        <div className="flex flex-col gap-2">
                            <Label>Class Days</Label>
                            <DaySelector
                                selectedDays={selectedDays}
                                onDaysChange={setSelectedDays}
                            />
                        </div>

                        {/* time range */}
                        <div className="flex flex-col gap-2">
                            <TimeRangeInput
                                startTime={startTime}
                                endTime={endTime}
                                onStartTimeChange={setStartTime}
                                onEndTimeChange={setEndTime}
                            />
                        </div>

                        {/* Icon Selection */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="icon-1">Course Icon</Label>
                            <Select value={selectedIcon} onValueChange={(value) => setSelectedIcon(value as CourseIcon)}>
                                <SelectTrigger id="icon-1" className="w-full">
                                    <SelectValue placeholder="Choose an icon" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(courseIcons).map(([key, { name, icon: IconComponent }]) => (
                                        <SelectItem key={key} value={key}>
                                            <div className="flex items-center gap-2">
                                                <IconComponent className="size-4" />
                                                <span>{name}</span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* course description */}
                        <div className="grid gap-3">
                            <Label htmlFor="description-1">Description</Label>
                            <Input id="description-1" name="description" placeholder="This is a course about math."
                                value={description} onChange={(e) => setDescription(e.target.value)} required />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type='button' variant="outline" disabled={isUpdating}>Cancel</Button>
                        </DialogClose>
                        <Button type="submit" disabled={isUpdating}>
                            {isUpdating ? 'Updating...' : 'Save changes'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
