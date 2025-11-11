"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Upload, BookOpen, CheckCircle2, MessageSquare } from "lucide-react"

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
  study: "text-blue-500",
  upload: "text-purple-500",
  complete: "text-green-500",
  question: "text-orange-500"
}

export default function RecentActivity() {
  const activities: Activity[] = [
    {
      id: "1",
      type: "complete",
      title: "Completed practice quiz",
      description: "Calculus II - Derivatives & Integration",
      timestamp: "2 hours ago",
      course: "Calculus II"
    },
    {
      id: "2",
      type: "upload",
      title: "Uploaded lecture notes",
      description: "Data Structures - Binary Trees.pdf",
      timestamp: "4 hours ago",
      course: "Data Structures"
    },
    {
      id: "3",
      type: "question",
      title: "Asked AI tutor",
      description: "Explained oxidation-reduction reactions",
      timestamp: "5 hours ago",
      course: "Organic Chemistry"
    },
    {
      id: "4",
      type: "study",
      title: "Study session",
      description: "World History - Renaissance Period (45 min)",
      timestamp: "Yesterday",
      course: "World History"
    },
    {
      id: "5",
      type: "complete",
      title: "Finished reading assignment",
      description: "English Literature - Chapter 7-9",
      timestamp: "Yesterday",
      course: "English Literature"
    },
    {
      id: "6",
      type: "upload",
      title: "Uploaded study materials",
      description: "Chemistry Lab Report - Experiment 3.docx",
      timestamp: "2 days ago",
      course: "Organic Chemistry"
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest study sessions and interactions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => {
            const Icon = activityIcons[activity.type]
            const colorClass = activityColors[activity.type]

            return (
              <div key={activity.id} className="flex gap-4">
                <div className={`mt-1 ${colorClass}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 flex-1">
                      <p className="text-sm font-medium leading-none">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                      {activity.course && (
                        <Badge variant="outline" className="text-xs mt-1">
                          {activity.course}
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                      {activity.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
