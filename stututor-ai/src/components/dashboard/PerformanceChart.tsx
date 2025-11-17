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
    <Card variant="glass" className="border-white/10 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold gradient-text-emerald">
          Performance Analytics
        </CardTitle>
        <CardDescription className="text-white/60">
          Track your study patterns and progress over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="studytime" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 glass-strong p-1.5 border-white/10 gap-1">
            <TabsTrigger
              value="studytime"
              className="data-[state=active]:glass-gradient data-[state=active]:text-white text-white/60 transition-all duration-300"
            >
              Study Time
            </TabsTrigger>
            <TabsTrigger
              value="performance"
              className="data-[state=active]:glass-gradient data-[state=active]:text-white text-white/60 transition-all duration-300"
            >
              Subject Scores
            </TabsTrigger>
            <TabsTrigger
              value="progress"
              className="data-[state=active]:glass-gradient data-[state=active]:text-white text-white/60 transition-all duration-300"
            >
              Weekly Progress
            </TabsTrigger>
          </TabsList>

          <TabsContent value="studytime" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={studyTimeData}>
                  <defs>
                    <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#ec4899" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" opacity={0.1} />
                  <XAxis
                    dataKey="day"
                    className="text-xs"
                    stroke="#ffffff"
                    opacity={0.6}
                  />
                  <YAxis
                    className="text-xs"
                    stroke="#ffffff"
                    opacity={0.6}
                    label={{ value: 'Hours', angle: -90, position: 'insideLeft', fill: '#ffffff', opacity: 0.6 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '12px',
                      backdropFilter: 'blur(12px)',
                      color: '#ffffff'
                    }}
                  />
                  <Legend wrapperStyle={{ color: '#ffffff' }} />
                  <Area
                    type="monotone"
                    dataKey="hours"
                    stroke="#a855f7"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorHours)"
                    name="Study Hours"
                  />
                  <Line
                    type="monotone"
                    dataKey="target"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Target"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-white/50 text-center">
              Daily study time vs target (4 hours/day)
            </p>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectPerformanceData}>
                  <defs>
                    <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity={1}/>
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" opacity={0.1} />
                  <XAxis
                    dataKey="subject"
                    className="text-xs"
                    stroke="#ffffff"
                    opacity={0.6}
                  />
                  <YAxis
                    className="text-xs"
                    stroke="#ffffff"
                    opacity={0.6}
                    domain={[0, 100]}
                    label={{ value: 'Score (%)', angle: -90, position: 'insideLeft', fill: '#ffffff', opacity: 0.6 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '12px',
                      backdropFilter: 'blur(12px)',
                      color: '#ffffff'
                    }}
                  />
                  <Bar
                    dataKey="score"
                    fill="url(#colorBar)"
                    radius={[12, 12, 0, 0]}
                    name="Average Score"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-white/50 text-center">
              Average scores across all subjects
            </p>
          </TabsContent>

          <TabsContent value="progress" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyProgressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" opacity={0.1} />
                  <XAxis
                    dataKey="week"
                    className="text-xs"
                    stroke="#ffffff"
                    opacity={0.6}
                  />
                  <YAxis
                    className="text-xs"
                    stroke="#ffffff"
                    opacity={0.6}
                    label={{ value: 'Tasks', angle: -90, position: 'insideLeft', fill: '#ffffff', opacity: 0.6 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '12px',
                      backdropFilter: 'blur(12px)',
                      color: '#ffffff'
                    }}
                  />
                  <Legend wrapperStyle={{ color: '#ffffff' }} />
                  <Line
                    type="monotone"
                    dataKey="completed"
                    stroke="#10b981"
                    strokeWidth={3}
                    name="Completed Tasks"
                    dot={{ fill: '#10b981', r: 5, strokeWidth: 2, stroke: '#ffffff' }}
                    activeDot={{ r: 7 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="planned"
                    stroke="#f59e0b"
                    strokeDasharray="5 5"
                    strokeWidth={2}
                    name="Planned Tasks"
                    dot={{ fill: '#f59e0b', r: 5, strokeWidth: 2, stroke: '#ffffff' }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-white/50 text-center">
              Completed vs planned tasks per week
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
