import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { nanoid } from 'nanoid'
import { conn } from '@lib/db'
import { verifyJwtToken } from '@lib/utils/jwt'
import { BASE_URL } from '@lib/constants'
import CopyLink from '@components/copy-link'
import MessageChild from '@components/message-child'
import FlashNotification from '@components/flash-notification'
import RefreshButton from '@components/refresh-button'
import DeleteModal from '@components/delete-modal'

async function getUser() {
  const token = cookies().get('token')?.value
  if (!token) {
    redirect('/')
  }
  const data = await verifyJwtToken(token)
  if (!data) {
    redirect('/')
  }
  const { rows } = await conn.execute(
    `SELECT * FROM users WHERE id = '${data.id}';`
  )
  const user = rows[0]
  if (!user) {
    redirect('/')
  }
  return user as {
    id: string
    username: string
    created_at: Date
  }
}

async function getMessages(user_id: string) {
  const query = `SELECT id, text, opened, created_at FROM messages WHERE user_id = '${user_id}' ORDER BY created_at DESC;`
  const { rows } = await conn.execute(query)

  const messages = rows as {
    id: string
    text: string
    opened: boolean
    created_at: Date
  }[]

  return messages
}

export default async function Dashboard() {
  const user = await getUser()
  const messages = await getMessages(user.id)
  const link = `${BASE_URL}/${user.id}`
  return (
    <>
      <DeleteModal />
      <FlashNotification key={nanoid(5)} />
      <div className='mx-auto max-w-md text-center flex flex-col space-y-10'>
        <div className='flex justify-center items-center mt-10'>
          <p className='font-semibold text-3xl'>Username</p>
        </div>
        <CopyLink link={link} />
        <div className='flex flex-col bg-brand-white bg-opacity-5 rounded-lg p-5'>
          <div className='flex justify-between mb-5 py-5'>
            <p className='font-semibold'>Your messages</p>
            <RefreshButton />
          </div>
          <div className='flex flex-col w-full space-y-10'>
            {messages.map((message) => (
              <MessageChild
                message={message}
                key={message.id}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
