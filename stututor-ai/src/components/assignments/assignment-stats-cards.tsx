import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AssignmentCardProps } from '@/types/Assignments'
import { FileText, PlayCircle, CheckCircle2, Clock, AlertCircle } from 'lucide-react'
import { useUser } from '@/contexts/UserContext'


export default function AssignmentStatsCards() {
    const { assignments } = useUser()
    const assignmentStats: AssignmentCardProps[] = [{
        title: "Total Assignments",
        total: assignments.length,
        icon: <FileText className="h-8 w-8 text-muted-foreground" />,
    },
    {
        title: "Active Assignments",
        total: assignments.filter((assignment) => assignment.status !== "Completed").length,
        icon: <PlayCircle className="h-8 w-8 text-blue-500" />,
    },
    {
        title: "Completed Assignments",
        total: assignments.filter((assignment) => assignment.status === "Completed").length,
        icon: <CheckCircle2 className="h-8 w-8 text-green-500" />,
    },
    {
        title: "In Progress Assignments",
        total: assignments.filter((assignment) => assignment.status === "In Progress").length,
        icon: <Clock className="h-8 w-8 text-yellow-500" />,
    },
    {
        title: "Overdue Assignments",
        total: assignments.filter((assignment) => assignment.dueDate < new Date().toISOString()).length,
        icon: <AlertCircle className="h-8 w-8 text-red-500" />,
    },
    ]
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">

            {/* for each assignment stats, create a card */}
            {assignmentStats.map((stat) => (
                <Card key={stat.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        {/* title of the card */}
                        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                        {/* icon of the card */}
                        {stat.icon}
                    </CardHeader>

                    <CardContent>
                        {/* total number of assignments based on the status */}
                        <p className="text-3xl font-bold">{stat.total}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
