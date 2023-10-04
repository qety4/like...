import { FC } from 'react'
import './profilePosts.styles.scss'
import UserPageFeed from '@/components/Feed/Feed'
import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/lib/utils'

interface PageProps {
    params: {
        post: string,
        profile: string
    }
}

const Page: FC<PageProps> = async ({ params: { profile, post } }) => {

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
            {/* {intersecting routes and post modal component} */}
            <div>
                {/* latest user posts usePagePosts component*/}
            </div>
        </main>
    )

}

export default Page
