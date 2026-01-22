import React from 'react'
import { DayOfWeek } from '@/types/Courses'
import { Button } from '../ui/button'

interface DaySelectorProps {
    selectedDays: DayOfWeek[]
    onDaysChange: (days: DayOfWeek[]) => void
}

const DAYS: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const DAY_ABBR: Record<DayOfWeek, string> = {
    Monday: 'M',
    Tuesday: 'T',
    Wednesday: 'W',
    Thursday: 'Th',
    Friday: 'F',
    Saturday: 'Sa',
    Sunday: 'Su'
}

export default function DaySelector({ selectedDays, onDaysChange }: DaySelectorProps) {
    const toggleDay = (day: DayOfWeek) => {
        if (selectedDays.includes(day)) {
            onDaysChange(selectedDays.filter(d => d !== day))
        } else {
            onDaysChange([...selectedDays, day])
        }
    }

    return (
        <div className="flex gap-2 flex-wrap">
            {DAYS.map((day) => (
                <Button
                    key={day}
                    type="button"
                    variant={selectedDays.includes(day) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleDay(day)}
                    className="min-w-[2.5rem] px-2"
                >
                    {DAY_ABBR[day]}
                </Button>
            ))}
        </div>
    )
}
