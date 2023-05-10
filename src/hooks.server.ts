import { redirect, type Handle } from '@sveltejs/kit'
import { verifyJwtToken } from '$lib/server/jwt'
import { conn } from '$lib/server/db'

export const handle = (async ({ event, resolve }) => {
  const is_protected = event.url.pathname.startsWith('/dashboard')
  const is_auth_page = event.url.pathname === '/'

  const token = event.cookies.get('token')
  if (!token) {
    return await resolve(event)
  }

  const data = await verifyJwtToken(token)
  if (!data) {
    event.cookies.delete('token')
    return await resolve(event)
  }

  const { rows } = await conn.execute(
    `SELECT * FROM users WHERE id = '${data.id}';`
  )

  const user = rows[0]
  if (!user) {
    event.cookies.delete('token')
    return await resolve(event)
  }

  event.locals.user = user as {
    id: string
    username: string
    created_at: Date
  }

  if (is_auth_page && user) {
    throw redirect(307, '/dashboard')
  }
  if (is_protected && !user) {
    throw redirect(307, '/')
  }
  //benchmarking speeeeed
  // let start = performance.now()
  const response = await resolve(event)
  // let end = performance.now()
  // console.log((end - start).toFixed(2))

  return response
}) satisfies Handle
