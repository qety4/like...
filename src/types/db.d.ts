import { Comment, PostLike, User } from "@prisma/client"

type ExtendedPost = Post & {
    author: User,
    likes: PostLike[],
    comments: Comment[]
}