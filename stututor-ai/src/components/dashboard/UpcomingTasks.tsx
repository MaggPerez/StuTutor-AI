"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { CalendarDays, AlertCircle } from "lucide-react"
import { useState } from "react"

interface Task {
  id: string
  title: string
  course: string
  dueDate: string
  priority: "high" | "medium" | "low"
  completed: boolean
  type: "assignment" | "exam" | "quiz" | "reading" | "project"
}

const priorityColors = {
  high: "bg-red-500/10 text-red-500 border-red-500/20",
  medium: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  low: "bg-green-500/10 text-green-500 border-green-500/20"
}

export default function UpcomingTasks() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Lab Report: Exp 3",
      course: "Chemistry",
      dueDate: "Tomorrow",
      priority: "high",
      completed: false,
      type: "assignment"
    },
    {
      id: "2",
      title: "Binary Trees HW",
      course: "Data Struct",
      dueDate: "In 2 days",
      priority: "high",
      completed: false,
      type: "assignment"
    },
    {
      id: "3",
      title: "Midterm Prep",
      course: "Calculus II",
      dueDate: "In 5 days",
      priority: "high",
      completed: false,
      type: "exam"
    },
    {
      id: "4",
      title: "Read Ch 10-12",
      course: "English Lit",
      dueDate: "In 3 days",
      priority: "medium",
      completed: false,
      type: "reading"
    }
  ])

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ))
  }

  const incompleteTasks = tasks.filter(task => !task.completed)

  return (
    <Card className="h-full border-t-4 border-t-pink-500 shadow-md bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg">
                <CalendarDays className="size-5 text-pink-500" />
                Upcoming Tasks
            </CardTitle>
            <CardDescription>
              {incompleteTasks.length} pending
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`group flex items-start gap-3 p-3 rounded-lg border transition-all duration-200 ${
                task.completed
                  ? 'bg-muted/30 border-transparent opacity-60'
                  : 'bg-card border-border/40 hover:border-primary/30 hover:shadow-sm'
              }`}
            >
              <Checkbox
                id={task.id}
                checked={task.completed}
                onCheckedChange={() => toggleTask(task.id)}
                className="mt-1 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <div className="flex-1 space-y-1">
                <label
                  htmlFor={task.id}
                  className={`text-sm font-medium leading-none cursor-pointer block ${
                    task.completed 
                        ? 'line-through text-muted-foreground' 
                        : 'text-foreground group-hover:text-primary transition-colors'
                  }`}
                >
                  {task.title}
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className="text-[10px] px-1.5 h-5 border-white/10 bg-white/5 font-normal">
                    {task.course}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground">
                    {task.dueDate}
                  </span>
                </div>
              </div>
              <Badge className={`text-[10px] px-1.5 h-5 ${priorityColors[task.priority]} shadow-none`}>
                {task.priority.toUpperCase()}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
