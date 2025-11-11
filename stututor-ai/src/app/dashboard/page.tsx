"use client"

import React from 'react'
import { format } from 'date-fns'
import { Sparkles, Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import StatsCards from '@/components/dashboard/StatsCards'
import StudyProgress from '@/components/dashboard/StudyProgress'
import RecentActivity from '@/components/dashboard/RecentActivity'
import UpcomingTasks from '@/components/dashboard/UpcomingTasks'
import QuickActions from '@/components/dashboard/QuickActions'
import PerformanceChart from '@/components/dashboard/PerformanceChart'

export default function Dashboard() {
  const currentDate = new Date()
  const timeOfDay = currentDate.getHours() < 12 ? 'Morning' : currentDate.getHours() < 18 ? 'Afternoon' : 'Evening'

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight">
                Good {timeOfDay}, Student! 👋
              </h1>
              <p className="text-muted-foreground">
                {format(currentDate, 'EEEE, MMMM d, yyyy')}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="gap-1">
                <Sparkles className="h-3 w-3" />
                5-day streak
              </Badge>
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Stats Overview */}
          <section>
            <StatsCards />
          </section>

          {/* Quick Actions */}
          <section>
            <QuickActions />
          </section>

          {/* Two Column Layout */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left Column */}
            <div className="space-y-8">
              <section>
                <StudyProgress />
              </section>
              <section>
                <RecentActivity />
              </section>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <section>
                <UpcomingTasks />
              </section>
            </div>
          </div>

          {/* Full Width Chart */}
          <section>
            <PerformanceChart />
          </section>
        </div>
      </div>
    </div>
  )
}
