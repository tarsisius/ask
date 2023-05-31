'use client'

import { type MouseEvent, useTransition } from 'react'
import { Loader2 } from 'lucide-react'
import { useDeleteModal } from '@lib/stores'
import remove from '@actions/message/remove'

export default function DeleteModal() {
  let [isPending, startTransition] = useTransition()

  const isOpen = useDeleteModal((state) => state.isOpen)
  const message_id = useDeleteModal((state) => state.id)
  const closeDeleteModal = useDeleteModal((state) => state.close)

  function handleClose(e: MouseEvent<HTMLElement>) {
    const bg = document.getElementById('bg')
    const no = document.getElementById('no')
    if (e.target === bg || e.target === no) {
      closeDeleteModal()
    }
  }
  return (
    <>
      {isOpen && (
        <div
          className='w-full h-screen fixed left-0 z-[60] overflow-x-hidden overflow-y-auto backdrop-blur-sm bg-brand-black/30'
          id='bg'
          onClick={handleClose}>
          <div className='max-w-md mx-auto h-screen flex flex-col justify-center'>
            <div className='flex bg-brand-black rounded-lg overflow-hidden'>
              <div className='w-full flex flex-col bg-brand-white bg-opacity-10 text-brand-white py-4'>
                <div className='p-4 overflow-y-auto'>
                  <p className='text-center text-lg'>
                    Are you sure to delete this message?
                  </p>
                </div>
                <div className='p-4 space-x-2 flex justify-center items-center'>
                  <button
                    type='button'
                    onClick={() => startTransition(() => remove(message_id!))}
                    className='flex items-center justify-center rounded-lg bg-brand-purple  w-20 h-9'>
                    {isPending ? (
                      <Loader2
                        size={16}
                        className='animate-spin'
                      />
                    ) : (
                      'Yes'
                    )}
                  </button>
                  <button
                    type='button'
                    onClick={handleClose}
                    className='flex items-center justify-center rounded-lg w-20 h-9'
                    id='no'>
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
