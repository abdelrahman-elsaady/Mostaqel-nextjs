'use client'

import { useEffect } from 'react'
import Swal from 'sweetalert2'

export default function AlertHandler({ message, type }) {
  useEffect(() => {
    if (message) {
      Swal.fire({
        title: type === 'success' ? 'Success!' : 'Error!',
        text: message,
        icon: type,
        confirmButtonText: 'OK'
      })
    }
  }, [message, type])

  return null
}