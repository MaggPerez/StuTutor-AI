
export interface AssignmentCardProps {
    title: string,
    total: number,
    active?: number,
    completed?: number,
    pending?: number,
    overdue?: number,
    icon: React.ReactNode,
}

export interface Assignment {
    id?: string,
    assignment_name: string,
    course: string,
    type: string,
    status: string,
    due_date: string,
    priority: string,
    progress: number,
}