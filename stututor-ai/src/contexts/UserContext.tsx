"use client"

import React, { createContext, useContext, useEffect, useCallback, useState } from "react"
import { User } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/client"
import { usePathname } from "next/navigation"
import { Course } from "@/types/Courses"
import { getAllUserNotes, getUserAssignments, getUserCourses } from "@/lib/supabase/database-client"
import { Assignment } from "@/types/Assignments"
import { schema } from "@/components/data-table"
import { z } from "zod"
import { Note } from "@/types/StudyNotes"

interface UserContextType {
  user: User | null
  loading: boolean
  courses: Course[]
  setCourses: (courses: Course[]) => void
  assignments: Assignment[]
  assignmentTableData: z.infer<typeof schema>[]
  userNotes: Note[]
  setUserNotes: (notes: Note[]) => void
}

// Create a context for the user
const UserContext = createContext<UserContextType | undefined>(undefined)


export function UserProvider({ children }: { children: React.ReactNode }) {
  // States for the user's data
  const [user, setUser] = useState<User | null>(null)
  const [courses, setCourses] = useState<Course[]>([])
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [userNotes, setUserNotes] = useState<Note[]>([])
  const [assignmentTableData, setAssignmentTableData] = useState<z.infer<typeof schema>[]>([])

  // State for the loading state of the user's data
  const [loading, setLoading] = useState(true)

  const pathname = usePathname()

  /**
   * Fetches the user's data from the database
   */
  const fetchUserData = useCallback(async () => {
    try {
      await Promise.all([
        getUserCourses().then(setCourses),
        getUserAssignments().then((assignments) => {
          setAssignments(assignments)
          setAssignmentTableData(convertAssignmentsToTableData(assignments))
        }),
        getAllUserNotes().then(setUserNotes),
      ])
    } catch (error) {
      console.error("Error fetching user data:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  // Subscribe to auth state changes on mount
  useEffect(() => {
    const supabase = createClient()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {

        // Set the user to the current user
        const currentUser = session?.user ?? null
        setUser(currentUser)

        if (currentUser) {
          fetchUserData()
        } else {
          setCourses([])
          setAssignments([])
          setAssignmentTableData([])
          setUserNotes([])
          setLoading(false)
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [fetchUserData])

  // Re-check auth on route changes (handles server-side login redirects)
  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getUser().then(({ data: { user: currentUser } }) => {
      if (currentUser && !user) {
        setUser(currentUser)
        fetchUserData()
      } else if (!currentUser && user) {
        setUser(null)
        setCourses([])
        setAssignments([])
        setAssignmentTableData([])
        setUserNotes([])
        setLoading(false)
      }
    })
  }, [pathname])



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
        assignmentId: assignment.id,
        assignment_name: assignment.assignment_name,
        course: assignment.course,
        type: assignment.type,
        status: assignment.status,
        dueDate: assignment.dueDate, // Simple date format like "2025-11-15"
        priority: assignment.priority,
        progress: assignment.progress,
      }
    })

    return transformedData
  }


  // Return the user context
  return (
    <UserContext.Provider value={{ user, loading, courses, setCourses, assignments, assignmentTableData, userNotes, setUserNotes }}>
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
