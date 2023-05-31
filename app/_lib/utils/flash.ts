'use server'

import { cookies } from 'next/headers'
import { FLASH_COOKIE_KEY } from '@lib/constants'

export async function getFlash() {
  const flashCookie = cookies().get(FLASH_COOKIE_KEY)?.value
  if (!flashCookie) {
    return null
  }
  cookies().delete(FLASH_COOKIE_KEY)
  return JSON.parse(flashCookie)
}

export async function setFlash(message: {
  type: 'success' | 'errror'
  message: string
}) {
  cookies().set(FLASH_COOKIE_KEY, JSON.stringify(message))
}
