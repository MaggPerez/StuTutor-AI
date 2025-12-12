"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Upload, CheckCircle2, MessageSquare, Clock } from "lucide-react"

interface Activity {
  id: string
  type: "study" | "upload" | "complete" | "question"
  title: string
  description: string
  timestamp: string
  course?: string
}

const activityIcons = {
  study: BookOpen,
  upload: Upload,
  complete: CheckCircle2,
  question: MessageSquare
}

const activityColors = {
  study: "text-blue-400 bg-blue-400/10",
  upload: "text-purple-400 bg-purple-400/10",
  complete: "text-green-400 bg-green-400/10",
  question: "text-amber-400 bg-amber-400/10"
}

export default function RecentActivity() {
  const activities: Activity[] = [
    {
      id: "1",
      type: "complete",
      title: "Completed practice quiz",
      description: "Calculus II - Derivatives",
      timestamp: "2h ago",
      course: "Calculus II"
    },
    {
      id: "2",
      type: "upload",
      title: "Uploaded lecture notes",
      description: "Data Structures - Trees.pdf",
      timestamp: "4h ago",
      course: "CS 101"
    },
    {
      id: "3",
      type: "question",
      title: "Asked AI tutor",
      description: "Oxidation-reduction help",
      timestamp: "5h ago",
      course: "Chemistry"
    },
    {
      id: "4",
      type: "study",
      title: "Study session",
      description: "Renaissance Period (45m)",
      timestamp: "Yesterday",
      course: "History"
    },
    {
        id: "5",
        type: "complete",
        title: "Finished reading",
        description: "English Lit - Ch 7-9",
        timestamp: "Yesterday",
        course: "English"
      }
  ]

  return (
    <Card className="h-full border-t-4 border-t-amber-500 shadow-md bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
            <Clock className="size-5 text-amber-500" />
            Recent Activity
        </CardTitle>
        <CardDescription>
          Latest sessions & updates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activityIcons[activity.type]
            const colorClass = activityColors[activity.type]

            return (
              <div
                key={activity.id}
                className="flex gap-3 items-start p-2 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className={`mt-0.5 p-2 rounded-md ${colorClass}`}>
                  <Icon className="size-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between">
                    <p className="text-sm font-medium leading-none">
                        {activity.title}
                    </p>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {activity.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {activity.description}
                  </p>
                  {activity.course && (
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5 mt-1 border-white/10 bg-white/5">
                      {activity.course}
                    </Badge>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
