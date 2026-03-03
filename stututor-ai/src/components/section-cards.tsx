"use client";
import { BookOpen, CalendarDays, FileText, CheckCircle2 } from "lucide-react"
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
  const { courses, assignments, userNotes } = useUser()

  const completedAssignments = assignments.filter(a => a.status === "Completed").length
  const inProgressAssignments = assignments.filter(a => a.status === "In Progress").length
  const uniqueNotesCourses = new Set(userNotes.map(n => n.courseId)).size

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Assignments Due Card */}
      <Card className="relative overflow-hidden bg-gradient-to-br from-card to-pink-500/5 dark:from-card dark:to-pink-900/10 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <CardDescription>Assignments Due</CardDescription>
          <CardTitle className="text-3xl font-bold tabular-nums text-foreground">
            {assignments.filter((assignment) => assignment.due_date && new Date(assignment.due_date) > new Date()).length}
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
      <Card className="relative overflow-hidden bg-gradient-to-br from-card to-teal-500/5 dark:from-card dark:to-teal-900/10 shadow-sm hover:shadow-md transition-shadow">
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


      {/* Notes Generated Card */}
      <Card className="relative overflow-hidden bg-gradient-to-br from-card to-purple-500/5 dark:from-card dark:to-purple-900/10 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <CardDescription>Notes Generated</CardDescription>
          <CardTitle className="text-3xl font-bold tabular-nums text-foreground">
            {userNotes.length}
          </CardTitle>
          <CardAction>
            <Badge variant="secondary" className="gap-1 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
              <FileText className="size-3" />
              AI Notes
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="pt-0">
          <p className="text-xs text-muted-foreground">
            Across {uniqueNotesCourses} course{uniqueNotesCourses !== 1 ? "s" : ""}
          </p>
        </CardFooter>
      </Card>



      {/* Completed Assignments Card */}
      <Card className="relative overflow-hidden bg-gradient-to-br from-card to-green-500/5 dark:from-card dark:to-green-900/10 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <CardDescription>Completed</CardDescription>
          <CardTitle className="text-3xl font-bold tabular-nums text-foreground">
            {completedAssignments}
          </CardTitle>
          <CardAction>
            <Badge variant="secondary" className="gap-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
              <CheckCircle2 className="size-3" />
              Done
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="pt-0">
          <p className="text-xs text-muted-foreground">
            {inProgressAssignments} still in progress
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}