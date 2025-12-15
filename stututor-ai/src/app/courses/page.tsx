'use client'
import React from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { Plus } from 'lucide-react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormItem, FormLabel } from '@/components/ui/form'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'

import { useState } from 'react'
import { toast } from 'sonner'
import {
    type Icon,
    IconMath,
    IconBook,
    IconAtom,
    IconFlask,
    IconPalette,
    IconMusic,
    IconRun,
    IconLanguage,
    IconBrain,
    IconCode
} from '@tabler/icons-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

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

type CourseIcon = keyof typeof courseIcons


interface Course {
    id: number
    title: string
    description: string
    professor: string
    date: Date
    time: string
    link: string
    icon: CourseIcon
}

const courses: Course[] = [
    // {
    //     id: 1,
    //     title: "Math 101",
    //     description: "This is a course about math.",
    //     professor: "John Doe",
    //     date: new Date(),
    //     time: "10:00",
    //     icon: IconMath,
    //     link: "/courses/math-101"
    // },
    // {
    //     id: 2,
    //     title: "English 101",
    //     description: "This is a course about english.",
    //     image: "/images/english.jpg",
    //     link: "/courses/english-101"
    // },
    // {
    //     id: 3,
    //     title: "Science 101",
    //     description: "This is a course about science.",
    //     image: "/images/science.jpg",
    //     link: "/courses/science-101"
    // }
]


function addCourse(course: Course) {
    courses.push(course)
}



export default function Courses() {
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
            id: courses.length + 1,
            title: courseName,
            description: description,
            professor: professor,
            date: date,
            time: time,
            link: "",
            icon: selectedIcon
        }
        addCourse(newCourse)
        setCourseName("")
        setProfessor("")
        setDate(undefined)
        setTime("")
        setDescription("")
        setSelectedIcon("math")
    }


    if (courses.length === 0) {
        return (
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
                    <div className="flex flex-col gap-4 justify-center items-center h-full">
                        <h1 className="text-2xl font-bold">No courses found</h1>
                        <p>Click the button below to create a new course</p>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button>Add Course</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">

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
                </SidebarInset>
            </SidebarProvider>
        )
    }

    return (
        <div className='flex flex-col gap-4'>
            <SidebarProvider>
                <AppSidebar variant="inset" />
                <SidebarInset className="bg-transparent">
                    <h1 className="text-2xl font-bold">Courses</h1>

                    {/* Courses Grid */}
                    <div className="flex flex-row gap-4">
                        {courses.map((course) => {
                            // Extract the icon component for this course
                            const CourseIcon = courseIcons[course.icon].icon

                            return (
                                <Card key={course.id}>
                                    <CardHeader>
                                        <CardTitle className="text-3xl font-bold flex items-center gap-2">
                                            {/* course icon */}
                                            <CourseIcon className="size-8" />

                                            {/* course title */}
                                            {course.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div>
                                            <p>Professor: {course.professor}</p>
                                            <p>{course.description}</p>
                                            <p>{format(course.date, "PPP")} at {course.time}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </div>
    )
}
