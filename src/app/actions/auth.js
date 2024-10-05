'use server'

import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

export async function loginUser(formData) {
  const email = formData.get('email')
  const password = formData.get('password')

  try {
    const response = await fetch('http://localhost:3344/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      throw new Error('Login failed')
    }

    let data = await response.json()

    if (data && data.token) {
      let id = getIdFromToken(data.token)
    //   localStorage.setItem('token', data.token);
      cookies().set('token', data.token, { httpOnly: true, secure: true })
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