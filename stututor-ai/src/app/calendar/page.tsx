"use client"

import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import React, { useState, useEffect } from 'react'
import { WeekView } from '@/components/calendar/week-view'
import { MiniCalendarCard } from '@/components/calendar/mini-calendar-card'
import { UpcomingAssignmentsCard } from '@/components/calendar/upcoming-assignments-card'
import { Assignment } from '@/types/Assignments'
import { getUserAssignments } from '../../../lib/supabase/database-client'

export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())
    const [assignments, setAssignments] = useState<Assignment[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const data = await getUserAssignments()
                setAssignments(data)
            } catch (error) {
                console.error('Failed to fetch assignments:', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchAssignments()
    }, [])

    const handlePreviousWeek = () => {
        setCurrentDate(prev => {
            const newDate = new Date(prev)
            newDate.setDate(newDate.getDate() - 7)
            return newDate
        })
    }

    const handleNextWeek = () => {
        setCurrentDate(prev => {
            const newDate = new Date(prev)
            newDate.setDate(newDate.getDate() + 7)
            return newDate
        })
    }

    const handleDateSelect = (date: Date | undefined) => {
        if (date) {
            setSelectedDate(date)
            setCurrentDate(date)
        }
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
                <SiteHeader />
                <div className="flex flex-col h-[calc(100vh-var(--header-height))] p-4 lg:p-6">
                    <div className="mb-6 shrink-0">
                        <h1 className="text-3xl font-bold">Calendar</h1>
                        <p className="text-muted-foreground mt-1">
                            Manage your schedule and view upcoming assignments
                        </p>
                    </div>

                    {/* Two-column layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6 flex-1 min-h-0">
                        {/* Left column - Week View */}
                        <div className="min-h-0">
                            <WeekView
                                currentDate={currentDate}
                                onPreviousWeek={handlePreviousWeek}
                                onNextWeek={handleNextWeek}
                                assignments={assignments}
                            />
                        </div>

                        {/* Right column - Calendar and Upcoming Assignments */}
                        <div className="grid grid-rows-2 gap-4 h-full min-h-0">
                            <MiniCalendarCard
                                selectedDate={selectedDate}
                                onDateSelect={handleDateSelect}
                            />
                            <UpcomingAssignmentsCard
                                assignments={assignments}
                                isLoading={isLoading}
                            />
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
