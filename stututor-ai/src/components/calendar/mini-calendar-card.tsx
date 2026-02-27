"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"

interface MiniCalendarCardProps {
    selectedDate: Date
    onDateSelect: (date: Date | undefined) => void
}

export function MiniCalendarCard({ selectedDate, onDateSelect }: MiniCalendarCardProps) {
    return (
        <Card className="flex flex-col h-full bg-black/20 border-white/5 shadow-2xl overflow-hidden rounded-2xl relative">

            <CardContent className="overflow-hidden flex-1 flex items-center justify-center p-6 bg-transparent">
                <div className="flex items-center justify-center w-full">
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={onDateSelect}
                        className="rounded-xl w-full scale-100 bg-black/40 border border-white/5 p-3 text-white shadow-inner"
                        classNames={{
                            day_selected: "bg-[#e0c2ff] text-zinc-950 hover:bg-[#e0c2ff]/90 hover:text-zinc-950 focus:bg-[#e0c2ff] focus:text-zinc-950 rounded-md font-semibold",
                            day_today: "bg-white/10 text-white rounded-md",
                            head_cell: "text-muted-foreground font-medium text-[11px] uppercase tracking-wider",
                        }}
                    />
                </div>
            </CardContent>
        </Card>
    )
}
