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
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">

              {/* welcome message */}
              <div className="ml-8">
                <h1 className="text-2xl font-semibold sm:text-3xl">Good Morning John!</h1>
                <p className="text-muted-foreground mt-1 text-sm">
                  Here's an overview of your study
                  activities and progress.
                </p>

              </div>
              <SectionCards />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 px-4 lg:px-6">
                <ChartPieLegend />
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
