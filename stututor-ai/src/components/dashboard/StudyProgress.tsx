"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface Course {
  id: string
  name: string
  subject: string
  progress: number
  totalHours: number
  completedHours: number
  color: string
  nextDeadline?: string
}

export default function StudyProgress() {
  const courses: Course[] = [
    {
      id: "1",
      name: "Calculus II",
      subject: "Mathematics",
      progress: 75,
      totalHours: 40,
      completedHours: 30,
      color: "bg-blue-500",
      nextDeadline: "Midterm in 5 days"
    },
    {
      id: "2",
      name: "Data Structures",
      subject: "Computer Science",
      progress: 60,
      totalHours: 45,
      completedHours: 27,
      color: "bg-purple-500",
      nextDeadline: "Assignment due in 2 days"
    },
    {
      id: "3",
      name: "World History",
      subject: "History",
      progress: 85,
      totalHours: 30,
      completedHours: 25.5,
      color: "bg-green-500"
    },
    {
      id: "4",
      name: "Organic Chemistry",
      subject: "Chemistry",
      progress: 45,
      totalHours: 50,
      completedHours: 22.5,
      color: "bg-orange-500",
      nextDeadline: "Lab report due tomorrow"
    },
    {
      id: "5",
      name: "English Literature",
      subject: "Literature",
      progress: 90,
      totalHours: 35,
      completedHours: 31.5,
      color: "bg-pink-500"
    }
  ]

  return (
    <Card className="glass-card border-white/40 dark:border-white/10 shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
          Course Progress
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          Track your progress across all active courses
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {courses.map((course) => (
          <div key={course.id} className="space-y-3 p-4 rounded-lg glass hover:glass-strong transition-all duration-300 border border-white/20 dark:border-white/10">
            <div className="flex items-center justify-between">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-sm font-bold text-gray-800 dark:text-gray-100">{course.name}</h4>
                  <Badge variant="secondary" className="text-xs glass border-white/30 dark:border-white/10">
                    {course.subject}
                  </Badge>
                </div>
                {course.nextDeadline && (
                  <p className="text-xs text-orange-600 dark:text-orange-400 font-medium">{course.nextDeadline}</p>
                )}
              </div>
              <div className="text-right ml-4">
                <p className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                  {course.progress}%
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {course.completedHours}/{course.totalHours}h
                </p>
              </div>
            </div>
            <div className="relative">
              <Progress value={course.progress} className="h-2.5" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
