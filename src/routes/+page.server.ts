import type { Actions } from './$types'
import { fail, redirect } from '@sveltejs/kit'
import { nanoid } from 'nanoid'
import { conn } from '$lib/server/db'
import { getJwtToken } from '$lib/server/jwt'

export const actions = {
  default: async (event) => {
    const formData = await event.request.formData()

    const username = formData.get('name') as string
    const id = nanoid()

    const query = `INSERT INTO users (id, username) VALUES ('${id}', '${username}');`
    try {
      await conn.execute(query)
    } catch (error) {
      return fail(500)
    }

    const token = await getJwtToken({ id, username })

    event.cookies.set('token', token, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30,
    })

    throw redirect(303, '/dashboard')
  },
} satisfies Actions
