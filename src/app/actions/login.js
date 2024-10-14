



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
      redirect('/account/profile')
    } else {
      redirect('/')
    }
  } else {
    return { error: result.error || 'Login failed. Please try again.' }
  }
}