'use server'

import { revalidatePath } from 'next/cache'
import { conn } from '@lib/db'
import { setFlash } from '@lib/utils/flash'

export default async function remove(message_id: string) {
  const query = `DELETE FROM messages WHERE id = '${message_id}';`
  await conn.execute(query)
  await setFlash({
    type: 'success',
    message: 'Message delete with success',
  })
  revalidatePath('/dashboard')
}
