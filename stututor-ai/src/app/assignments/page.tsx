import { AppSidebar } from '@/components/app-sidebar'
import { Button } from '@/components/ui/button'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DataTable } from "@/components/data-table"
import data from "../dashboard/data.json"
import React from 'react'
import AssignmentStatsCards from '@/components/assignments/assignment-stats-cards'
import { SiteHeader } from '@/components/site-header'



export default function Assignments() {
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

                <SiteHeader />

                {/* Total Assignments Card */}
                <div className='p-4'>
                    <AssignmentStatsCards title="Total Assignments" total={data.length} />

                    {/* Assignment table */}
                    <DataTable data={data} />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
