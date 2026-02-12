"use client";
import { useEffect } from "react";
import { Clock, BookOpen, CalendarDays, Flame } from "lucide-react"
import { useState } from "react";
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useUser } from "@/contexts/UserContext";

export function SectionCards() {
  const [studyTime, setStudyTime] = useState(0);
  const [activeCourses, setActiveCourses] = useState(0);
  const [assignmentsDue, setAssignmentsDue] = useState(0);
  const [studyStreak, setStudyStreak] = useState(0);

  const { courses, assignments } = useUser()

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Assignments Due Card */}
      <Card className="relative overflow-hidden border-l-4 border-l-pink-500 bg-gradient-to-br from-card to-pink-500/5 dark:from-card dark:to-pink-900/10 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <CardDescription>Assignments Due</CardDescription>
          <CardTitle className="text-3xl font-bold tabular-nums text-foreground">
            {assignments.filter((assignment) => assignment.dueDate && new Date(assignment.dueDate) > new Date()).length}
          </CardTitle>
          <CardAction>
            <Badge variant="secondary" className="gap-1 bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300">
              <CalendarDays className="size-3" />
              This Week
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="pt-0">
          <p className="text-xs text-muted-foreground">
            Due for this week
          </p>
        </CardFooter>
      </Card>


      {/* Active Courses Card */}
      <Card className="relative overflow-hidden border-l-4 border-l-teal-500 bg-gradient-to-br from-card to-teal-500/5 dark:from-card dark:to-teal-900/10 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <CardDescription>Active Courses</CardDescription>
          <CardTitle className="text-3xl font-bold tabular-nums text-foreground">
            {courses.length}
          </CardTitle>
          <CardAction>
            <Badge variant="secondary" className="gap-1 bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300">
              <BookOpen className="size-3" />
              Current
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="pt-0">
          <p className="text-xs text-muted-foreground">
            All courses on track
          </p>
        </CardFooter>
      </Card>


      {/* Study Time Card */}
      <Card className="relative overflow-hidden border-l-4 border-l-purple-500 bg-gradient-to-br from-card to-purple-500/5 dark:from-card dark:to-purple-900/10 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <CardDescription>Study Time This Week</CardDescription>
          <CardTitle className="text-3xl font-bold tabular-nums text-foreground">
            {studyTime} hrs
          </CardTitle>
          <CardAction>
            <Badge variant="secondary" className="gap-1 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
              <Clock className="size-3" />
              +3.5 hrs
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="pt-0">
            <p className="text-xs text-muted-foreground">
              8.5 hours more than last week
            </p>
        </CardFooter>
      </Card>

      

      

      {/* Study Streak Card */}
      <Card className="relative overflow-hidden border-l-4 border-l-amber-500 bg-gradient-to-br from-card to-amber-500/5 dark:from-card dark:to-amber-900/10 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <CardDescription>Study Streak</CardDescription>
          <CardTitle className="text-3xl font-bold tabular-nums text-foreground">
            {studyStreak} Days
          </CardTitle>
          <CardAction>
            <Badge variant="secondary" className="gap-1 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
              <Flame className="size-3" />
              On Fire!
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="pt-0">
          <p className="text-xs text-muted-foreground">
            Personal best: 18 days
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}