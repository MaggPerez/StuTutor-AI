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
    <Card>
      <CardHeader>
        <CardTitle>Course Progress</CardTitle>
        <CardDescription>Track your progress across all active courses</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {courses.map((course) => (
          <div key={course.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold">{course.name}</h4>
                  <Badge variant="secondary" className="text-xs">
                    {course.subject}
                  </Badge>
                </div>
                {course.nextDeadline && (
                  <p className="text-xs text-muted-foreground">{course.nextDeadline}</p>
                )}
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{course.progress}%</p>
                <p className="text-xs text-muted-foreground">
                  {course.completedHours}/{course.totalHours}h
                </p>
              </div>
            </div>
            <Progress value={course.progress} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
