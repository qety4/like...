'use client'
import { FC, useRef } from 'react'
import './feed.styles.scss'
import { ExtendedPost } from '@/types/db'
import { useIntersection } from '@mantine/hooks'
import Post from '../Post/Post'
import { Session } from 'next-auth'
import { PostLike } from '@prisma/client'


interface UserPageFeedProps {
    initialPosts: ExtendedPost[],
    profile: string,
    session: Session | null
}

const UserPageFeed: FC<UserPageFeedProps> = ({ initialPosts, profile,session }) => {

    console.log('initialPosts', initialPosts)
    const lastPostRef = useRef<HTMLLIElement>(null)

    const { ref, entry } = useIntersection({
        root: lastPostRef.current,
        threshold: 1,
    })



    // const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    //     ['infinite-query'],
    //     async ({ pageParam = 1 }) => {
    //         const query = `/api/posts?limit=${INFINITE_SCROLLING_PAGINATION_RESULTS}&page=${pageParam}` +
    //             (!!userId ? `&userId=${userId}` : '')

    //         const { data } = await axios.get(query)

    //         return data as ExtendedPost[]
    //     },
    //     {
    //         getNextPageParam: (_, pages) => {
    //             console.log('last page', _)
    //             console.log('pages', pages)
    //             return pages.length + 1
    //         },
    //         initialData: { pages: [initialPosts], pageParams: [1] },
    //     }
    // )
    // fetchNextPage()

    const posts =
        //  data?.pages.flatMap((page) => page) ?? 
        initialPosts

    return (
        <ul className='userPageFeed'>

            {
                posts.map((post, index) => {

                    const current = post.likes?.find((like: PostLike) => like.userId === session?.user.id)

                    if (index === posts.length - 1) {
                        return (
                            <li key={post.id} ref={ref}>
                                <Post post={post} />
                            </li>
                        )
                    } else {
                        return (
                            <li key={post.id}>
                                <Post post={post} />
                            </li>
                        )
                    }

                })
            }
        </ul>

    )

}

export default UserPageFeed