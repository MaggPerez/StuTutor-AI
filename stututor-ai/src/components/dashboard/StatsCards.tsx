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
  <Card
    variant="glass"
    className="glass-hover card-lift border-white/10 shadow-2xl overflow-hidden group relative"
  >
    {/* Gradient background overlay */}
    <div className={`absolute inset-0 ${gradient} opacity-20 group-hover:opacity-30 transition-all duration-500`} />

    {/* Glow effect on hover */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      <div className={`absolute inset-0 ${gradient} blur-xl opacity-50`} />
    </div>

    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
      <CardTitle className="text-sm font-medium text-white/80 uppercase tracking-wide">
        {title}
      </CardTitle>
      <div className={`h-12 w-12 rounded-xl ${gradient} p-2.5 text-white shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
    </CardHeader>

    <CardContent className="relative z-10">
      <div className="text-4xl md:text-5xl font-bold text-white mb-2">
        {value}
      </div>
      {description && (
        <p className="text-sm text-white/60 mb-2">{description}</p>
      )}
      {trend && (
        <div className={`text-xs mt-3 flex items-center gap-1.5 font-semibold ${trend.isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
          <TrendingUp className={`h-4 w-4 ${!trend.isPositive && 'rotate-180'}`} />
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
      icon: <Clock className="h-5 w-5" />,
      description: "3.5 hours per day average",
      trend: { value: 12, isPositive: true },
      gradient: "gradient-cyan-blue"
    },
    {
      title: "Active Courses",
      value: 5,
      icon: <BookOpen className="h-5 w-5" />,
      description: "2 courses completed this semester",
      gradient: "gradient-purple-pink"
    },
    {
      title: "Completed Sessions",
      value: 42,
      icon: <Target className="h-5 w-5" />,
      description: "This month",
      trend: { value: 8, isPositive: true },
      gradient: "gradient-emerald-teal"
    },
    {
      title: "Average Score",
      value: "87%",
      icon: <TrendingUp className="h-5 w-5" />,
      description: "Across all subjects",
      trend: { value: 5, isPositive: true },
      gradient: "gradient-orange-yellow"
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
