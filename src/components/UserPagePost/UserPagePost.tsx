import { FC } from 'react'
import EditorOutput from '../EditorOutput/EditorOutput'
import './userPagePost.styles.scss'
import Link from 'next/link'


interface UserPostProps {
    content: any,
    likeAmt: number,
    commentAmt: number
}

const UserPost: FC<UserPostProps> = ({ content, likeAmt, commentAmt }) => {


    return (
        <section>
            {/* add hover*/}
            {/* add link to userPostsFeed */}
            <div>
                post
                <EditorOutput content={content} />
            </div>
        </section>
    )

}

export default UserPost