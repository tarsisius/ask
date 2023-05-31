import { cookies } from 'next/headers'
import ActionButton from '@components/action-button'
import start from '@actions/user/start'
import { redirect } from 'next/navigation'
import { verifyJwtToken } from '@lib/utils/jwt'
import { conn } from '@lib/db'

async function getUser() {
  const token = cookies().get('token')?.value
  if (token) {
    const data = await verifyJwtToken(token)
    if (data) {
      const { rows } = await conn.execute(
        `SELECT * FROM users WHERE id = '${data.id}';`
      )
      const user = rows[0]
      if (user) {
        return true
      }
    }
  }
  return false
}

export default async function Home() {
  const user = await getUser()
  if (user) {
    redirect('/dashboard')
  }
  return (
    <div className='mx-auto max-w-md text-center py-10 flex flex-col space-y-10'>
      <div className='flex justify-center items-center mt-10'>
        <p className='font-semibold text-3xl'>/Ask</p>
      </div>
      <form
        className='flex justify-center space-x-5'
        action={start}>
        <div className='bg-brand-white bg-opacity-5 rounded-lg flex justify-start items-center px-5'>
          <input
            className='bg-transparent h-9 focus:outline-none font-bold w-full'
            type='text'
            name='name'
            autoComplete='off'
            placeholder='Enter your name'
            required
          />
        </div>
        <ActionButton type='start' />
      </form>
    </div>
  )
}
