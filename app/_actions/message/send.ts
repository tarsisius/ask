'use server'

import { nanoid } from 'nanoid'
import { conn } from '@lib/db'
import { setFlash } from '@lib/utils/flash'

export default async function send(formData: FormData) {
  const text = formData.get('text') as string
  const user_id = formData.get('user_id') as string
  const id = nanoid()
  const query = `INSERT INTO messages (id, text, user_id) VALUES ('${id}', '${text}', '${user_id}');`
  await conn.execute(query)
  await setFlash({
    type: 'success',
    message: 'Message sended with success',
  })
}
