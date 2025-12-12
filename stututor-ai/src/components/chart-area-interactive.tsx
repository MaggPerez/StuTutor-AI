"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const description = "Study time analytics chart"

// Generate realistic study time data
const chartData = Array.from({ length: 90 }, (_, i) => {
  const date = new Date("2024-11-11")
  date.setDate(date.getDate() - (89 - i))
  const dayOfWeek = date.getDay()
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
  const baseStudyTime = isWeekend ? 4 : 6
  const baseReviewTime = isWeekend ? 2 : 3
  const variation = Math.sin(i / 7) * 2 + Math.random() * 1.5

  return {
    date: date.toISOString().split('T')[0],
    studyTime: Math.max(0, Math.round((baseStudyTime + variation) * 10) / 10),
    reviewTime: Math.max(0, Math.round((baseReviewTime + variation * 0.5) * 10) / 10),
  }
})

const chartConfig = {
  hours: {
    label: "Hours",
  },
  studyTime: {
    label: "Active Study",
    color: "var(--chart-1)",
  },
  reviewTime: {
    label: "Review",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-11-11")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="h-full border-t-4 border-t-teal-500 shadow-sm @container/card">
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle>Study Activity</CardTitle>
                <CardDescription>
                Overview of your learning habits
                </CardDescription>
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger
                className="w-[140px] rounded-lg"
                aria-label="Select a value"
                >
                <SelectValue placeholder="Last 3 months" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                <SelectItem value="90d" className="rounded-lg">
                    3 Months
                </SelectItem>
                <SelectItem value="30d" className="rounded-lg">
                    30 Days
                </SelectItem>
                <SelectItem value="7d" className="rounded-lg">
                    7 Days
                </SelectItem>
                </SelectContent>
            </Select>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillStudyTime" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--chart-1)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--chart-1)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillReviewTime" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--chart-2)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--chart-2)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="reviewTime"
              type="monotone"
              fill="url(#fillReviewTime)"
              stroke="var(--chart-2)"
              stackId="a"
              strokeWidth={2}
            />
            <Area
              dataKey="studyTime"
              type="monotone"
              fill="url(#fillStudyTime)"
              stroke="var(--chart-1)"
              stackId="a"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}