"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Clock, Target, TrendingUp } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  description?: string
  trend?: {
    value: number
    isPositive: boolean
  }
}

const StatCard = ({ title, value, icon, description, trend }: StatCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className="h-4 w-4 text-muted-foreground">{icon}</div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {description && (
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      )}
      {trend && (
        <div className={`text-xs mt-1 flex items-center gap-1 ${trend.isPositive ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
          <TrendingUp className={`h-3 w-3 ${!trend.isPositive && 'rotate-180'}`} />
          <span>{Math.abs(trend.value)}% from last week</span>
        </div>
      )}
    </CardContent>
  </Card>
)

export default function StatsCards() {
  const stats = [
    {
      title: "Study Time This Week",
      value: "24.5h",
      icon: <Clock className="h-4 w-4" />,
      description: "3.5 hours per day average",
      trend: { value: 12, isPositive: true }
    },
    {
      title: "Active Courses",
      value: 5,
      icon: <BookOpen className="h-4 w-4" />,
      description: "2 courses completed this semester"
    },
    {
      title: "Completed Sessions",
      value: 42,
      icon: <Target className="h-4 w-4" />,
      description: "This month",
      trend: { value: 8, isPositive: true }
    },
    {
      title: "Average Score",
      value: "87%",
      icon: <TrendingUp className="h-4 w-4" />,
      description: "Across all subjects",
      trend: { value: 5, isPositive: true }
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  )
}
