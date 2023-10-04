import { FC } from 'react'
import './profilePosts.styles.scss'
import UserPageFeed from '@/components/UserPageFeed/UserPageFeed'
import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/lib/utils'

interface PageProps {
    params: {
        profile: string
    }
}

const Page: FC<PageProps> = async ({ params: { profile } }) => {

    const session = await getAuthSession()

    const user = await db.user.findFirst({
        where: {
            username: profile
        },
        include: {
            posts: {
                take: INFINITE_SCROLLING_PAGINATION_RESULTS,
                include: {
                    author: true,
                    likes: true,
                    comments: true
                }
            }
        }
    })

    if (!(user?.posts) && !user) notFound()

    return (
        <main>
            <header>
                {/* user info component */}
            </header>
            <div>
                <UserPageFeed session={session} profile={profile} initialPosts={user.posts} />
            </div>
        </main>
    )

}

export default Page
