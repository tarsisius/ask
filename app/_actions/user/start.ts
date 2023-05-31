'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { nanoid } from 'nanoid'
import { conn } from '@lib/db'
import { getJwtToken } from '@lib/utils/jwt'

export default async function start(formData: FormData) {
  const username = formData.get('name') as string
  const id = nanoid()
  const query = `INSERT INTO users (id, username) VALUES ('${id}', '${username}');`
  await conn.execute(query)
  const token = await getJwtToken({ id, username })
  cookies().set('token', token, {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 30,
  })
  redirect('/dashboard')
}
