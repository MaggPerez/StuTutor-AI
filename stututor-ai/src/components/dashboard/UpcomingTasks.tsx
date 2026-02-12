"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, AlertCircle, BookOpen, Clock } from "lucide-react"
import { useUser } from "@/contexts/UserContext"
import { Progress } from "@/components/ui/progress"

export default function UpcomingTasks() {
  const { assignments } = useUser()


  return (
    <Card className="h-full border-t-4 border-t-pink-500 shadow-md bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg">
                <CalendarDays className="size-5 text-pink-500" />
                Upcoming Assignments
            </CardTitle>
            <CardDescription>
              {assignments.filter(assignment => assignment.status !== "Completed").length} pending
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {assignments.filter(assignment => assignment.status !== "Completed").length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <CalendarDays className="size-12 mx-auto mb-3 opacity-20" />
              <p className="text-sm">No upcoming assignments</p>
            </div>
          ) : (
            assignments
              .filter(assignment => assignment.status !== "Completed")
              .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
              .slice(0, 5)
              .map((assignment) => {
                const dueDate = new Date(assignment.dueDate)
                const today = new Date()
                const isOverdue = dueDate < today && assignment.status !== "Completed"
                const daysUntilDue = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

                return (
                  <div
                    key={assignment.id}
                    className={`group relative p-4 rounded-lg border transition-all hover:shadow-md ${
                      isOverdue
                        ? 'bg-red-50/50 dark:bg-red-950/20 border-red-200 dark:border-red-900'
                        : 'bg-muted/30 hover:bg-muted/50 border-border'
                    }`}
                  >
                    {/* Overdue indicator */}
                    {isOverdue && (
                      <div className="absolute -top-2 -right-2">
                        <Badge className="bg-red-500 text-white border-red-600 shadow-sm">
                          <AlertCircle className="size-3 mr-1" />
                          Overdue
                        </Badge>
                      </div>
                    )}

                    {/* Assignment name and course */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0 pr-4">
                        <h4 className="font-semibold text-foreground mb-1 truncate group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                          {assignment.assignment_name}
                        </h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <BookOpen className="size-3.5 shrink-0" />
                          <span className="truncate">{assignment.course}</span>
                        </div>
                      </div>

                      {/* Priority badge */}
                      <Badge
                        variant="outline"
                        className={`shrink-0 ${
                          assignment.priority.toLowerCase() === 'high'
                            ? 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800'
                            : assignment.priority.toLowerCase() === 'medium'
                            ? 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800'
                            : 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800'
                        }`}
                      >
                        {assignment.priority}
                      </Badge>
                    </div>

                    {/* Type and Due Date */}
                    <div className="flex items-center gap-3 mb-3 text-sm">
                      <Badge variant="secondary" className="capitalize">
                        {assignment.type}
                      </Badge>

                      <div className={`flex items-center gap-1.5 ${
                        isOverdue
                          ? 'text-red-600 dark:text-red-400 font-medium'
                          : daysUntilDue <= 2
                          ? 'text-orange-600 dark:text-orange-400 font-medium'
                          : 'text-muted-foreground'
                      }`}>
                        <Clock className="size-3.5" />
                        <span>
                          {isOverdue
                            ? `${Math.abs(daysUntilDue)} days overdue`
                            : daysUntilDue === 0
                            ? 'Due today'
                            : daysUntilDue === 1
                            ? 'Due tomorrow'
                            : `Due in ${daysUntilDue} days`
                          }
                        </span>
                        <span className="text-xs text-muted-foreground ml-1">
                          ({dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})
                        </span>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium text-foreground">{assignment.progress}%</span>
                      </div>
                      <Progress
                        value={assignment.progress}
                        className={`h-2 ${
                          assignment.progress === 100
                            ? '[&>div]:bg-green-500'
                            : isOverdue && assignment.progress < 50
                            ? '[&>div]:bg-red-500'
                            : '[&>div]:bg-pink-500'
                        }`}
                      />
                    </div>
                  </div>
                )
              })
          )}
        </div>
      </CardContent>
    </Card>
  )
}
