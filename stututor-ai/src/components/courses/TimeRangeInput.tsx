import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

interface TimeRangeInputProps {
    startTime: string
    endTime: string
    onStartTimeChange: (time: string) => void
    onEndTimeChange: (time: string) => void
}

export default function TimeRangeInput({
    startTime,
    endTime,
    onStartTimeChange,
    onEndTimeChange
}: TimeRangeInputProps) {
    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
                <Label htmlFor="start-time">Start Time</Label>
                <Input
                    id="start-time"
                    name="start-time"
                    type="time"
                    value={startTime}
                    onChange={(e) => onStartTimeChange(e.target.value)}
                    required
                />
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="end-time">End Time</Label>
                <Input
                    id="end-time"
                    name="end-time"
                    type="time"
                    value={endTime}
                    onChange={(e) => onEndTimeChange(e.target.value)}
                    required
                />
            </div>
        </div>
    )
}
