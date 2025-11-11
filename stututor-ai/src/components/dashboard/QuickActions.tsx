"use client"

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
  const actions: ActionButton[] = [
    {
      id: "1",
      label: "Upload Materials",
      description: "Add notes, PDFs, or documents",
      icon: <Upload className="h-5 w-5" />,
      variant: "default",
      onClick: () => console.log("Upload materials")
    },
    {
      id: "2",
      label: "Start Study Session",
      description: "Begin a focused study period",
      icon: <BookOpen className="h-5 w-5" />,
      variant: "default",
      onClick: () => console.log("Start study session")
    },
    {
      id: "3",
      label: "Ask AI Tutor",
      description: "Get help with any subject",
      icon: <MessageSquare className="h-5 w-5" />,
      variant: "secondary",
      onClick: () => console.log("Ask AI tutor")
    },
    {
      id: "4",
      label: "View Calendar",
      description: "Check your schedule",
      icon: <Calendar className="h-5 w-5" />,
      variant: "outline",
      onClick: () => console.log("View calendar")
    },
    {
      id: "5",
      label: "Generate Summary",
      description: "AI-powered notes summary",
      icon: <FileText className="h-5 w-5" />,
      variant: "outline",
      onClick: () => console.log("Generate summary")
    },
    {
      id: "6",
      label: "View Analytics",
      description: "Track your progress",
      icon: <TrendingUp className="h-5 w-5" />,
      variant: "outline",
      onClick: () => console.log("View analytics")
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Frequently used tools and features</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {actions.map((action) => (
            <Button
              key={action.id}
              variant={action.variant}
              className="h-auto flex-col items-start p-4 text-left"
              onClick={action.onClick}
            >
              <div className="flex items-center gap-2 mb-2">
                {action.icon}
                <span className="font-semibold">{action.label}</span>
              </div>
              <span className="text-xs text-muted-foreground font-normal">
                {action.description}
              </span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
