
import Feed from '@/components/Feed/Feed'
import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/lib/utils'

export default async function Home() {
  const session = await getAuthSession()
  console.log('current session', session)

  return (
    <div className='root-page'>

      {/* stories */}
      {/* {feed component} */}
      <Feed initialPosts={[]} session={session} />
    </div>
  )
}
