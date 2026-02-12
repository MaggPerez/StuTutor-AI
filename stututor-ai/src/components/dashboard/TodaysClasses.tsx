"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, User, Calendar } from "lucide-react"
import { useUser } from "@/contexts/UserContext"
import { Course, CourseIcon } from "@/types/Courses"
import { IconMath, IconAtom, IconFlask, IconBook, IconPalette, IconMusic, IconRun, IconLanguage, IconBrain, IconCode } from '@tabler/icons-react'

// Icon mapping for courses using Tabler icons
const courseIconMap: Record<CourseIcon, React.ReactNode> = {
  math: <IconMath className="size-6 text-blue-500" />,
  science: <IconAtom className="size-6 text-purple-500" />,
  chemistry: <IconFlask className="size-6 text-green-500" />,
  literature: <IconBook className="size-6 text-amber-500" />,
  art: <IconPalette className="size-6 text-pink-500" />,
  music: <IconMusic className="size-6 text-indigo-500" />,
  physical: <IconRun className="size-6 text-red-500" />,
  language: <IconLanguage className="size-6 text-teal-500" />,
  psychology: <IconBrain className="size-6 text-violet-500" />,
  programming: <IconCode className="size-6 text-cyan-500" />
}

export default function TodaysClasses() {
  const { courses } = useUser()

  // Get current day of week
  const today = new Date()
  const dayOfWeek = today.toLocaleDateString('en-US', { weekday: 'long' }) as 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'

  // Filter courses for today
  const todaysClasses = courses
    .filter(course => course.course_days.includes(dayOfWeek))
    .sort((a, b) => {
      // Sort by start time
      const timeA = a.course_start_time
      const timeB = b.course_start_time
      return timeA.localeCompare(timeB)
    })

  // Helper function to format time to 12-hour format
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  // Check if class is currently in session
  const isClassInSession = (course: Course) => {
    const now = new Date()
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
    return currentTime >= course.course_start_time && currentTime <= course.course_end_time
  }

  // Check if class is upcoming (within next 30 minutes)
  const isClassUpcoming = (course: Course) => {
    const now = new Date()
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
    const classStart = new Date()
    const [hours, minutes] = course.course_start_time.split(':')
    classStart.setHours(parseInt(hours), parseInt(minutes))

    const timeDiff = classStart.getTime() - now.getTime()
    const minutesDiff = timeDiff / (1000 * 60)

    return minutesDiff > 0 && minutesDiff <= 30
  }

  return (
    <Card className="h-full border-t-4 border-t-blue-500 shadow-md bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="size-5 text-blue-500" />
              Today's Classes
            </CardTitle>
            <CardDescription>
              {dayOfWeek} • {todaysClasses.length} {todaysClasses.length === 1 ? 'class' : 'classes'}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {todaysClasses.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="size-12 mx-auto mb-3 opacity-20" />
              <p className="text-sm">No classes scheduled for today</p>
              <p className="text-xs mt-1">Enjoy your day off!</p>
            </div>
          ) : (
            todaysClasses.map((course) => {
              const inSession = isClassInSession(course)
              const upcoming = isClassUpcoming(course)

              return (
                <div
                  key={course.id}
                  className={`group relative p-4 rounded-lg border transition-all ${
                    inSession
                      ? 'bg-green-50/50 dark:bg-green-950/20 border-green-200 dark:border-green-900 shadow-md'
                      : upcoming
                      ? 'bg-orange-50/50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-900'
                      : 'bg-muted/30 hover:bg-muted/50 border-border'
                  }`}
                >
                  {/* In Session Badge */}
                  {inSession && (
                    <div className="absolute -top-2 -right-2">
                      <Badge className="bg-green-500 text-white border-green-600 shadow-sm animate-pulse">
                        In Session
                      </Badge>
                    </div>
                  )}

                  {/* Upcoming Badge */}
                  {upcoming && !inSession && (
                    <div className="absolute -top-2 -right-2">
                      <Badge className="bg-orange-500 text-white border-orange-600 shadow-sm">
                        Starting Soon
                      </Badge>
                    </div>
                  )}

                  {/* Course Title and Icon */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="shrink-0 p-2 rounded-lg bg-muted/50">
                      {courseIconMap[course.icon]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground mb-1 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {course.title}
                      </h4>
                      {course.course_code && (
                        <p className="text-xs text-muted-foreground truncate">
                          {course.course_code}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Professor */}
                  <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
                    <User className="size-3.5 shrink-0" />
                    <span className="truncate">{course.professor}</span>
                  </div>

                  {/* Time */}
                  <div className={`flex items-center gap-2 text-sm ${
                    inSession
                      ? 'text-green-600 dark:text-green-400 font-medium'
                      : upcoming
                      ? 'text-orange-600 dark:text-orange-400 font-medium'
                      : 'text-muted-foreground'
                  }`}>
                    <Clock className="size-3.5 shrink-0" />
                    <span>
                      {formatTime(course.course_start_time)} - {formatTime(course.course_end_time)}
                    </span>
                  </div>

                  {/* Meeting Link (if available) */}
                  {course.meeting_link && (
                    <div className="mt-3 pt-3 border-t border-border/50">
                      <a
                        href={course.meeting_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                      >
                        <BookOpen className="size-3" />
                        Join Meeting
                      </a>
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>
      </CardContent>
    </Card>
  )
}
