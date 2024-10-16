



'use server'

import { loginUser } from './auth'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken';


async function fetchUserData(id) {
  try {
    const response = await fetch(`${process.env.BASE_URL}/users/${id}`);
    if (response.ok) {
      return await response.json();
    } else {
      console.error('Failed to fetch user data');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}

export async function handleLogin(formData) {
  let result = await loginUser(formData)

  const cookieStore = cookies();


  const token = cookieStore.get('token');

  
  if (result.success) {
    const decoded = jwt.decode(token.value);
    const userData = await fetchUserData(decoded.id);
    // revalidatePath('/')
    if (userData.data.skills.length == 0) {
      return {
        success: true,
        message: "Welcome! Let's set up your profile.",
        redirectUrl: '/account/profile'
      }
    } else {
      return {
        success: true,
        message: "Login successful. Redirecting to dashboard...",
        redirectUrl: '/'
      }
    }
  } else {
    return { 
      success: false,
      error: result.error || 'Login failed. Please try again.' 
    }
  }
}