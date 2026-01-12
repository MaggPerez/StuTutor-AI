'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '../../../lib/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // Extract form data
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullname = formData.get('fullname') as string
  const username = formData.get('username') as string
  const confirmPassword = formData.get('confirm-password') as string

  // Validate passwords match
  if (password !== confirmPassword) {
    redirect('/error')
  }

  // Sign up with Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullname,
        username: username,
      }
    }
  })

  if (authError) {
    console.error('Supabase auth error:', authError)
    redirect('/error')
  }

  // Create user in your database via API
  if (authData.user) {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          auth_id: authData.user.id,
          email: email,
          full_name: fullname,
          username: username,
          role: 'student', // default role
        }),
      })

      if (!response.ok) {
        console.error('Failed to create user in database')
        // Optionally handle cleanup of Supabase auth user here
      }
    } catch (error) {
      console.error('Error creating user in database:', error)
    }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}


export async function signout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/login')
}