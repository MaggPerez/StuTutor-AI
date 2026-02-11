"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { User } from "@supabase/supabase-js"
import { createClient } from "../../lib/supabase/client"
import { Course } from "@/types/Courses"
import { getUserAssignments, getUserCourses } from "../../lib/supabase/database-client"
import { Assignment } from "@/types/Assignments"
import { schema } from "@/components/data-table"
import { z } from "zod"

interface UserContextType {
  user: User | null
  loading: boolean
  courses: Course[]
  setCourses: (courses: Course[]) => void
  assignments: Assignment[]
  assignmentTableData: z.infer<typeof schema>[]
}

// Create a context for the user
const UserContext = createContext<UserContextType | undefined>(undefined)


export function UserProvider({ children }: { children: React.ReactNode }) {
  // States for the user's data
  const [user, setUser] = useState<User | null>(null)
  const [courses, setCourses] = useState<Course[]>([])
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [assignmentTableData, setAssignmentTableData] = useState<z.infer<typeof schema>[]>([])

  // State for the loading state of the user's data
  const [loading, setLoading] = useState(true)



  // Fetch the user's data when the component mounts
  useEffect(() => {
    const supabase = createClient()

    // Fetch initial user
    const fetchUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()

        //fetching user, courses, and assignments
        setUser(user)
        getUserCourses().then((courses) => {
          setCourses(courses)
        })
        getUserAssignments().then((assignments) => {
          setAssignments(assignments)
          setAssignmentTableData(convertAssignmentsToTableData(assignments))
        })


      } catch (error) {
        console.error("Error fetching user:", error)

      } finally {
        setLoading(false)
      }
    }

    fetchUser()


    
    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    // Unsubscribe from the auth state changes
    return () => {
      subscription.unsubscribe()
    }
  }, [])



  /**
   * Converts the assignments to table data format
   * @param assignments 
   * @returns The assignments in table data format
   */
  function convertAssignmentsToTableData(assignments: Assignment[]): z.infer<typeof schema>[] {
    // Transform assignments to table data with sequential numeric IDs
    const transformedData: z.infer<typeof schema>[] = assignments.map((assignment, index) => {
      // Convert ISO timestamp to simple date string (YYYY-MM-DD)
      const dueDateStr = assignment.dueDate
        ? new Date(assignment.dueDate).toISOString().split('T')[0]
        : ''

      return {
        id: index + 1, // Sequential ID starting from 1
        assignment_name: assignment.assignment_name,
        course: assignment.course,
        type: assignment.type,
        status: assignment.status,
        dueDate: dueDateStr, // Simple date format like "2025-11-15"
        priority: assignment.priority,
        progress: assignment.progress,
      }
    })

    return transformedData
  }


  // Return the user context
  return (
    <UserContext.Provider value={{ user, loading, courses, setCourses, assignments, assignmentTableData }}>
      {children}
    </UserContext.Provider>
  )
}

// Custom hook to use the user context
export function useUser() {
  const context = useContext(UserContext)

  // Throw an error if the user context is not used within a UserProvider
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
