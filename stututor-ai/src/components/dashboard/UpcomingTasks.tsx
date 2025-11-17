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

const priorityConfig = {
  high: {
    bg: "gradient-pink",
    glow: "glow-pink"
  },
  medium: {
    bg: "gradient-orange-yellow",
    glow: "glow-orange"
  },
  low: {
    bg: "gradient-emerald-teal",
    glow: "glow-emerald"
  }
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
    <Card variant="glass" className="border-white/10 shadow-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold gradient-text-cyan-blue">
              Upcoming Tasks
            </CardTitle>
            <CardDescription className="text-white/60 text-sm">
              {incompleteTasks.length} pending, {completedTasks.length} done
            </CardDescription>
          </div>
          <div className="p-2.5 rounded-xl gradient-cyan-blue text-white shadow-xl">
            <Calendar className="h-4 w-4" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`group relative flex items-start gap-3 p-3 rounded-lg border transition-all duration-300 ${
                task.completed
                  ? 'glass opacity-50'
                  : 'glass-card glass-hover border-white/10'
              }`}
            >
              {/* Priority glow indicator */}
              {!task.completed && (
                <div className={`absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-3/4 rounded-full ${priorityConfig[task.priority].bg} ${priorityConfig[task.priority].glow}`} />
              )}

              <Checkbox
                id={task.id}
                checked={task.completed}
                onCheckedChange={() => toggleTask(task.id)}
                className="mt-0.5"
              />
              <div className="flex-1 space-y-1.5 min-w-0">
                <label
                  htmlFor={task.id}
                  className={`text-xs font-semibold leading-tight cursor-pointer block ${
                    task.completed ? 'line-through text-white/40' : 'text-white'
                  }`}
                >
                  {task.title}
                </label>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 glass-strong border-white/20 text-white/70">
                    {task.course}
                  </Badge>
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 glass-strong border-white/20 text-white/70">
                    {typeLabels[task.type]}
                  </Badge>
                  <div className="flex items-center gap-1 text-[10px] text-white/50">
                    <Calendar className="h-2.5 w-2.5" />
                    <span>{task.dueDate}</span>
                  </div>
                </div>
              </div>
              <Badge className={`text-[10px] font-semibold ${priorityConfig[task.priority].bg} text-white shadow-lg border-0 px-2 py-0.5 flex items-center gap-1`}>
                {task.priority === "high" && <AlertCircle className="h-2.5 w-2.5" />}
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
