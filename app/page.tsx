import ActionButton from '@components/action-button'
import start from '@actions/user/start'

export default function Home() {
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
