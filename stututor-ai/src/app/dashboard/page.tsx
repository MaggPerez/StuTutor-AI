"use client"

import React from 'react'
import { format } from 'date-fns'
import { Sparkles, Calendar } from 'lucide-react'
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
    <div className="relative w-full">
      {/* Animated Gradient Background - adjusted for layout */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] dark:opacity-10" />
        {/* Floating gradient orbs */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob dark:bg-purple-700 dark:opacity-30" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 dark:bg-yellow-700 dark:opacity-30" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 dark:bg-pink-700 dark:opacity-30" />
      </div>

      {/* Welcome Section */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Good {timeOfDay}, Student!
            </h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <p>{format(currentDate, 'EEEE, MMMM d, yyyy')}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge
              variant="secondary"
              className="gap-1.5 px-4 py-2 glass-card border-white/40 dark:border-white/10 shadow-md hover:shadow-lg transition-all"
            >
              <Sparkles className="h-4 w-4 text-yellow-500" />
              <span className="font-semibold">5-day streak</span>
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="space-y-6">
        {/* Stats Overview */}
        <section className="animate-fade-in">
          <StatsCards />
        </section>

        {/* Quick Actions */}
        <section className="animate-fade-in animation-delay-100">
          <QuickActions />
        </section>

        {/* Improved Layout - Better Visual Hierarchy */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Primary Content */}
          <div className="lg:col-span-2 space-y-6">
            <section className="animate-fade-in animation-delay-200">
              <PerformanceChart />
            </section>
            <section className="animate-fade-in animation-delay-300">
              <StudyProgress />
            </section>
          </div>

          {/* Right Column - Secondary Content */}
          <div className="lg:col-span-1 space-y-6">
            <section className="animate-fade-in animation-delay-400">
              <UpcomingTasks />
            </section>
            <section className="animate-fade-in animation-delay-500">
              <RecentActivity />
            </section>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .animation-delay-100 {
          animation-delay: 0.1s;
          opacity: 0;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
          opacity: 0;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }

        .animation-delay-500 {
          animation-delay: 0.5s;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}
