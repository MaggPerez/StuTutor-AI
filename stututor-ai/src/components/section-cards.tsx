import { IconBook, IconCalendar, IconClock, IconFlame } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Study Time This Week</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            24.5 hrs
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="gap-1">
              <IconClock className="size-3" />
              +3.5 hrs
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Great progress this week! <IconClock className="size-4" />
          </div>
          <div className="text-muted-foreground">
            8.5 hours more than last week
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Active Courses</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            6
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="gap-1">
              <IconBook className="size-3" />
              Current
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            All courses on track <IconBook className="size-4" />
          </div>
          <div className="text-muted-foreground">
            3 assignments due this week
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Assignments Due</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            8
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="gap-1">
              <IconCalendar className="size-3" />
              This week
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            5 completed, 3 in progress <IconCalendar className="size-4" />
          </div>
          <div className="text-muted-foreground">Stay focused on deadlines</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Study Streak</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            12 days
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="gap-1">
              <IconFlame className="size-3" />
              Keep going!
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Excellent consistency! <IconFlame className="size-4" />
          </div>
          <div className="text-muted-foreground">Personal best: 18 days</div>
        </CardFooter>
      </Card>
    </div>
  )
}
