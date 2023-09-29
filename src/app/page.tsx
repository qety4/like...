
import { getAuthSession } from '@/lib/auth'

export default async function Home() {
  const session = await getAuthSession()
  console.log('current session', session)
  
  return (
    <main className='root-page'>
      {`/like... `}
    </main>
  )
}
