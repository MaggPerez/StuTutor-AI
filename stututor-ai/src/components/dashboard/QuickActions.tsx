"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, BookOpen, MessageSquare, Calendar, FileText, TrendingUp } from "lucide-react"
import Link from "next/link"

interface ActionButton {
  id: string
  label: string
  description: string
  icon: React.ReactNode
  variant: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  href: string
}

export default function QuickActions() {
  const actions: ActionButton[] = [
    {
      id: "1",
      label: "AI Tutor",
      description: "Get help with your studies",
      icon: <MessageSquare className="size-5" />,
      variant: "secondary",
      href: "/aitutor",
    },
    {
      id: "2",
      label: "Assignments",
      description: "View all assignments",
      icon: <FileText className="size-5" />,
      variant: "secondary",
      href: "/assignments",
    },
    {
      id: "3",
      label: "Calendar",
      description: "Check schedule",
      icon: <Calendar className="size-5" />,
      variant: "outline",
      href: "/calendar",
    },
    {
      id: "4",
      label: "Courses",
      description: "View all courses",
      icon: <BookOpen className="size-5" />,
      variant: "outline",
      href: "/courses",
    },
    {
      id: "5",
      label: "Analytics",
      description: "Track progress",
      icon: <TrendingUp className="size-5" />,
      variant: "outline",
      href: "#",
    }
  ]

  return (
    <Card className="border-t-4 border-t-purple-500 shadow-lg bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Quick Actions
        </CardTitle>
        <CardDescription>
          Frequently used tools
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {actions.map((action) => (
            <Button
              key={action.id}
              variant={action.variant}
              className="h-auto flex-col items-center justify-center gap-2 p-4 text-center hover:scale-105 transition-all duration-200 border-primary/20"
              asChild
            >
              <Link href={action.href}>
                <div className={`p-2.5 rounded-full ${action.variant === 'secondary'
                    ? 'bg-primary/20 text-primary'
                    : 'bg-muted text-muted-foreground'
                  }`}>
                  {action.icon}
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-semibold text-sm">{action.label}</span>
                  <span className="text-[10px] text-muted-foreground hidden sm:inline-block">
                    {action.description}
                  </span>
                </div>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
