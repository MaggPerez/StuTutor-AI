"use client"

import { TrendingUp, Clock, BookOpen, Target } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import PerformanceChart from "@/components/dashboard/PerformanceChart"
import { Progress } from "@/components/ui/progress"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics & Insights</h1>
        <p className="text-muted-foreground">
          Track your progress and performance across all subjects
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.5h</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5%</span> improvement
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sessions</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8%</span> this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Streak</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5 days</div>
            <p className="text-xs text-muted-foreground">Keep it up!</p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart */}
      <PerformanceChart />

      {/* Subject Breakdown */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Subject Performance</CardTitle>
            <CardDescription>Your progress by subject area</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { subject: "Linear Algebra", score: 92, color: "blue" },
              { subject: "Quantum Physics", score: 85, color: "purple" },
              { subject: "Organic Chemistry", score: 88, color: "green" },
              { subject: "Data Structures", score: 81, color: "orange" },
              { subject: "World History", score: 94, color: "amber" },
            ].map((item) => (
              <div key={item.subject} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{item.subject}</span>
                  <span className="text-muted-foreground">{item.score}%</span>
                </div>
                <Progress value={item.score} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Goals</CardTitle>
            <CardDescription>Track your weekly objectives</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { goal: "Study 25 hours", current: 24.5, target: 25 },
              { goal: "Complete 5 assignments", current: 4, target: 5 },
              { goal: "Attend all lectures", current: 8, target: 8 },
              { goal: "Practice 3 subjects daily", current: 18, target: 21 },
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{item.goal}</span>
                  <span className="text-muted-foreground">
                    {item.current}/{item.target}
                  </span>
                </div>
                <Progress value={(item.current / item.target) * 100} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Study Patterns */}
      <Card>
        <CardHeader>
          <CardTitle>Study Patterns</CardTitle>
          <CardDescription>Insights into your learning habits</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Most Productive Time</h4>
              <p className="text-2xl font-bold">2:00 PM - 5:00 PM</p>
              <p className="text-xs text-muted-foreground">
                You complete 65% of tasks during this window
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Avg Session Length</h4>
              <p className="text-2xl font-bold">45 minutes</p>
              <p className="text-xs text-muted-foreground">
                Optimal for maintaining focus
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Preferred Subject</h4>
              <p className="text-2xl font-bold">Mathematics</p>
              <p className="text-xs text-muted-foreground">
                38% of total study time
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
