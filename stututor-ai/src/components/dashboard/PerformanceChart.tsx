"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const studyTimeData = [
  { day: "Mon", hours: 3.5, target: 4 },
  { day: "Tue", hours: 4.2, target: 4 },
  { day: "Wed", hours: 2.8, target: 4 },
  { day: "Thu", hours: 4.5, target: 4 },
  { day: "Fri", hours: 3.9, target: 4 },
  { day: "Sat", hours: 5.1, target: 4 },
  { day: "Sun", hours: 4.3, target: 4 }
]

const subjectPerformanceData = [
  { subject: "Calculus", score: 85 },
  { subject: "Data Str.", score: 78 },
  { subject: "History", score: 92 },
  { subject: "Chemistry", score: 73 },
  { subject: "Literature", score: 88 }
]

const weeklyProgressData = [
  { week: "Week 1", completed: 12, planned: 15 },
  { week: "Week 2", completed: 15, planned: 15 },
  { week: "Week 3", completed: 14, planned: 16 },
  { week: "Week 4", completed: 18, planned: 15 }
]

export default function PerformanceChart() {
  return (
    <Card className="glass-card border-white/40 dark:border-white/10 shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
          Performance Analytics
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          Track your study patterns and progress over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="studytime" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 glass-card p-1 border-white/30 dark:border-white/10">
            <TabsTrigger value="studytime" className="data-[state=active]:glass-strong">
              Study Time
            </TabsTrigger>
            <TabsTrigger value="performance" className="data-[state=active]:glass-strong">
              Subject Scores
            </TabsTrigger>
            <TabsTrigger value="progress" className="data-[state=active]:glass-strong">
              Weekly Progress
            </TabsTrigger>
          </TabsList>

          <TabsContent value="studytime" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={studyTimeData}>
                  <defs>
                    <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="day"
                    className="text-xs"
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <YAxis
                    className="text-xs"
                    stroke="hsl(var(--muted-foreground))"
                    label={{ value: 'Hours', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--popover))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px'
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="hours"
                    stroke="hsl(var(--primary))"
                    fillOpacity={1}
                    fill="url(#colorHours)"
                    name="Study Hours"
                  />
                  <Line
                    type="monotone"
                    dataKey="target"
                    stroke="hsl(var(--destructive))"
                    strokeDasharray="5 5"
                    name="Target"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Daily study time vs target (4 hours/day)
            </p>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="subject"
                    className="text-xs"
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <YAxis
                    className="text-xs"
                    stroke="hsl(var(--muted-foreground))"
                    domain={[0, 100]}
                    label={{ value: 'Score (%)', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--popover))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px'
                    }}
                  />
                  <Bar
                    dataKey="score"
                    fill="hsl(var(--primary))"
                    radius={[8, 8, 0, 0]}
                    name="Average Score"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Average scores across all subjects
            </p>
          </TabsContent>

          <TabsContent value="progress" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyProgressData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="week"
                    className="text-xs"
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <YAxis
                    className="text-xs"
                    stroke="hsl(var(--muted-foreground))"
                    label={{ value: 'Tasks', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--popover))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px'
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="completed"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    name="Completed Tasks"
                  />
                  <Line
                    type="monotone"
                    dataKey="planned"
                    stroke="hsl(var(--muted-foreground))"
                    strokeDasharray="5 5"
                    strokeWidth={2}
                    name="Planned Tasks"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Completed vs planned tasks per week
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
