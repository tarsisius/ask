'use client'

import { useState, useTransition } from 'react'
import { Eye, Loader2, MoreHorizontal } from 'lucide-react'
import { formatTime } from '@lib/utils/time'
import { useDeleteModal } from '@lib/stores'
import open from '@actions/message/open'

export default function MessageChild({
  message,
}: {
  message: {
    id: string
    text: string
    opened: boolean
    created_at: Date
  }
}) {
  let [isPending, startTransition] = useTransition()

  const [opened, setOpened] = useState(message.opened)
  const [menu, setMenu] = useState(false)

  const openDeleteModal = useDeleteModal((state) => state.open)

  function handleMenu() {
    setMenu(!menu)
  }
  return (
    <div className='flex flex-col space-y-4 w-full py-2 border-b border-brand-white border-opacity-20'>
      <div className='flex justify-between items-center'>
        <p className='flex justify-start text-xs font-italic text-brand-white text-opacity-50'>
          {formatTime(message.created_at)}
        </p>
        <div className='flex items-center space-x-4'>
          {!opened && (
            <button
              className='flex justify-center items-center space-x-1 bg-transparent'
              onClick={() =>
                startTransition(() => {
                  open(message.id)
                  setOpened(!opened)
                })
              }>
              {isPending ? (
                <>
                  <Loader2
                    size={16}
                    className='animate-spin'
                  />
                  <p>open</p>
                </>
              ) : (
                <>
                  <Eye size={16} />
                  <p>open</p>
                </>
              )}
            </button>
          )}
          <div className='relative text-left'>
            <button
              className='flex items-center'
              onClick={handleMenu}>
              <MoreHorizontal size={16} />
            </button>
            {menu && (
              <div
                className='absolute right-0 z-10 mt-2 origin-top-right bg-brand-black rounded-lg shadow-lg overflow-hidden'
                tab-index='-1'>
                <div className='py-1 bg-brand-white bg-opacity-10 text-brand-white'>
                  <button
                    className='px-4 py-2 hover:bg-brand-black hover:bg-opacity-20'
                    tab-index='-1'
                    onClick={() => openDeleteModal(message.id)}>
                    Delete
                  </button>
                  <button
                    className='px-4 py-2 hover:bg-brand-black hover:bg-opacity-20'
                    tab-index='-1'>
                    Share
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='flex flex-col justify-center space-y-2'>
        {opened ? (
          <p className='text-justify text-brand-white text-opacity-90'>
            {message.text}
          </p>
        ) : (
          <p className='text-justify text-brand-white text-opacity-80 font-italic'>
            This is an anonymous message. Open it to see the content.
          </p>
        )}
      </div>
    </div>
  )
}
