"use client"
import { AppSidebar } from '@/components/app-sidebar'
import { Button } from '@/components/ui/button'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DataTable, schema } from "@/components/data-table"
// import data from "../dashboard/data.json"
import React, { useState, useEffect } from 'react'
import AssignmentStatsCards from '@/components/assignments/assignment-stats-cards'
import { SiteHeader } from '@/components/site-header'
import { Assignment } from '@/types/Assignments'
import { getUserAssignments } from '../../../lib/supabase/database-client'
import { z } from 'zod'



export default function Assignments() {
    const [data, setData] = useState<Assignment[]>([])
    const [tableData, setTableData] = useState<z.infer<typeof schema>[]>([])

    useEffect(() => {
        const fetchAssignments = async () => {
            const assignments = await getUserAssignments()
            setData(assignments)

            // Transform assignments to table data with sequential numeric IDs
            const transformedData: z.infer<typeof schema>[] = assignments.map((assignment, index) => {
                // Convert ISO timestamp to simple date string (YYYY-MM-DD)
                const dueDateStr = assignment.dueDate
                    ? new Date(assignment.dueDate).toISOString().split('T')[0]
                    : ''

                return {
                    id: index + 1, // Sequential ID starting from 1
                    assignment_name: assignment.assignment_name,
                    course: assignment.course,
                    type: assignment.type,
                    status: assignment.status,
                    dueDate: dueDateStr, // Simple date format like "2025-11-15"
                    priority: assignment.priority,
                    progress: assignment.progress,
                }
            })

            setTableData(transformedData)
        }
        fetchAssignments()
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
            <SidebarInset className="bg-transparent">

                <SiteHeader />

                {/* Total Assignments Card */}
                <div className='p-4'>

                    <div className="mb-6">
                        <h1 className="text-3xl font-bold">Assignments</h1>
                        <p className="text-muted-foreground mt-1">Manage your assignments</p>
                    </div>

                    <AssignmentStatsCards title="Total Assignments" total={data.length} />

                    {/* Assignment table */}
                    <DataTable data={tableData} />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
