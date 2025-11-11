"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, AlertCircle } from "lucide-react"
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
  high: "bg-red-500 text-white",
  medium: "bg-orange-500 text-white",
  low: "bg-green-500 text-white"
}

const typeLabels = {
  assignment: "Assignment",
  exam: "Exam",
  quiz: "Quiz",
  reading: "Reading",
  project: "Project"
}

export default function UpcomingTasks() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Submit Lab Report: Experiment 3",
      course: "Organic Chemistry",
      dueDate: "Tomorrow",
      priority: "high",
      completed: false,
      type: "assignment"
    },
    {
      id: "2",
      title: "Complete Binary Trees Assignment",
      course: "Data Structures",
      dueDate: "In 2 days",
      priority: "high",
      completed: false,
      type: "assignment"
    },
    {
      id: "3",
      title: "Midterm Exam Preparation",
      course: "Calculus II",
      dueDate: "In 5 days",
      priority: "high",
      completed: false,
      type: "exam"
    },
    {
      id: "4",
      title: "Read Chapters 10-12",
      course: "English Literature",
      dueDate: "In 3 days",
      priority: "medium",
      completed: false,
      type: "reading"
    },
    {
      id: "5",
      title: "Weekly Quiz on Renaissance",
      course: "World History",
      dueDate: "In 4 days",
      priority: "medium",
      completed: false,
      type: "quiz"
    },
    {
      id: "6",
      title: "Group Project: Research Phase",
      course: "Data Structures",
      dueDate: "Next week",
      priority: "low",
      completed: false,
      type: "project"
    }
  ])

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ))
  }

  const incompleteTasks = tasks.filter(task => !task.completed)
  const completedTasks = tasks.filter(task => task.completed)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Upcoming Tasks</CardTitle>
            <CardDescription>
              {incompleteTasks.length} pending tasks, {completedTasks.length} completed
            </CardDescription>
          </div>
          <Calendar className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-start gap-3 p-3 rounded-lg border ${
                task.completed ? 'bg-muted/50 opacity-60' : 'bg-card'
              }`}
            >
              <Checkbox
                id={task.id}
                checked={task.completed}
                onCheckedChange={() => toggleTask(task.id)}
                className="mt-1"
              />
              <div className="flex-1 space-y-1">
                <label
                  htmlFor={task.id}
                  className={`text-sm font-medium leading-none cursor-pointer ${
                    task.completed ? 'line-through text-muted-foreground' : ''
                  }`}
                >
                  {task.title}
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className="text-xs">
                    {task.course}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {typeLabels[task.type]}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{task.dueDate}</span>
                  </div>
                </div>
              </div>
              <Badge className={`text-xs ${priorityColors[task.priority]}`}>
                {task.priority === "high" && <AlertCircle className="h-3 w-3 mr-1" />}
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
