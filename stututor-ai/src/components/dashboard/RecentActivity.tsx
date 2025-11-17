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

const activityConfig = {
  study: {
    gradient: "gradient-cyan-blue",
    glow: "glow-cyan"
  },
  upload: {
    gradient: "gradient-purple-pink",
    glow: "glow-purple"
  },
  complete: {
    gradient: "gradient-emerald-teal",
    glow: "glow-emerald"
  },
  question: {
    gradient: "gradient-orange-yellow",
    glow: "glow-orange"
  }
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
    <Card variant="glass" className="border-white/10 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold gradient-text-orange">
          Recent Activity
        </CardTitle>
        <CardDescription className="text-white/60 text-sm">
          Your latest study sessions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-3 max-h-[500px] overflow-y-auto pr-1">
          {/* Gradient timeline connector */}
          <div className="absolute left-[18px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-transparent opacity-30" />

          {activities.map((activity) => {
            const Icon = activityIcons[activity.type]
            const config = activityConfig[activity.type]

            return (
              <div
                key={activity.id}
                className="relative flex gap-3 group"
              >
                {/* Gradient icon with glow */}
                <div className={`relative z-10 flex-shrink-0 p-2 rounded-lg ${config.gradient} text-white shadow-lg ${config.glow} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-4 w-4" />
                </div>

                {/* Activity content */}
                <div className="flex-1 pb-2">
                  <div className="glass-card glass-hover p-3 rounded-lg border border-white/10 transition-all duration-300">
                    <div className="space-y-1.5">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-xs font-semibold leading-tight text-white">
                          {activity.title}
                        </p>
                        <span className="text-[10px] text-white/40 whitespace-nowrap font-medium">
                          {activity.timestamp}
                        </span>
                      </div>
                      <p className="text-[11px] text-white/60 leading-snug">
                        {activity.description}
                      </p>
                      {activity.course && (
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0 mt-1 glass-strong border-white/20 text-white/70">
                          {activity.course}
                        </Badge>
                      )}
                    </div>
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
