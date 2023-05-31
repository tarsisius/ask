import { notFound } from 'next/navigation'
import { nanoid } from 'nanoid'
import { conn } from '@lib/db'
import send from '@actions/message/send'
import ActionButton from '@components/action-button'
import FlashNotification from '@components/flash-notification'

async function getUser(user_id: string) {
  const { rows } = await conn.execute(
    `SELECT id, username FROM users WHERE id = '${user_id}';`
  )
  const user = rows[0]
  if (!user) {
    notFound
  }
  return user as {
    id: string
    username: string
  }
}

export default async function Send({ params }: { params: { id: string } }) {
  const user = await getUser(params.id)
  return (
    <>
      <FlashNotification key={nanoid()} />
      <div className='mx-auto max-w-md text-center flex flex-col space-y-10'>
        <div className='flex justify-center items-center mt-10'>
          <p className='font-semibold text-2xl'>
            Send anonymous message to {user.username}
          </p>
        </div>
        <form
          className='flex flex-col space-y-5 items-end'
          action={send}>
          <input
            type='hidden'
            name='user_id'
            value={user.id}
          />
          <textarea
            className='bg-brand-white bg-opacity-5 rounded-lg focus:outline-none font-bold w-full p-5 min-h-20'
            name='text'
            required
          />
          <ActionButton type='send' />
        </form>
      </div>
    </>
  )
}
