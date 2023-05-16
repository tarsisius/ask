import { fail } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'
import { conn } from '$lib/server/db'

export const load = (async ({ locals, url, depends }) => {
  function getUser() {
    return {
      ...locals.user,
      link: url.origin + '/' + locals.user.id,
    }
  }

  async function getMessages() {
    depends('messages')

    const query = `SELECT id, text, opened, created_at FROM messages WHERE user_id = '${locals.user.id}' ORDER BY created_at DESC;`
    const { rows } = await conn.execute(query)

    const messages = rows as {
      id: string
      text: string
      opened: boolean
      created_at: Date
    }[]

    return messages
  }
  return {
    user: getUser(),
    streamed: {
      messages: getMessages(),
    },
  }
}) satisfies PageServerLoad

export const actions = {
  open: async ({ request }) => {
    const formData = await request.formData()

    const id = formData.get('id') as string
    const query = `UPDATE messages SET opened = true WHERE id = '${id}';`

    try {
      await conn.execute(query)
    } catch (error) {
      return fail(500)
    }

    return
  },
  delete: async ({ request }) => {
    const formData = await request.formData()

    const id = formData.get('id') as string
    const query = `DELETE FROM messages WHERE id = '${id}';`

    try {
      await conn.execute(query)
    } catch (error) {
      return fail(500)
    }

    return
  },
} satisfies Actions
