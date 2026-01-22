
export interface AssignmentCardProps {
    title: string,
    total: number,
    active?: number,
    completed?: number,
    pending?: number,
    overdue?: number,
}

export interface Assignment {
    id?: string,
    assignment_name: string,
    course: string,
    type: string,
    status: string,
    dueDate: string,
    priority: string,
    progress: number,
}