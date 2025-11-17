"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, BookOpen, MessageSquare, Calendar, FileText, TrendingUp } from "lucide-react"

interface ActionButton {
  id: string
  label: string
  description: string
  icon: React.ReactNode
  variant: "default" | "outline" | "secondary"
  onClick: () => void
}

export default function QuickActions() {
  const router = useRouter()

  const actions: ActionButton[] = [
    {
      id: "1",
      label: "Upload Materials",
      description: "Add notes, PDFs, or documents",
      icon: <Upload className="h-5 w-5" />,
      variant: "default",
      onClick: () => router.push("/dashboard/materials")
    },
    {
      id: "2",
      label: "Start Study Session",
      description: "Begin a focused study period",
      icon: <BookOpen className="h-5 w-5" />,
      variant: "default",
      onClick: () => router.push("/dashboard/courses")
    },
    {
      id: "3",
      label: "Ask AI Tutor",
      description: "Get help with any subject",
      icon: <MessageSquare className="h-5 w-5" />,
      variant: "secondary",
      onClick: () => router.push("/dashboard/ai-tutor")
    },
    {
      id: "4",
      label: "View Calendar",
      description: "Check your schedule",
      icon: <Calendar className="h-5 w-5" />,
      variant: "outline",
      onClick: () => router.push("/dashboard/calendar")
    },
    {
      id: "5",
      label: "Generate Summary",
      description: "AI-powered notes summary",
      icon: <FileText className="h-5 w-5" />,
      variant: "outline",
      onClick: () => router.push("/dashboard/materials?action=generate-summary")
    },
    {
      id: "6",
      label: "View Analytics",
      description: "Track your progress",
      icon: <TrendingUp className="h-5 w-5" />,
      variant: "outline",
      onClick: () => router.push("/dashboard/analytics")
    }
  ]

  return (
    <Card className="glass-card border-white/40 dark:border-white/10 shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
          Quick Actions
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          Frequently used tools and features
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {actions.map((action) => (
            <Button
              key={action.id}
              variant={action.variant}
              className="h-auto flex-col items-start p-5 text-left glass hover:glass-strong transition-all duration-300 hover:scale-105 hover:shadow-lg border-white/30 dark:border-white/10"
              onClick={action.onClick}
            >
              <div className="flex items-center gap-3 mb-2 w-full">
                <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                  {action.icon}
                </div>
                <span className="font-semibold text-base">{action.label}</span>
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400 font-normal">
                {action.description}
              </span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
