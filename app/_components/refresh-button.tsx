'use client'

import { useTransition } from 'react'
import { RefreshCcw } from 'lucide-react'
import refresh from '@actions/user/refresh'

export default function RefreshButton() {
  let [isPending, startTransition] = useTransition()
  return (
    <button onClick={() => startTransition(() => refresh())}>
      <RefreshCcw
        size={16}
        className={`${isPending && 'animate-spin'}`}
      />
    </button>
  )
}
