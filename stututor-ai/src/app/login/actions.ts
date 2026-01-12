'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '../../../lib/supabase/server'

export type LoginSignUpFormState = {
  error: string | null
}

export async function login(prevState: LoginSignUpFormState, formData: FormData): Promise<LoginSignUpFormState> {
  const supabase = await createClient()



  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)
  

  if (error) {
    return { error: 'Invalid credentials, please try again.' }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')

  
}

export async function signup(prevState: LoginSignUpFormState, formData: FormData): Promise<LoginSignUpFormState> {
  const supabase = await createClient()

  // Extract form data
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullname = formData.get('fullname') as string
  const username = formData.get('username') as string
  const confirmPassword = formData.get('confirm-password') as string

  // Validate passwords match
  if (password !== confirmPassword) {
    return { error: 'Passwords do not match, please try again.' }
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
    return { error: 'Failed to sign up, please try again.' }
  }

  // Create user in your database via API
  if (authData.user) {
    try {
      const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8000'
      const response = await fetch(`${API_BASE_URL}/users/create-user`, {
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
        const errorText = await response.text()
        console.error('Failed to create user in database:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText
        })
        return { error: 'Something went wrong, please try again.' }
      }
    } catch (error) {
      return { error: 'Failed to sign up, please try again.' }
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