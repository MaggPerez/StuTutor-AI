"use client"

import { Pie, PieChart } from "recharts"

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "Subject Focus Distribution"

const chartData = [
  { subject: "Calculus", hours: 15, fill: "var(--color-calculus)" },
  { subject: "Physics", hours: 12, fill: "var(--color-physics)" },
  { subject: "CS", hours: 20, fill: "var(--color-cs)" },
  { subject: "History", hours: 8, fill: "var(--color-history)" },
  { subject: "English", hours: 5, fill: "var(--color-english)" },
]

const chartConfig = {
  hours: {
    label: "Hours",
  },
  calculus: {
    label: "Calculus",
    color: "var(--chart-1)",
  },
  physics: {
    label: "Physics",
    color: "var(--chart-2)",
  },
  cs: {
    label: "Comp Sci",
    color: "var(--chart-3)",
  },
  history: {
    label: "History",
    color: "var(--chart-4)",
  },
  english: {
    label: "English",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

export function ChartPieLegend() {
  return (
    <Card className="flex flex-col h-full border-t-4 border-t-purple-500 shadow-sm">
      <CardHeader className="items-center pb-0">
        <CardTitle>Subject Focus</CardTitle>
        <CardDescription>Weekly Distribution</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
             <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={chartData} dataKey="hours" nameKey="subject" innerRadius={60} strokeWidth={5} />
            <ChartLegend
              content={<ChartLegendContent nameKey="subject" />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}