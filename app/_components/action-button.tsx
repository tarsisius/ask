'use client'

import { experimental_useFormStatus } from 'react-dom'
import { Loader2 } from 'lucide-react'

export default function ActionButton({ type }: { type: 'start' | 'send' }) {
  const { pending } = experimental_useFormStatus()
  return (
    <button
      className='flex items-center justify-center rounded-lg bg-brand-purple  w-20 h-9'
      disabled={pending}
      type='submit'
      >
      {pending ? (
        <Loader2
          width={16}
          className='animate-spin'
        />
      ) : type === 'send' ? (
        'Send'
      ) : (
        'Start'
      )}
    </button>
  )
}
