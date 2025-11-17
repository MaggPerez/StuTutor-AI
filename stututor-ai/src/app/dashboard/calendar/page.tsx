"use client"

import { Calendar, Clock, Video, MapPin } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const upcomingEvents = [
  {
    id: 1,
    title: "Linear Algebra Study Session",
    type: "study",
    date: "Today",
    time: "2:00 PM - 3:30 PM",
    location: "Online",
    color: "blue",
  },
  {
    id: 2,
    title: "Quantum Physics Lab",
    type: "lab",
    date: "Tomorrow",
    time: "10:00 AM - 12:00 PM",
    location: "Physics Building, Room 203",
    color: "purple",
  },
  {
    id: 3,
    title: "Chemistry Assignment Due",
    type: "deadline",
    date: "March 20",
    time: "11:59 PM",
    location: "Online Submission",
    color: "red",
  },
  {
    id: 4,
    title: "Computer Science Lecture",
    type: "lecture",
    date: "March 21",
    time: "9:00 AM - 10:30 AM",
    location: "Main Hall, Room 101",
    color: "green",
  },
]

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Calendar & Schedule</h1>
        <p className="text-muted-foreground">
          Manage your study sessions, deadlines, and events
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Calendar View Placeholder */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>March 2024</CardTitle>
            <CardDescription>Your study schedule overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-96 bg-muted/50 rounded-lg">
              <div className="text-center space-y-2">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground" />
                <p className="text-muted-foreground">
                  Calendar widget coming soon
                </p>
                <p className="text-sm text-muted-foreground">
                  This will display a full interactive calendar view
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Your next scheduled items</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div
                    className={`w-1 rounded-full bg-${event.color}-500`}
                  />
                  <div className="flex-1 space-y-1">
                    <h4 className="font-semibold text-sm">{event.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{event.date}, {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      {event.location.includes("Online") ? (
                        <Video className="h-3 w-3" />
                      ) : (
                        <MapPin className="h-3 w-3" />
                      )}
                      <span>{event.location}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {event.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Button className="w-full">Add New Event</Button>
        </div>
      </div>
    </div>
  )
}
