'use client'
import { FC, useEffect, useRef } from 'react'
import './userPagePosts.styles.scss'
import { PostLike } from '@prisma/client'
import { useIntersection } from '@mantine/hooks'
import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'
import { ExtendedPost } from '@/types/db'
import { Session } from 'next-auth'
import UserPost from '../UserPagePost/UserPagePost'
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '../../lib/utils'

interface UserPagePostsProps {
    initialPosts: ExtendedPost[],
    profileId: string,
    session: Session | null
}

const UserPagePosts: FC<UserPagePostsProps> = ({ initialPosts, profileId, session }) => {


    const lastPostRef = useRef<HTMLLIElement>(null)

    const { ref, entry } = useIntersection({
        root: lastPostRef.current,
        threshold: 0.3,
    })


    const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
        ['infinite-query'],
        async ({ pageParam = 1 }) => {
            const query = `/api/posts?limit=${INFINITE_SCROLLING_PAGINATION_RESULTS}&page=${pageParam}&profileId=${profileId}`

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

    useEffect(() => {
        if (entry?.isIntersecting) {
            fetchNextPage()
        }

    }, [entry, fetchNextPage])


    const posts =
        data?.pages.flatMap((page) => page) ??
        initialPosts

    console.log(posts)

    return (
        <ul className='userPosts'>
            {
                posts.map((post, index) => {

                    // const current = post.likes?.find((like: PostLike) => like.userId === session?.user.id)

                    if (index === posts.length - 1) {
                        return (
                            <li key={`${post.id}`} ref={ref}>
                                <UserPost content={post.content} commentAmt={post.comments.length} likeAmt={post.likes.length} />
                            </li>
                        )
                    } else {
                        return (
                            <li key={`${post.id}`}>
                                <UserPost content={post.content} commentAmt={post.comments.length} likeAmt={post.likes.length} />
                            </li>
                        )
                    }

                })
            }
        </ul>
    )

}

export default UserPagePosts