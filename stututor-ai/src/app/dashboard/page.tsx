import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import data from "./data.json"
import { ChartPieLegend } from "@/components/chart-pie-legend"

export default function Page() {
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
      <SidebarInset className="bg-background/50">
        <SiteHeader />
        <div className="flex flex-1 flex-col p-4 lg:p-6 gap-6 overflow-x-hidden">
          
          {/* Welcome Section */}
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Good Morning, John!
            </h1>
            <p className="text-muted-foreground text-sm max-w-2xl">
              Here's your daily overview. You have <span className="font-semibold text-primary">8 assignments</span> due this week and your study streak is on fire! 🔥
            </p>
          </div>

          {/* Stats Cards */}
          <SectionCards />

          {/* Charts Section - Equal Height Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            <div className="h-full min-h-[350px]">
              <ChartPieLegend />
            </div>
            <div className="h-full min-h-[350px]">
              <ChartAreaInteractive />
            </div>
          </div>

          {/* Assignments Table */}
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold tracking-tight">Current Assignments</h2>
            <DataTable data={data} />
          </div>
          
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}