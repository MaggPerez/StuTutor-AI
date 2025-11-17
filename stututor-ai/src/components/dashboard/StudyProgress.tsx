"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Course {
  id: string
  name: string
  subject: string
  progress: number
  totalHours: number
  completedHours: number
  gradient: string
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
      gradient: "gradient-cyan-blue",
      nextDeadline: "Midterm in 5 days"
    },
    {
      id: "2",
      name: "Data Structures",
      subject: "Computer Science",
      progress: 60,
      totalHours: 45,
      completedHours: 27,
      gradient: "gradient-purple-pink",
      nextDeadline: "Assignment due in 2 days"
    },
    {
      id: "3",
      name: "World History",
      subject: "History",
      progress: 85,
      totalHours: 30,
      completedHours: 25.5,
      gradient: "gradient-emerald-teal"
    },
    {
      id: "4",
      name: "Organic Chemistry",
      subject: "Chemistry",
      progress: 45,
      totalHours: 50,
      completedHours: 22.5,
      gradient: "gradient-orange-yellow",
      nextDeadline: "Lab report due tomorrow"
    },
    {
      id: "5",
      name: "English Literature",
      subject: "Literature",
      progress: 90,
      totalHours: 35,
      completedHours: 31.5,
      gradient: "gradient-pink"
    }
  ]

  return (
    <Card variant="glass" className="border-white/10 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold gradient-text-purple-pink">
          Course Progress
        </CardTitle>
        <CardDescription className="text-white/60">
          Track your progress across all active courses
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="group space-y-3 p-4 rounded-xl glass-card glass-hover transition-all duration-300 border border-white/10 relative overflow-hidden"
          >
            {/* Gradient glow on hover */}
            <div className={`absolute inset-0 ${course.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

            <div className="relative z-10 flex items-center justify-between">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-sm font-bold text-white">{course.name}</h4>
                  <Badge variant="secondary" className="text-xs glass-strong border-white/20 text-white/80">
                    {course.subject}
                  </Badge>
                </div>
                {course.nextDeadline && (
                  <p className="text-xs text-orange-400 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                    {course.nextDeadline}
                  </p>
                )}
              </div>
              <div className="text-right ml-4">
                <p className={`text-2xl font-bold gradient-text-${course.gradient.replace('gradient-', '')}`}>
                  {course.progress}%
                </p>
                <p className="text-xs text-white/50">
                  {course.completedHours}/{course.totalHours}h
                </p>
              </div>
            </div>

            {/* Custom gradient progress bar */}
            <div className="relative z-10">
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className={`h-full ${course.gradient} rounded-full transition-all duration-500 relative overflow-hidden`}
                  style={{ width: `${course.progress}%` }}
                >
                  <div className="absolute inset-0 shimmer" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
