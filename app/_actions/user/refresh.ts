'use server'

import { revalidatePath } from 'next/cache'

export default async function refresh() {
  revalidatePath('/dashboard')
}
