'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { ClipboardCopy, CopyIcon } from 'lucide-react'

export default function CopyLink({ link }: { link: string }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(link)
    toast.success('Copied to clipboard')
    setCopied(true)
  }
  return (
    <div className='flex justify-between items-center w-full bg-brand-white bg-opacity-5 rounded-lg mb-5 py-2 px-5'>
      <input
        className='font-light bg-transparent w-full focus:outline-none'
        type='text'
        value={link}
        readOnly
      />
      <button
        className='flex items-center justify-center py-1 px-1 bg-transparent'
        onClick={handleCopy}>
        {copied ? <CopyIcon size={16} /> : <ClipboardCopy size={16}  />}
      </button>
    </div>
  )
}
