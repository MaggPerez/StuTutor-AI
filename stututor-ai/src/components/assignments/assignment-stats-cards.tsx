import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface AssignmentCardProps {
    title: string,
    total: number,
    active?: number,
    completed?: number,
    pending?: number,
    overdue?: number,
}

export default function AssignmentStatsCards({ title, total, active, completed, pending, overdue }: AssignmentCardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold">{total}</p>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Active Assignments</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold">{active || 0}</p>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Completed Assignments</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold">{completed || 0}</p>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Pending Assignments</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold">{pending || 0}</p>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Overdue Assignments</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold">{overdue || 0}</p>
            </CardContent>
        </Card>
    </div>
  )
}
