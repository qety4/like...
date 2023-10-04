import { FC } from 'react'
import './post.styles.scss'
import EditorOutput from '../EditorOutput/EditorOutput'
import { Post, PostLike, User } from '@prisma/client'
import Image from 'next/image'
import { formatTimeToNow } from '@/lib/utils'


interface PostProps {
    post: Post & {
        author: User,
        like: PostLike[]
    }
}

const Post: FC<PostProps> = ({ post }) => {

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

                <div>
                    <EditorOutput content={post.content} />
                </div>

                <div>
                    
                </div>
            </div>
        </section>
    )

}

export default Post