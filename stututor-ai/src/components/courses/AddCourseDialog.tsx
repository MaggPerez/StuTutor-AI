import React, { useState } from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '../ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { CalendarIcon } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Calendar } from '../ui/calendar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Card, CardContent } from '../ui/card'
import { Plus } from 'lucide-react'
import { Course, CourseIcon } from '@/types/Courses'
import { format } from 'date-fns'
import { toast } from 'sonner'
import { IconMath, IconAtom, IconFlask, IconBook, IconPalette, IconMusic, IconRun, IconLanguage, IconBrain, IconCode } from '@tabler/icons-react'
import { createCourse } from '../../../lib/supabase/database-client'

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


export default function AddCourseDialog({ courses, setCourses }: { courses: Course[], setCourses: (courses: Course[]) => void }) {
    const [courseName, setCourseName] = useState<string>("")
    const [professor, setProfessor] = useState<string>("")
    const [date, setDate] = useState<Date>()
    const [time, setTime] = useState<string>()
    const [description, setDescription] = useState<string>("")
    const [selectedIcon, setSelectedIcon] = useState<CourseIcon>("math")

    function onHandleCreateCourse(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!courseName || !professor || !date || !time || !description || !date || !time) {
            toast.error("Please fill in all fields", {
                description: "Please fill in all fields to create a new course",
                duration: 3000,
                position: "top-right",
                className: "bg-red-500 text-white",
            })
            return
        }
        const newCourse: Course = {
            title: courseName,
            description: description,
            professor: professor,
            course_date: date,
            course_time: time,
            icon: selectedIcon
        }
        createCourse(newCourse).then((course) => {
            setCourses([...courses, course])
        })
        setCourseName("")
        setProfessor("")
        setDate(undefined)
        setTime("")
        setDescription("")
        setSelectedIcon("math")
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Card className="border-2 border-dashed cursor-pointer hover:bg-accent/50 hover:border-primary/50 transition-all duration-200 group">
                        <CardContent className="flex flex-col items-center justify-center h-full min-h-[240px] p-6">
                            <div className="rounded-full bg-primary/10 p-4 mb-3 group-hover:bg-primary/20 transition-colors">
                                <Plus className="h-8 w-8 text-primary" />
                            </div>
                            <p className="text-lg font-semibold text-primary">Add New Course</p>
                            <p className="text-sm text-muted-foreground mt-1">Create a course to get started</p>
                        </CardContent>
                    </Card>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                    <form onSubmit={onHandleCreateCourse} className="flex flex-col gap-4">
                        <DialogHeader>
                            <DialogTitle>Add Course</DialogTitle>
                            <DialogDescription>
                                Add a new course to your library
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

                            {/* date */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="date-1">Date</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={date}
                                                onSelect={setDate}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                {/* time */}
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="time-1">Time</Label>
                                    <Input
                                        id="time-1"
                                        name="time"
                                        type="time"
                                        value={time}
                                        onChange={(e) => setTime((e.target.value))}
                                        required
                                    />
                                </div>
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
                                <Label htmlFor="username-1">Description</Label>
                                <Input id="username-1" name="username" placeholder="This is a course about math."
                                    value={description} onChange={(e) => setDescription(e.target.value)} required />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type='button' variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
