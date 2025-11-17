"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, BookOpen, MessageSquare, Calendar, FileText, TrendingUp } from "lucide-react"

interface ActionButton {
  id: string
  label: string
  description: string
  icon: React.ReactNode
  gradient: string
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
      gradient: "gradient-purple-pink",
      onClick: () => router.push("/dashboard/materials")
    },
    {
      id: "2",
      label: "Start Study Session",
      description: "Begin a focused study period",
      icon: <BookOpen className="h-5 w-5" />,
      gradient: "gradient-cyan-blue",
      onClick: () => router.push("/dashboard/courses")
    },
    {
      id: "3",
      label: "Ask AI Tutor",
      description: "Get help with any subject",
      icon: <MessageSquare className="h-5 w-5" />,
      gradient: "gradient-emerald-teal",
      onClick: () => router.push("/dashboard/ai-tutor")
    },
    {
      id: "4",
      label: "View Calendar",
      description: "Check your schedule",
      icon: <Calendar className="h-5 w-5" />,
      gradient: "gradient-orange-yellow",
      onClick: () => router.push("/dashboard/calendar")
    },
    {
      id: "5",
      label: "Generate Summary",
      description: "AI-powered notes summary",
      icon: <FileText className="h-5 w-5" />,
      gradient: "gradient-purple",
      onClick: () => router.push("/dashboard/materials?action=generate-summary")
    },
    {
      id: "6",
      label: "View Analytics",
      description: "Track your progress",
      icon: <TrendingUp className="h-5 w-5" />,
      gradient: "gradient-pink",
      onClick: () => router.push("/dashboard/analytics")
    }
  ]

  return (
    <Card variant="glass" className="border-white/10 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold gradient-text-purple-pink">
          Quick Actions
        </CardTitle>
        <CardDescription className="text-white/60">
          Frequently used tools and features
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => (
            <button
              key={action.id}
              onClick={action.onClick}
              className="group relative h-auto flex flex-col items-start p-4 text-left glass-card glass-hover transition-all duration-300 rounded-xl border border-white/10 overflow-hidden"
            >
              {/* Gradient glow on hover */}
              <div className={`absolute inset-0 ${action.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />

              <div className="relative z-10 w-full space-y-3">
                <div className={`p-2.5 rounded-lg ${action.gradient} text-white shadow-lg w-fit group-hover:scale-110 transition-transform duration-300`}>
                  {action.icon}
                </div>
                <div className="space-y-1">
                  <span className="font-semibold text-sm text-white block">
                    {action.label}
                  </span>
                  <span className="text-xs text-white/50 font-normal block">
                    {action.description}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
