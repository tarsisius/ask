import { Albert_Sans } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'

const as = Albert_Sans({
  subsets: ['latin'],
})

export const metadata = {
  title: 'Ask',
  description: 'Anonymous message from your friends.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body
        className={`${as.className} flex flex-col min-h-screen text-brand-white bg-brand-black`}>
        <Toaster
          position='top-right'
          reverseOrder={false}
        />
        <main className='px-4'>{children}</main>
        <footer className='text-center mt-auto py-6 text-my-white text-opacity-40'>
          Project by{' '}
          <a
            className='hover:text-opacity-100 hover:text-my-white'
            target='_blank'
            href='https://github.com/tarsisius'
            rel='noopener noreferrer'>
            @tarsisius
          </a>
        </footer>
      </body>
    </html>
  )
}
