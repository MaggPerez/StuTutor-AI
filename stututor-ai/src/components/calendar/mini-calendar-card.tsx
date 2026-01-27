"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"

interface MiniCalendarCardProps {
    selectedDate: Date
    onDateSelect: (date: Date | undefined) => void
}

export function MiniCalendarCard({ selectedDate, onDateSelect }: MiniCalendarCardProps) {
    return (
        <Card className="flex flex-col h-full">
            <CardContent className="overflow-hidden">
                <div className="flex items-center justify-center w-full">
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={onDateSelect}
                        className="rounded-md w-full scale-95"
                    />
                </div>
            </CardContent>
        </Card>
    )
}
