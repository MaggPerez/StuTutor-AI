"use client"

import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { Sparkles, Calendar, ChevronDown, ChevronUp } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import StatsCards from '@/components/dashboard/StatsCards'
import StudyProgress from '@/components/dashboard/StudyProgress'
import RecentActivity from '@/components/dashboard/RecentActivity'
import UpcomingTasks from '@/components/dashboard/UpcomingTasks'
import QuickActions from '@/components/dashboard/QuickActions'
import PerformanceChart from '@/components/dashboard/PerformanceChart'
import { DataTable } from '@/components/data-table'
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import data from "./data.json"

export default function Dashboard() {
  const currentDate = new Date()
  const timeOfDay = currentDate.getHours() < 12 ? 'Morning' : currentDate.getHours() < 18 ? 'Afternoon' : 'Evening'
  const [showAssignmentsTable, setShowAssignmentsTable] = useState(false)
  const [isLowPowerMode, setIsLowPowerMode] = useState(false)

  useEffect(() => {
    // Detect low-power devices for optimized rendering
    const checkLowPowerMode = () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const lowCPU = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4
      const isMobile = /mobile|android|iphone|ipad|ipod/i.test(navigator.userAgent)

      return prefersReducedMotion || lowCPU || isMobile
    }

    setIsLowPowerMode(checkLowPowerMode())
  }, [])

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="relative w-full">
              {/* Enhanced Animated Gradient Background - Optimized for Performance */}
              {!isLowPowerMode ? (
                <div className="fixed inset-0 -z-10 bg-black">
                  {/* Floating gradient orbs - Reduced from 4 to 3, lighter blur for better performance */}
                  <div className="absolute top-20 left-[10%] w-80 h-80 bg-purple-600 rounded-full mix-blend-screen filter blur-2xl opacity-15 animate-blob will-change-transform" />
                  <div className="absolute top-40 right-[15%] w-80 h-80 bg-pink-600 rounded-full mix-blend-screen filter blur-2xl opacity-15 animate-blob animation-delay-2000 will-change-transform" />
                  <div className="absolute bottom-20 left-[20%] w-72 h-72 bg-cyan-500 rounded-full mix-blend-screen filter blur-2xl opacity-10 animate-blob animation-delay-4000 will-change-transform" />

                  {/* Gradient overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60" />
                </div>
              ) : (
                /* Static gradient background for low-power devices */
                <div className="fixed inset-0 -z-10 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20" />
              )}

              <div className="px-4 md:px-6">
                {/* Hero Section - Glassmorphic Welcome Panel */}
                <div className="my-8 animate-fade-in">
                  <div className="glass-gradient rounded-2xl p-6 md:p-8 border border-white/10 relative overflow-hidden group">
                    {/* Subtle animated gradient border effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                    <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                      <div className="space-y-3">
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                          <span className="gradient-text-purple-pink">
                            Good {timeOfDay}, John!
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
                          <span className="text-lg font-bold gradient-text-orange">12-day streak</span>
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Dashboard Content */}
                <div className="space-y-8 pb-8">
                  {/* Stats Overview - Large Cards */}
                  <section className="animate-fade-in animation-delay-100">
                    <StatsCards />
                  </section>

                  {/* Three-Column Layout */}
                  <div className="grid gap-6 lg:grid-cols-12">
                    {/* Left Column - Quick Actions (40%) */}
                    <div className="lg:col-span-5 space-y-6">
                      <section className="animate-fade-in animation-delay-200">
                        <QuickActions />
                      </section>
                    </div>

                    {/* Middle Column - Progress & Charts (35%) */}
                    <div className="lg:col-span-4 space-y-6">
                      <section className="animate-fade-in animation-delay-300">
                        <StudyProgress />
                      </section>
                      <section className="animate-fade-in animation-delay-400">
                        <PerformanceChart />
                      </section>
                    </div>

                    {/* Right Column - Tasks & Activity Feed (25%) */}
                    <div className="lg:col-span-3 space-y-6">
                      <section className="animate-fade-in animation-delay-500 lg:sticky lg:top-6">
                        <div className="space-y-6">
                          <UpcomingTasks />
                          <RecentActivity />
                        </div>
                      </section>
                    </div>
                  </div>

                  {/* Collapsible Assignments Section - From V2 */}
                  <section className="animate-fade-in animation-delay-600">
                    <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
                      <button
                        onClick={() => setShowAssignmentsTable(!showAssignmentsTable)}
                        className="w-full p-6 flex items-center justify-between glass-hover transition-all duration-300"
                      >
                        <div className="text-left">
                          <h2 className="text-2xl font-bold gradient-text-cyan-blue mb-1">
                            All Assignments
                          </h2>
                          <p className="text-sm text-white/60">
                            Manage and track all your assignments in one place
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="glass-strong border-white/20">
                            {data.length} assignments
                          </Badge>
                          {showAssignmentsTable ? (
                            <ChevronUp className="h-6 w-6 text-white/60" />
                          ) : (
                            <ChevronDown className="h-6 w-6 text-white/60" />
                          )}
                        </div>
                      </button>

                      {showAssignmentsTable && (
                        <div className="border-t border-white/10 animate-fade-in">
                          <DataTable data={data} />
                        </div>
                      )}
                    </div>
                  </section>
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
                  animation: blob 10s infinite;
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

                .animation-delay-600 {
                  animation-delay: 0.6s;
                  opacity: 0;
                }
              `}</style>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
