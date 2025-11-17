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
    <Card className="glass-card border-white/40 dark:border-white/10 shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Upcoming Tasks
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              {incompleteTasks.length} pending tasks, {completedTasks.length} completed
            </CardDescription>
          </div>
          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
            <Calendar className="h-5 w-5" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-start gap-3 p-4 rounded-lg border transition-all duration-300 ${
                task.completed
                  ? 'glass opacity-60'
                  : 'glass-card hover:glass-strong hover:shadow-md border-white/30 dark:border-white/10'
              }`}
            >
              <Checkbox
                id={task.id}
                checked={task.completed}
                onCheckedChange={() => toggleTask(task.id)}
                className="mt-1"
              />
              <div className="flex-1 space-y-2">
                <label
                  htmlFor={task.id}
                  className={`text-sm font-semibold leading-none cursor-pointer block ${
                    task.completed ? 'line-through text-gray-500 dark:text-gray-600' : 'text-gray-800 dark:text-gray-100'
                  }`}
                >
                  {task.title}
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className="text-xs glass border-white/30 dark:border-white/10">
                    {task.course}
                  </Badge>
                  <Badge variant="outline" className="text-xs glass border-white/30 dark:border-white/10">
                    {typeLabels[task.type]}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                    <Calendar className="h-3 w-3" />
                    <span>{task.dueDate}</span>
                  </div>
                </div>
              </div>
              <Badge className={`text-xs font-semibold ${priorityColors[task.priority]} shadow-md`}>
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
