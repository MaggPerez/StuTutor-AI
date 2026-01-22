import React, { useState } from 'react'
import { Assignment } from '@/types/Assignments'
import { Dialog, DialogContent, DialogHeader, DialogDescription, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '../ui/dialog'
import { Button } from '../ui/button'
import { CalendarIcon, Plus } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Calendar } from '../ui/calendar'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { createAssignment } from "../../../lib/supabase/database-client"
import { toast } from 'sonner'




export default function CreateAssignmentDialog() {
    const [assignmentName, setAssignmentName] = useState<string>('')
    const [course, setCourse] = useState<string>('')
    const [type, setType] = useState<string>('')
    const [status, setStatus] = useState<string>('Not Started')
    const [dueDate, setDueDate] = useState<Date>()

    const [hours, setHours] = useState<string>('11')
    const [minutes, setMinutes] = useState<string>('59')
    const [period, setPeriod] = useState<string>('PM')

    const [priority, setPriority] = useState<string>('Low')
    const [progress, setProgress] = useState<number>(0)

    async function onHandleCreateAssignment(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        // Combine date and time into a single Date object
        let finalDateTime = dueDate
        if (dueDate && hours && minutes) {
            finalDateTime = new Date(dueDate)
            let hour24 = parseInt(hours)

            // Convert 12-hour to 24-hour format
            if (period === 'PM' && hour24 !== 12) {
                hour24 += 12
            } else if (period === 'AM' && hour24 === 12) {
                hour24 = 0
            }

            finalDateTime.setHours(hour24, parseInt(minutes))
        }

        try {
            const assignment: Assignment = {
                assignment_name: assignmentName,
                course: course,
                type: type,
                status: status,
                dueDate: finalDateTime?.toISOString() || '',
                priority: priority,
                progress: progress
            }
            await createAssignment(assignment)
            toast.success('Assignment created successfully', {
                description: 'Assignment has been created successfully',
                duration: 3000,
                position: 'top-center',
            })
        } catch (error) {
            toast.error('Failed to create assignment', {
                description: 'Failed to create assignment',
                duration: 3000,
                position: 'top-center',
            })
        } finally {
            setAssignmentName('')
            setCourse('')
            setType('')
            setStatus('Not Started')
            setDueDate(undefined)
            setHours('11')
            setMinutes('59')
            setPeriod('PM')

        }
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="default" size="sm" className="h-9 shadow-md shadow-primary/20">
                        <Plus className="size-4 mr-2" />
                        <span className="hidden lg:inline">Add Assignment</span>
                        <span className="lg:hidden">Add</span>
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create Assignment</DialogTitle>
                        <DialogDescription>Create a new assignment to get started</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={onHandleCreateAssignment}>
                        <div className="grid gap-4">

                            <div className="grid grid-cols-2 gap-5">
                                {/* assignment name */}
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="assignment-name">Assignment Name</Label>
                                    <Input id="assignment-name" name="assignment-name" placeholder="Lab Report" value={assignmentName} onChange={(e) => setAssignmentName(e.target.value)} required />
                                </div>

                                {/* course */}
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="course">Course</Label>
                                    <Input id="course" name="course" placeholder="Physics I" value={course} onChange={(e) => setCourse(e.target.value)} required />
                                </div>

                                {/* type */}
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="type">Type</Label>
                                    <Select value={type} onValueChange={(value) => setType(value)} required>
                                        <SelectTrigger id="type" name="type">
                                            <SelectValue placeholder="Quiz, Assignment, etc." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Assignment">Assignment</SelectItem>
                                            <SelectItem value="Quiz">Quiz</SelectItem>
                                            <SelectItem value="Exam">Exam</SelectItem>
                                            <SelectItem value="Lab Report">Lab Report</SelectItem>
                                            <SelectItem value="Study Notes">Study Notes</SelectItem>
                                            <SelectItem value="Practice">Practice</SelectItem>
                                            <SelectItem value="Reading">Reading</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* status */}
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select value={status} onValueChange={(value) => setStatus(value)} required>
                                        <SelectTrigger id="status" name="status">
                                            <SelectValue placeholder="Select a status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Not Started">Not Started</SelectItem>
                                            <SelectItem value="Completed">Completed</SelectItem>
                                            <SelectItem value="In Progress">In Progress</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* due date */}
                                <div className="flex flex-col gap-2">
                                    <Label>Due Date</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    "justify-start text-left font-normal",
                                                    !dueDate && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={dueDate}
                                                onSelect={setDueDate}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                {/* due time */}
                                <div className="flex flex-col gap-2">
                                    <Label>Due Time</Label>
                                    <div className="flex gap-2 items-center">
                                        <Input
                                            type="text"
                                            placeholder="11"
                                            value={hours}
                                            onChange={(e) => {
                                                const value = e.target.value.replace(/\D/g, '');
                                                const num = parseInt(value);
                                                if (value === '' || (num >= 1 && num <= 12)) {
                                                    setHours(value);
                                                }
                                            }}
                                            className="w-[60px] text-center"
                                            maxLength={2}
                                        />
                                        <span>:</span>
                                        <Input
                                            type="text"
                                            placeholder="59"
                                            value={minutes}
                                            onChange={(e) => {
                                                const value = e.target.value.replace(/\D/g, '');
                                                const num = parseInt(value);
                                                if (value === '' || (num >= 0 && num <= 59)) {
                                                    setMinutes(value);
                                                }
                                            }}
                                            className="w-[60px] text-center"
                                            maxLength={2}
                                        />
                                        <Select value={period} onValueChange={setPeriod}>
                                            <SelectTrigger className="w-[75px]">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="AM">AM</SelectItem>
                                                <SelectItem value="PM">PM</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* priority */}
                                <div className="flex flex-col gap-2 ">
                                    <Label htmlFor="priority">Priority</Label>
                                    <Select value={priority} onValueChange={(value) => setPriority(value)} required>
                                        <SelectTrigger id="priority" name="priority">
                                            <SelectValue placeholder="Select a priority" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Low">Low</SelectItem>
                                            <SelectItem value="Medium">Medium</SelectItem>
                                            <SelectItem value="High">High</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* progress */}
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="progress">Progress</Label>
                                    <Input id="progress" name="progress" type="number" value={progress} onChange={(e) => setProgress(Number(e.target.value))} required />
                                </div>
                            </div>

                            {/* dialog footer */}
                            <DialogFooter>

                                {/* cancel button */}
                                <DialogClose asChild>
                                    <Button type="button" variant="outline">Cancel</Button>
                                </DialogClose>

                                {/* create assignment button */}
                                <DialogClose asChild>
                                    <Button type="submit">Create Assignment</Button>
                                </DialogClose>
                            </DialogFooter>
                        </div>


                    </form>
                </DialogContent>
            </Dialog>
        </div>

    )
}
