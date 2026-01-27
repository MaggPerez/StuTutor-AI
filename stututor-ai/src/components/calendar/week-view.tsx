"use client"

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Assignment } from "@/types/Assignments"

interface WeekViewProps {
    currentDate: Date
    onPreviousWeek: () => void
    onNextWeek: () => void
    assignments: Assignment[]
}

function getWeekDays(date: Date): Date[] {
    const days: Date[] = []
    const startOfWeek = new Date(date)
    const dayOfWeek = startOfWeek.getDay()
    startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek)

    for (let i = 0; i < 7; i++) {
        const day = new Date(startOfWeek)
        day.setDate(startOfWeek.getDate() + i)
        days.push(day)
    }
    return days
}

function formatWeekRange(days: Date[]): string {
    const firstDay = days[0]
    const lastDay = days[6]
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }

    if (firstDay.getMonth() === lastDay.getMonth()) {
        return `${firstDay.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - ${lastDay.getDate()}, ${lastDay.getFullYear()}`
    }

    return `${firstDay.toLocaleDateString('en-US', options)} - ${lastDay.toLocaleDateString('en-US', options)}, ${lastDay.getFullYear()}`
}

const HOURS = Array.from({ length: 24 }, (_, i) => i)

function formatHour(hour: number): string {
    if (hour === 0) return '12 AM'
    if (hour === 12) return '12 PM'
    if (hour < 12) return `${hour} AM`
    return `${hour - 12} PM`
}

function getAssignmentsForDay(assignments: Assignment[], date: Date): Assignment[] {
    return assignments.filter(assignment => {
        if (!assignment.dueDate) return false
        const dueDate = new Date(assignment.dueDate)
        return (
            dueDate.getFullYear() === date.getFullYear() &&
            dueDate.getMonth() === date.getMonth() &&
            dueDate.getDate() === date.getDate()
        )
    })
}

export function WeekView({ currentDate, onPreviousWeek, onNextWeek, assignments }: WeekViewProps) {
    const weekDays = getWeekDays(currentDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    return (
        <div className="flex flex-col h-full bg-card rounded-xl border shadow-sm">
            {/* Header with navigation */}
            <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={onPreviousWeek}
                        className="h-8 w-8"
                    >
                        <ChevronLeftIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={onNextWeek}
                        className="h-8 w-8"
                    >
                        <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                </div>
                <h2 className="text-lg font-semibold">
                    {formatWeekRange(weekDays)}
                </h2>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                        const todayDate = new Date()
                        onPreviousWeek()
                        onNextWeek()
                    }}
                    className="text-sm"
                >
                    Today
                </Button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-8 border-b">
                <div className="p-2 text-xs text-muted-foreground text-center border-r">
                    {/* Time column header */}
                </div>
                {weekDays.map((day, index) => {
                    const isToday = day.toDateString() === today.toDateString()
                    const dayAssignments = getAssignmentsForDay(assignments, day)
                    return (
                        <div
                            key={index}
                            className={cn(
                                "p-2 text-center border-r last:border-r-0",
                                isToday && "bg-primary/5"
                            )}
                        >
                            <div className="text-xs text-muted-foreground">
                                {dayNames[day.getDay()]}
                            </div>
                            <div
                                className={cn(
                                    "text-lg font-semibold mt-1 w-8 h-8 flex items-center justify-center mx-auto rounded-full",
                                    isToday && "bg-primary text-primary-foreground"
                                )}
                            >
                                {day.getDate()}
                            </div>
                            {dayAssignments.length > 0 && (
                                <div className="mt-1">
                                    <span className="text-[10px] bg-blue-500/10 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded-full">
                                        {dayAssignments.length} due
                                    </span>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>

            {/* Time grid */}
            <div className="flex-1 overflow-auto">
                <div className="grid grid-cols-8 min-h-[600px]">
                    {/* Time labels */}
                    <div className="border-r">
                        {HOURS.map(hour => (
                            <div
                                key={hour}
                                className="h-12 border-b text-xs text-muted-foreground pr-2 text-right pt-0 -mt-2"
                            >
                                {formatHour(hour)}
                            </div>
                        ))}
                    </div>

                    {/* Day columns */}
                    {weekDays.map((day, dayIndex) => {
                        const isToday = day.toDateString() === today.toDateString()
                        const dayAssignments = getAssignmentsForDay(assignments, day)

                        return (
                            <div
                                key={dayIndex}
                                className={cn(
                                    "relative border-r last:border-r-0",
                                    isToday && "bg-primary/5"
                                )}
                            >
                                {HOURS.map(hour => (
                                    <div
                                        key={hour}
                                        className="h-12 border-b border-dashed hover:bg-muted/50 cursor-pointer transition-colors"
                                    />
                                ))}

                                {/* Assignment indicators */}
                                {dayAssignments.map((assignment, idx) => {
                                    const dueDate = new Date(assignment.dueDate)
                                    const hour = dueDate.getHours()
                                    const topOffset = hour * 48 // 48px = 12 (h-12) * 4 (tailwind unit)

                                    const priorityColors: Record<string, string> = {
                                        high: 'bg-red-500/20 border-red-500 text-red-700 dark:text-red-400',
                                        medium: 'bg-yellow-500/20 border-yellow-500 text-yellow-700 dark:text-yellow-400',
                                        low: 'bg-green-500/20 border-green-500 text-green-700 dark:text-green-400',
                                    }

                                    return (
                                        <div
                                            key={assignment.id || idx}
                                            className={cn(
                                                "absolute left-0.5 right-0.5 p-1 rounded text-[10px] leading-tight border-l-2 overflow-hidden",
                                                priorityColors[assignment.priority] || 'bg-blue-500/20 border-blue-500 text-blue-700 dark:text-blue-400'
                                            )}
                                            style={{ top: `${topOffset}px`, minHeight: '40px' }}
                                        >
                                            <div className="font-medium truncate">{assignment.assignment_name}</div>
                                            <div className="truncate opacity-75">{assignment.course}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
