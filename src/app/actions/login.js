



'use server'

import { loginUser } from './auth'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function handleLogin(formData) {
  let result = await loginUser(formData)
  
  if (result.success) {
    revalidatePath('/')
    redirect('/')
  } else {
    return { error: result.error || 'Login failed. Please try again.' }
  }
}