import Providers from '@/components/Provider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Sidebar from '@/components/Sidebar/Sidebar'
import { cn } from '@/lib/utils'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'like...',
  description: 'Generated by create next app',
}
export default async function RootLayout({
  children,
  createModal
}: {
  children: React.ReactNode,
  createModal:React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={cn(inter.className, 'flex')}>
        <Providers>
          <Sidebar />
          <div className='mainPage'>
            {children}
            {createModal}
          </div>
        </Providers>
      </body>
    </html>
  )
}
