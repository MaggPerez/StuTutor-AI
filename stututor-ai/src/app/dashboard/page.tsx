import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { ChartPieLegend } from "@/components/chart-pie-legend"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import QuickActions from "@/components/dashboard/QuickActions"
import UpcomingTasks from "@/components/dashboard/UpcomingTasks"
import TodaysClasses from "@/components/dashboard/TodaysClasses"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Calendar } from "lucide-react"

import data from "./data.json"

import { createClient } from "../../../lib/supabase/server"
import { redirect } from "next/navigation"

export default async function Page() {
  const currentDate = new Date()
  const timeOfDay = currentDate.getHours() < 12 ? 'Morning' : currentDate.getHours() < 18 ? 'Afternoon' : 'Evening'

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

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
      <SidebarInset className="bg-transparent">

        {/* Animated Background - Phantom Theme */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          {/* Deep dark background */}
          <div className="absolute inset-0 bg-background" />

          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8b5cf61a_1px,transparent_1px),linear-gradient(to_bottom,#8b5cf61a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

          {/* Glowing Orbs */}
          <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-600/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse" />
          <div className="absolute top-0 -right-4 w-96 h-96 bg-teal-500/10 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse delay-1000" />
          <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/10 rounded-full mix-blend-screen filter blur-3xl opacity-20" />
        </div>

        <SiteHeader />

        <div className="flex flex-1 flex-col p-4 lg:p-6 gap-8 overflow-x-hidden max-w-[1600px] mx-auto w-full">

          {/* Welcome Section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-1">

              {/* Welcome Message */}
              <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-teal-400 bg-clip-text text-transparent">
                Good {timeOfDay}, {user?.user_metadata.full_name}!
              </h1>

              {/* Current Date */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="size-4" />
                <p>{currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge
                variant="secondary"
                className="gap-1.5 px-4 py-2 bg-amber-500/10 text-amber-500 border border-amber-500/20 shadow-[0_0_15px_-3px_rgba(245,158,11,0.2)] hover:shadow-[0_0_20px_-3px_rgba(245,158,11,0.4)] transition-all"
              >
                <Sparkles className="size-4 fill-amber-500 text-amber-500" />
                <span className="font-semibold">0-Day Streak</span>
              </Badge>
            </div>
          </div>




          {/* Stats Overview */}
          <section>
            <SectionCards />
          </section>

          {/* Quick Actions */}
          <section>
            <QuickActions />
          </section>


          {/* Upcoming Tasks and Today's Classes */}
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-6 ">
              {/* Upcoming Tasks Checklist */}
              <div className="h-fit">
                <UpcomingTasks />
              </div>

              {/* Today's Classes */}
              <div className="h-fit">
                <TodaysClasses />
              </div>
            </div>
          </div>

        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
