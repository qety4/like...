'use client'
import { FC, useRef, Suspense } from 'react'
import './feed.styles.scss'
import { ExtendedPost } from '@/types/db'
import { useIntersection } from '@mantine/hooks'
import Post from '../Post/Post'
import { Session } from 'next-auth'
import { PostLike } from '@prisma/client'
import { useInfiniteQuery } from '@tanstack/react-query'
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/lib/utils'
import axios from 'axios'


interface FeedProps {
    initialPosts: ExtendedPost[],
    session: Session | null
}

const Feed: FC<FeedProps> = ({ initialPosts, session }) => {

    console.log('initialPosts', initialPosts)
    const lastPostRef = useRef<HTMLLIElement>(null)

    const { ref, entry } = useIntersection({
        root: lastPostRef.current,
        threshold: 1,
    })



    const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
        ['infinite-query'],
        async ({ pageParam = 1 }) => {
            const query = `/api/posts?limit=${INFINITE_SCROLLING_PAGINATION_RESULTS}&page=${pageParam}`
            const { data } = await axios.get(query)

            return data as ExtendedPost[]
        },
        {
            getNextPageParam: (_, pages) => {
                return pages.length + 1
            },
            initialData: { pages: [initialPosts], pageParams: [1] },
        }
    )
    // fetchNextPage()

    const posts =
        //  data?.pages.flatMap((page) => page) ?? 
        initialPosts

    return (
        <main>
            <div>
                {/* feed switch */}
            </div>

            <ul className='Feed'>

                {
                    posts.map((post, index) => {

                        const current = post.likes?.find((like: PostLike) => like.userId === session?.user.id)

                        if (index === posts.length - 1) {
                            return (
                                <li key={post.id} ref={ref}>
                                    <Suspense>
                                        <Post initialLike={!!current} post={post} />
                                    </Suspense>
                                </li>
                            )
                        } else {
                            return (
                                <li key={post.id}>
                                    <Post initialLike={!!current} post={post} />
                                </li>
                            )
                        }

                    })
                }
            </ul>
            
        </main>

    )

}

export default Feed