"use client"
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { DataTable } from "@/components/data-table"
import AssignmentStatsCards from '@/components/assignments/assignment-stats-cards'
import { SiteHeader } from '@/components/site-header'
import { useUser } from '@/contexts/UserContext'



export default function Assignments() {
    const {assignments, assignmentTableData } = useUser()
    
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

                    <div className="mb-6">
                        <h1 className="text-3xl font-bold">Assignments</h1>
                        <p className="text-muted-foreground mt-1">Manage your assignments</p>
                    </div>

                    {/* Total Assignments Card */}
                    <AssignmentStatsCards />

                    {/* Assignment table */}
                    <DataTable data={assignmentTableData} />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
