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
  gradient: string
}

const StatCard = ({ title, value, icon, description, trend, gradient }: StatCardProps) => (
  <Card className="glass-card hover:glass-strong transition-all duration-300 hover:scale-105 border-white/40 dark:border-white/10 shadow-xl overflow-hidden group">
    <div className={`absolute inset-0 ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
      <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-200">
        {title}
      </CardTitle>
      <div className={`h-10 w-10 rounded-lg ${gradient} p-2 text-white shadow-lg`}>
        {icon}
      </div>
    </CardHeader>
    <CardContent className="relative z-10">
      <div className="text-3xl font-bold bg-gradient-to-br from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
        {value}
      </div>
      {description && (
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">{description}</p>
      )}
      {trend && (
        <div className={`text-xs mt-2 flex items-center gap-1 font-semibold ${trend.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
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
      trend: { value: 12, isPositive: true },
      gradient: "bg-gradient-to-br from-blue-500 to-cyan-500"
    },
    {
      title: "Active Courses",
      value: 5,
      icon: <BookOpen className="h-4 w-4" />,
      description: "2 courses completed this semester",
      gradient: "bg-gradient-to-br from-purple-500 to-pink-500"
    },
    {
      title: "Completed Sessions",
      value: 42,
      icon: <Target className="h-4 w-4" />,
      description: "This month",
      trend: { value: 8, isPositive: true },
      gradient: "bg-gradient-to-br from-green-500 to-emerald-500"
    },
    {
      title: "Average Score",
      value: "87%",
      icon: <TrendingUp className="h-4 w-4" />,
      description: "Across all subjects",
      trend: { value: 5, isPositive: true },
      gradient: "bg-gradient-to-br from-orange-500 to-yellow-500"
    }
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  )
}
