import { type Actions, error, fail } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { conn } from '$lib/server/db'
import { nanoid } from 'nanoid'

export const load = (async ({ params }) => {
  const { id } = params
  const { rows } = await conn.execute(`SELECT * FROM users WHERE id = '${id}';`)

  const user = rows[0]
  if (!user) {
    throw error(404, 'User not found')
  }

  const returnUser = user as {
    id: string
    username: string
    created_at: string
  }
  return {
    user: returnUser,
  }
}) satisfies PageServerLoad

export const actions = {
  default: async ({ request, params }) => {
    const formData = await request.formData()

    const text = formData.get('text') as string
    const id = nanoid()
    const user_id = params.id

    const query = `INSERT INTO messages (id, text, user_id) VALUES ('${id}', '${text}', '${user_id}');`
    try {
      await conn.execute(query)
    } catch (error) {
      return fail(500)
    }

    return
  },
} satisfies Actions
