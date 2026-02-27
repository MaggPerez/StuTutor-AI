"use client"

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Assignment } from "@/types/Assignments"
import { useState } from "react"

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
        if (!assignment.due_date) return false
        const dueDate = new Date(assignment.due_date)
        return (
            dueDate.getFullYear() === date.getFullYear() &&
            dueDate.getMonth() === date.getMonth() &&
            dueDate.getDate() === date.getDate()
        )
    })
}

export function WeekView({ currentDate, onPreviousWeek, onNextWeek, assignments }: WeekViewProps) {
    const [direction, setDirection] = useState(0)

    const handlePrevious = () => {
        setDirection(-1)
        onPreviousWeek()
    }

    const handleNext = () => {
        setDirection(1)
        onNextWeek()
    }

    const weekDays = getWeekDays(currentDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    const weekKey = weekDays[0].toISOString()

    return (
        <div className="flex flex-col h-full bg-transparent overflow-hidden">
            {/* Header with navigation */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/40 shrink-0">
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handlePrevious}
                        className="h-8 w-8 rounded-full hover:bg-white/10 text-white"
                    >
                        <ChevronLeftIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleNext}
                        className="h-8 w-8 rounded-full hover:bg-white/10 text-white"
                    >
                        <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                </div>
                <h2 className="text-lg font-medium text-white/90 tracking-wide">
                    {formatWeekRange(weekDays)}
                </h2>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                        setDirection(0)
                        // Simple reset hack
                        const todayDate = new Date()
                        if (currentDate.getTime() < todayDate.getTime()) {
                            setDirection(1)
                            onNextWeek()
                        } else if (currentDate.getTime() > todayDate.getTime()) {
                            setDirection(-1)
                            onPreviousWeek()
                        }
                    }}
                    className="text-xs font-medium border-white/10 bg-white/5 hover:bg-white/10 hover:text-white transition-colors rounded-full px-4"
                >
                    Today
                </Button>
            </div>

            <div className="relative flex-1 flex flex-col min-h-0 bg-black/20">
                {/* Day headers */}
                <div className="grid grid-cols-[3rem_1fr_1fr_1fr_1fr_1fr_1fr_1fr] border-b border-white/5 bg-black/40 shrink-0">
                    <div className="p-2 text-xs text-muted-foreground text-center border-r border-white/5">
                        {/* Time column header */}
                    </div>
                    {weekDays.map((day, index) => {
                        const isToday = day.toDateString() === today.toDateString()
                        const dayAssignments = getAssignmentsForDay(assignments, day)
                        return (
                            <div
                                key={index}
                                className={cn(
                                    "p-3 text-center border-r border-white/5 last:border-r-0 relative transition-colors duration-300",
                                    isToday && "bg-[#e0c2ff]/10"
                                )}
                            >
                                {isToday && (
                                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-[#e0c2ff]/40 via-[#e0c2ff] to-[#e0c2ff]/40" />
                                )}
                                <div className={cn("text-[11px] uppercase tracking-wider font-medium mb-1", isToday ? "text-[#e0c2ff]" : "text-muted-foreground/80")}>
                                    {dayNames[day.getDay()]}
                                </div>
                                <div
                                    className={cn(
                                        "text-xl font-light w-8 h-8 flex items-center justify-center mx-auto rounded-full transition-all duration-300",
                                        isToday ? "bg-[#e0c2ff] text-zinc-950 shadow-[0_0_15px_rgba(224,194,255,0.4)]" : "text-white/80"
                                    )}
                                >
                                    {day.getDate()}
                                </div>
                                <div className="h-4 mt-1">
                                    {dayAssignments.length > 0 && (
                                        <span className="text-[10px] bg-blue-500/10 border border-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full inline-block">
                                            {dayAssignments.length} due
                                        </span>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Animated Time grid */}
                <div className="flex-1 overflow-auto relative custom-scrollbar">
                    <div
                        key={weekKey}
                        className="absolute inset-0 grid grid-cols-[3rem_1fr_1fr_1fr_1fr_1fr_1fr_1fr] min-h-240"
                    >
                        {/* Time labels */}
                        <div className="border-r border-white/5 bg-black/20">
                            {HOURS.map(hour => (
                                <div
                                    key={hour}
                                    className="h-16 border-b border-white/5 text-[10px] text-muted-foreground/60 pr-2 pt-1 text-right relative pointer-events-none"
                                >
                                    <span className="absolute -top-3 right-2 bg-black/40 px-1 rounded-sm">{formatHour(hour)}</span>
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
                                        "relative border-r border-white/5 last:border-r-0 group",
                                        isToday && "bg-[#e0c2ff]/2"
                                    )}
                                >
                                    {HOURS.map(hour => (
                                        <div
                                            key={hour}
                                            className="h-16 border-b border-white/3 group-hover:bg-white/2 cursor-pointer transition-colors"
                                        />
                                    ))}

                                    {/* Assignment indicators */}
                                    {dayAssignments.map((assignment, idx) => {
                                        const dueDate = new Date(assignment.due_date)
                                        const hour = dueDate.getHours()
                                        const topOffset = hour * 64 // 64px = h-16

                                        const priorityStyles: Record<string, { bg: string, border: string, text: string, shadow: string }> = {
                                            high: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', shadow: 'shadow-[0_4px_12px_rgba(239,68,68,0.1)]' },
                                            medium: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', shadow: 'shadow-[0_4px_12px_rgba(245,158,11,0.1)]' },
                                            low: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', shadow: 'shadow-[0_4px_12px_rgba(16,185,129,0.1)]' },
                                        }

                                        const style = priorityStyles[assignment.priority] || { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', shadow: 'shadow-[0_4px_12px_rgba(59,130,246,0.1)]' }

                                        return (
                                            <div
                                                key={assignment.id || idx}
                                                className={cn(
                                                    "absolute left-1 right-1 p-2 rounded-lg text-[11px] leading-tight border transition-all hover:scale-[1.02] hover:z-10 cursor-pointer",
                                                    style.bg, style.border, style.text, style.shadow
                                                )}
                                                style={{ top: `${topOffset + 4}px`, minHeight: '56px' }}
                                            >
                                                <div className="font-semibold truncate tracking-wide">{assignment.assignment_name}</div>
                                                <div className="truncate opacity-70 mt-0.5 text-[10px] uppercase font-medium">{assignment.course}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            {/* Custom scrollbar injection for this component */}
            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                    height: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
            `}</style>
        </div>
    )
}
