import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AssignmentCardProps } from '@/types/Assignments'
import { FileText, PlayCircle, CheckCircle2, Clock, AlertCircle } from 'lucide-react'


export default function AssignmentStatsCards({ title, total, active, completed, pending, overdue }: AssignmentCardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <FileText className="h-8 w-8 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold">{total}</p>
            </CardContent>
        </Card>

        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Assignments</CardTitle>
                <PlayCircle className="h-8 w-8 text-blue-500" />
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold">{active || 0}</p>
            </CardContent>
        </Card>

        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed Assignments</CardTitle>
                <CheckCircle2 className="h-8 w-8 text-green-500" />
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold">{completed || 0}</p>
            </CardContent>
        </Card>

        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
                <Clock className="h-8 w-8 text-yellow-500" />
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold">{pending || 0}</p>
            </CardContent>
        </Card>

        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overdue Assignments</CardTitle>
                <AlertCircle className="h-8 w-8 text-red-500" />
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold">{overdue || 0}</p>
            </CardContent>
        </Card>
    </div>
  )
}
