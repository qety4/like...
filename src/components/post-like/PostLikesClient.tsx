import { usePrevious } from '@mantine/hooks'
import { Like } from '@prisma/client'
import { Heart } from 'lucide-react'
import { FC, useEffect, useState } from 'react'

interface PostLikesClientProps {
    postId: string,
    initialLikesAmt: number,
    initialLike: boolean 
}

const PostLikesClient: FC<PostLikesClientProps> = ({ postId, initialLikesAmt, initialLike }) => {
    const [votesAmt, setVotesAmt] = useState<number>(initialLikesAmt)
    const [currentLike, setCurrentLike] = useState(initialLike)
    const prevLike = usePrevious(currentLike)

    useEffect(() => {
        setCurrentLike(initialLike)
    },[initialLike])


    return (
        <div>
            <button>
                <Heart />
            </button>
        </div>
    )

}

export default PostLikesClient