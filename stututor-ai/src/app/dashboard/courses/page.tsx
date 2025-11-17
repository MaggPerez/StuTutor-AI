"use client"

import { useState } from "react"
import { BookOpen, Clock, Users, MoreVertical, Search, Filter } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock course data
const courses = [
  {
    id: 1,
    title: "Linear Algebra",
    subject: "Mathematics",
    progress: 65,
    totalHours: 40,
    completedHours: 26,
    nextSession: "Tomorrow, 2:00 PM",
    status: "in-progress",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    title: "Quantum Physics",
    subject: "Physics",
    progress: 45,
    totalHours: 48,
    completedHours: 21.6,
    nextSession: "Today, 4:30 PM",
    status: "in-progress",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    title: "Organic Chemistry",
    subject: "Chemistry",
    progress: 80,
    totalHours: 35,
    completedHours: 28,
    nextSession: "Friday, 10:00 AM",
    status: "in-progress",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 4,
    title: "Data Structures",
    subject: "Computer Science",
    progress: 55,
    totalHours: 50,
    completedHours: 27.5,
    nextSession: "Wednesday, 3:00 PM",
    status: "in-progress",
    color: "from-orange-500 to-red-500",
  },
  {
    id: 5,
    title: "World History",
    subject: "History",
    progress: 90,
    totalHours: 30,
    completedHours: 27,
    nextSession: "Completed",
    status: "completed",
    color: "from-amber-500 to-yellow-500",
  },
  {
    id: 6,
    title: "English Literature",
    subject: "Literature",
    progress: 100,
    totalHours: 32,
    completedHours: 32,
    nextSession: "Completed",
    status: "completed",
    color: "from-indigo-500 to-purple-500",
  },
]

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState("all")

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.subject.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter =
      filter === "all" ||
      (filter === "in-progress" && course.status === "in-progress") ||
      (filter === "completed" && course.status === "completed")
    return matchesSearch && matchesFilter
  })

  const inProgressCount = courses.filter((c) => c.status === "in-progress").length
  const completedCount = courses.filter((c) => c.status === "completed").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Courses</h1>
        <p className="text-muted-foreground">
          Manage and track your learning journey
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courses.length}</div>
            <p className="text-xs text-muted-foreground">
              {inProgressCount} in progress
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">132.1h</div>
            <p className="text-xs text-muted-foreground">
              Across all courses
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Progress</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">69%</div>
            <p className="text-xs text-muted-foreground">
              {completedCount} completed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search courses..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setFilter("all")}>
              All Courses
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("in-progress")}>
              In Progress
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("completed")}>
              Completed
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Courses Grid */}
      <Tabs defaultValue="grid" className="w-full">
        <TabsList>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>
        <TabsContent value="grid" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${course.color}`} />
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <CardDescription>{course.subject}</CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Study Now</DropdownMenuItem>
                        <DropdownMenuItem>View Materials</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Hours</span>
                    <span className="font-medium">
                      {course.completedHours}/{course.totalHours}h
                    </span>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Next session
                      </span>
                      <Badge
                        variant={
                          course.status === "completed" ? "secondary" : "default"
                        }
                        className="text-xs"
                      >
                        {course.nextSession}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="list" className="mt-6">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {filteredCourses.map((course) => (
                  <div
                    key={course.id}
                    className="flex items-center justify-between p-4 hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div
                        className={`w-12 h-12 rounded-lg bg-gradient-to-br ${course.color} flex items-center justify-center`}
                      >
                        <BookOpen className="h-6 w-6 text-white" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-semibold">{course.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {course.subject}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="space-y-1 text-right">
                        <p className="text-sm font-medium">{course.progress}%</p>
                        <p className="text-xs text-muted-foreground">
                          {course.completedHours}/{course.totalHours}h
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
