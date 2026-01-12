"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { User } from "@supabase/supabase-js"
import { createClient } from "../../lib/supabase/client"

interface UserContextType {
  user: User | null
  loading: boolean
}

// Create a context for the user
const UserContext = createContext<UserContextType | undefined>(undefined)

// Create a provider for the user
export function UserProvider({ children }: { children: React.ReactNode }) {
  // State for the user
  const [user, setUser] = useState<User | null>(null)

  // State for the loading state
  const [loading, setLoading] = useState(true)

  // Fetch the user when the component mounts
  useEffect(() => {
    const supabase = createClient()

    // Fetch initial user
    const fetchUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)

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

  // Return the user context
  return (
    <UserContext.Provider value={{ user, loading }}>
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
