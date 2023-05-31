'use server'

import { conn } from '@lib/db'

export default async function open(message_id: string) {
  const query = `UPDATE messages SET opened = true WHERE id = '${message_id}';`
  await conn.execute(query)
}
