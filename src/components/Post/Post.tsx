import { FC, Suspense } from 'react'
import './post.styles.scss'
import EditorOutput from '../EditorOutput/EditorOutput'
import { Comment, Post, PostLike, User } from '@prisma/client'
import Image from 'next/image'
import { formatTimeToNow } from '@/lib/utils'
import PostLikesClient from '../post-like/PostLikesClient'


interface PostProps {
    post: Post & {
        author: User,
        likes: PostLike[],
        comments: Comment[]
    },
    initialLike: boolean
}

const Post: FC<PostProps> = ({ post,initialLike }) => {

    console.log('Post Post', post)
    return (
        <section>
            <div>
                <span>
                    <a href={`/${post.author.username}`}>
                        <Image src={`${post.author.image}`} alt='' width={10} height={10} />
                        <p>{`${post.author.username}`}
                        </p>
                    </a>
                    <p>
                        {formatTimeToNow(new Date(post.createdAt))}
                    </p>
                </span>
                {' '}

                <div className='editorOutput'>
                    <Suspense fallback={<div style={{ width: '500px', height: '500px' }}>loading</div>}>
                        <EditorOutput content={post.content} />
                    </Suspense>
                </div>

                <div>
                    <div>
                        {/* {interaction svgs} */}
                        <PostLikesClient initialLike={initialLike} initialLikesAmt={post.likes.length} postId={post.id}  />
                    </div>

                    <span>
                        <p>
                            {post.author.username}
                        </p>
                    </span>
                    <p>...</p>
                    <div>
                        <p>view {post.comments.length} comments</p>
                    </div>
                </div>
            </div>
        </section>
    )

}

export default Post