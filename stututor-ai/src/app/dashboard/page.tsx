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
      {/* Enhanced Animated Gradient Background */}
      <div className="fixed inset-0 -z-10 bg-black">
        {/* Floating gradient orbs with enhanced glow */}
        <div className="absolute top-20 left-[10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-40 right-[15%] w-96 h-96 bg-pink-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-[20%] w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-blob animation-delay-4000" />
        <div className="absolute bottom-40 right-[25%] w-80 h-80 bg-emerald-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-blob animation-delay-3000" />

        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60" />
      </div>

      {/* Hero Section - Glassmorphic Welcome Panel */}
      <div className="mb-8 animate-fade-in">
        <div className="glass-gradient rounded-2xl p-6 md:p-8 border border-white/10 relative overflow-hidden group">
          {/* Subtle animated gradient border effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-3">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                <span className="gradient-text-purple-pink">
                  Good {timeOfDay}!
                </span>
              </h1>
              <div className="flex items-center gap-3 text-white/70">
                <Calendar className="h-5 w-5" />
                <p className="text-lg">{format(currentDate, 'EEEE, MMMM d, yyyy')}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge
                variant="secondary"
                className="gap-2 px-6 py-3 glass-strong border-white/20 shadow-xl hover:shadow-2xl transition-all hover:scale-105 glow-hover"
              >
                <Sparkles className="h-5 w-5 text-yellow-400 animate-pulse" />
                <span className="text-lg font-bold gradient-text-orange">5-day streak</span>
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="space-y-8">
        {/* Stats Overview - Large Cards */}
        <section className="animate-fade-in animation-delay-100">
          <StatsCards />
        </section>

        {/* Three-Column Layout */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left Column - Performance (40%) */}
          <div className="lg:col-span-5 space-y-6">
            <section className="animate-fade-in animation-delay-200">
              <PerformanceChart />
            </section>
          </div>

          {/* Middle Column - Progress & Actions (35%) */}
          <div className="lg:col-span-4 space-y-6">
            <section className="animate-fade-in animation-delay-300">
              <StudyProgress />
            </section>
            <section className="animate-fade-in animation-delay-400">
              <QuickActions />
            </section>
          </div>

          {/* Right Column - Activity Feed (25%) */}
          <div className="lg:col-span-3 space-y-6">
            <section className="animate-fade-in animation-delay-500 lg:sticky lg:top-6">
              <div className="space-y-6">
                <UpcomingTasks />
                <RecentActivity />
              </div>
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

        .animation-delay-3000 {
          animation-delay: 3s;
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
