"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Assignment } from "@/types/Assignments"
import { CalendarIcon, BookOpenIcon } from "lucide-react"
import { cn } from "@/lib/utils"


interface UpcomingAssignmentsCardProps {
    assignments: Assignment[]
    isLoading?: boolean
}

function formatDueDate(dateString: string): string {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = date.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return 'Overdue'
    if (diffDays === 0) return 'Due today'
    if (diffDays === 1) return 'Due tomorrow'
    if (diffDays <= 7) return `Due in ${diffDays} days`

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
        case 'completed':
            return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
        case 'in-progress':
        case 'in progress':
            return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
        case 'not started':
        case 'pending':
            return 'bg-white/5 text-muted-foreground border-white/10'
        default:
            return 'bg-white/5 text-muted-foreground border-white/10'
    }
}

function getPriorityIndicator(priority: string): { color: string; label: string, shadow: string } {
    switch (priority.toLowerCase()) {
        case 'high':
            return { color: 'bg-red-500', label: 'High', shadow: 'shadow-[0_0_8px_rgba(239,68,68,0.5)]' }
        case 'medium':
            return { color: 'bg-amber-500', label: 'Medium', shadow: 'shadow-[0_0_8px_rgba(245,158,11,0.5)]' }
        case 'low':
            return { color: 'bg-emerald-500', label: 'Low', shadow: 'shadow-[0_0_8px_rgba(16,185,129,0.5)]' }
        default:
            return { color: 'bg-gray-500', label: priority, shadow: 'shadow-none' }
    }
}

export function UpcomingAssignmentsCard({ assignments, isLoading }: UpcomingAssignmentsCardProps) {
    // Filter and sort assignments by due date (upcoming first)
    const upcomingAssignments = assignments
        .filter(a => {
            if (!a.due_date) return false
            const dueDate = new Date(a.due_date)
            return dueDate >= new Date(new Date().setHours(0, 0, 0, 0))
        })
        .sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime())
        .slice(0, 10) // Show max 10 upcoming



    return (
        <Card className="flex-1 flex flex-col bg-black/20 border-white/5 shadow-2xl overflow-hidden rounded-2xl relative">

            <CardHeader className="pb-2 bg-transparent border-b border-white/5">
                <CardTitle className="text-base font-medium text-white/90 flex items-center gap-2 tracking-wide">
                    <CalendarIcon className="h-4 w-4 text-[#e0c2ff]" />
                    Upcoming Assignments
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0 bg-transparent">
                <ScrollArea className="h-full px-6 py-4 custom-scrollbar">
                    {isLoading ? (
                        <div className="space-y-3">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="animate-pulse">
                                    <div className="h-16 bg-white/5 rounded-xl border border-white/5" />
                                </div>
                            ))}
                        </div>
                    ) : upcomingAssignments.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
                            <BookOpenIcon className="h-8 w-8 mb-3 opacity-30 text-[#e0c2ff]" />
                            <p className="text-sm">No upcoming assignments</p>
                            <p className="text-[10px] opacity-70 mt-1 uppercase tracking-widest font-medium">You're all caught up!</p>
                        </div>
                    ) : (
                        <div
                            className="space-y-3 pb-2"
                        >
                            {upcomingAssignments.map((assignment, index) => {
                                const priority = getPriorityIndicator(assignment.priority)
                                const dueText = formatDueDate(assignment.due_date)
                                const isOverdue = dueText === 'Overdue'
                                const isDueToday = dueText === 'Due today'

                                return (
                                    <div
                                        key={assignment.id || index}
                                        className={cn(
                                            "p-3.5 rounded-xl border bg-black/40 transition-all cursor-pointer group hover:scale-[1.02] hover:bg-white/5",
                                            isOverdue ? "border-red-500/30" : isDueToday ? "border-orange-500/30" : "border-white/5",
                                            isOverdue && "shadow-[0_0_15px_rgba(239,68,68,0.05)]",
                                            isDueToday && "shadow-[0_0_15px_rgba(249,115,22,0.05)]"
                                        )}
                                    >
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <div className={cn("w-2 h-2 rounded-full shrink-0", priority.color, priority.shadow)} />
                                                    <h4 className="font-medium text-sm text-white/90 truncate group-hover:text-white transition-colors">
                                                        {assignment.assignment_name}
                                                    </h4>
                                                </div>
                                                <p className="text-[11px] text-muted-foreground mt-1 truncate uppercase tracking-wider font-medium">
                                                    {assignment.course}
                                                </p>
                                            </div>
                                            <Badge
                                                variant="outline"
                                                className={cn(
                                                    "text-[10px] shrink-0 font-medium px-2 py-0 border",
                                                    getStatusColor(assignment.status)
                                                )}
                                            >
                                                {assignment.status}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center justify-between mt-3">
                                            <span className={cn(
                                                "text-xs font-medium",
                                                isOverdue ? "text-red-400" :
                                                    isDueToday ? "text-orange-400" :
                                                        "text-muted-foreground/80 group-hover:text-[#e0c2ff] transition-colors"
                                            )}>
                                                {dueText}
                                            </span>
                                            {assignment.progress > 0 && (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-20 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-linear-to-r from-indigo-500 to-[#e0c2ff] rounded-full transition-all duration-1000 ease-out"
                                                            style={{ width: `${assignment.progress}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-[10px] text-muted-foreground/80 font-medium">
                                                        {assignment.progress}%
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </ScrollArea>
                <style jsx global>{`
                    .custom-scrollbar::-webkit-scrollbar {
                        width: 4px;
                        height: 4px;
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
            </CardContent>
        </Card>
    )
}
