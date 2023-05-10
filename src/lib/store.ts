import { writable } from 'svelte/store'
import { nanoid } from 'nanoid'

type Toast = {
  id: string
  text: string
  type: string
}
export const toasts = writable<Toast[]>([])
export const addToast = (text: string, type: 'success' | 'error') => {
  const id = nanoid()
  toasts.update((t) => [...t, { text, type, id }])
  setTimeout(() => {
    toasts.update((t) => t.filter((t) => t.id !== id))
  }, 5000)
}
