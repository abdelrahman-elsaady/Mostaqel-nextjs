'use server'

import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

export async function loginUser(formData) {

  const email = formData.get('email')
  const password = formData.get('password')

  try {
    const response = await fetch(`${process.env.BASE_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      let data = await response.json();
      throw new Error(data.message)
      
    }

    let data = await response.json()

    if (data && data.token) {
      let id = getIdFromToken(data.token)
    //   localStorage.setItem('token', data.token);
      cookies().set('token', data.token, { path: '/', maxAge: 30 * 24 * 60 * 60 * 1000 })

      return { success: true, id }
      
    } else {
      throw new Error('Invalid response from server')
    }
  } catch (error) {
    console.error('Login error:', error)
    return { success: false, error: 'البريد الالكتروني او كلمة المرور غير صحيحة' }
  }
}


function getIdFromToken(token) {
  try {
    const decoded = jwt.decode(token)
    if (!decoded || !decoded.id) {
      throw new Error('Invalid token or ID not found in token payload')
    }
    return decoded.id
  } catch (error) {
    console.error('Error decoding token:', error)
    return null
  }
}

export async function getIdFromCookie() {
  const token = cookies().get('token')?.value
  if (!token) {
    return null
  }
  return getIdFromToken(token)
}