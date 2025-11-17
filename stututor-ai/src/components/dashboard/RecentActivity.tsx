"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, BookOpen, CheckCircle2, MessageSquare } from "lucide-react"

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
    <Card className="glass-card border-white/40 dark:border-white/10 shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 dark:from-orange-400 dark:to-yellow-400 bg-clip-text text-transparent">
          Recent Activity
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          Your latest study sessions and interactions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
          {activities.map((activity) => {
            const Icon = activityIcons[activity.type]
            const colorClass = activityColors[activity.type]

            return (
              <div
                key={activity.id}
                className="flex gap-4 p-3 rounded-lg glass-card hover:glass-strong transition-all duration-300 border border-white/30 dark:border-white/10"
              >
                <div className={`mt-1 p-2 rounded-lg bg-white/50 dark:bg-gray-800/50 ${colorClass}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1.5 flex-1">
                      <p className="text-sm font-semibold leading-none text-gray-800 dark:text-gray-100">
                        {activity.title}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {activity.description}
                      </p>
                      {activity.course && (
                        <Badge variant="outline" className="text-xs mt-1 glass border-white/30 dark:border-white/10">
                          {activity.course}
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-500 whitespace-nowrap ml-2 font-medium">
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
