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
            return 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20'
        case 'in-progress':
        case 'in progress':
            return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
        case 'not started':
        case 'pending':
            return 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20'
        default:
            return 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20'
    }
}

function getPriorityIndicator(priority: string): { color: string; label: string } {
    switch (priority.toLowerCase()) {
        case 'high':
            return { color: 'bg-red-500', label: 'High' }
        case 'medium':
            return { color: 'bg-yellow-500', label: 'Medium' }
        case 'low':
            return { color: 'bg-green-500', label: 'Low' }
        default:
            return { color: 'bg-gray-500', label: priority }
    }
}

export function UpcomingAssignmentsCard({ assignments, isLoading }: UpcomingAssignmentsCardProps) {
    // Filter and sort assignments by due date (upcoming first)
    const upcomingAssignments = assignments
        .filter(a => {
            if (!a.dueDate) return false
            const dueDate = new Date(a.dueDate)
            return dueDate >= new Date(new Date().setHours(0, 0, 0, 0))
        })
        .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
        .slice(0, 10) // Show max 10 upcoming

    return (
        <Card className="flex-1 flex flex-col">
            <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    Upcoming Assignments
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0">
                <ScrollArea className="h-full px-6 pb-6">
                    {isLoading ? (
                        <div className="space-y-3">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="animate-pulse">
                                    <div className="h-16 bg-muted rounded-lg" />
                                </div>
                            ))}
                        </div>
                    ) : upcomingAssignments.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
                            <BookOpenIcon className="h-8 w-8 mb-2 opacity-50" />
                            <p className="text-sm">No upcoming assignments</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {upcomingAssignments.map((assignment, index) => {
                                const priority = getPriorityIndicator(assignment.priority)
                                const dueText = formatDueDate(assignment.dueDate)
                                const isOverdue = dueText === 'Overdue'
                                const isDueToday = dueText === 'Due today'

                                return (
                                    <div
                                        key={assignment.id || index}
                                        className={cn(
                                            "p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors cursor-pointer",
                                            isOverdue && "border-red-500/30 bg-red-500/5",
                                            isDueToday && "border-orange-500/30 bg-orange-500/5"
                                        )}
                                    >
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <div className={cn("w-2 h-2 rounded-full shrink-0", priority.color)} />
                                                    <h4 className="font-medium text-sm truncate">
                                                        {assignment.assignment_name}
                                                    </h4>
                                                </div>
                                                <p className="text-xs text-muted-foreground mt-1 truncate">
                                                    {assignment.course}
                                                </p>
                                            </div>
                                            <Badge
                                                variant="outline"
                                                className={cn(
                                                    "text-[10px] shrink-0",
                                                    getStatusColor(assignment.status)
                                                )}
                                            >
                                                {assignment.status}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center justify-between mt-2">
                                            <span className={cn(
                                                "text-xs",
                                                isOverdue ? "text-red-600 dark:text-red-400 font-medium" :
                                                    isDueToday ? "text-orange-600 dark:text-orange-400 font-medium" :
                                                        "text-muted-foreground"
                                            )}>
                                                {dueText}
                                            </span>
                                            {assignment.progress > 0 && (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-primary rounded-full transition-all"
                                                            style={{ width: `${assignment.progress}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-[10px] text-muted-foreground">
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
            </CardContent>
        </Card>
    )
}
