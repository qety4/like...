import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { z } from "zod"

export async function GET(req: Request) {

    const url = new URL(req.url)

    const session = await getAuthSession()

    let followedUsersIds: string[] = []


    if (session) {
        const followedUsers = await db.follows.findMany({
            where: {
                followerId: session.user.id,

            },
            include: {
                user_following: true
            }
        })

        followedUsersIds = followedUsers.map(
            ({ user_following }) => user_following.id
        )

    }
    console.log('fetching new posts 1')

    try {

        const { limit, page, profileId } = z.object({
            profileId: z.string().optional().nullish(),
            limit: z.string(),
            page: z.string(),
        }).parse({
            profileId: url.searchParams.get('profileId'),
            limit: url.searchParams.get('limit'),
            page: url.searchParams.get('page'),
        })

        console.log('fetching new posts "2" ', limit, page, profileId)

        let whereClause = {}

        if (profileId) {
            whereClause = {
                author: {
                    id: profileId
                },
            }
        } else if (session) {
            whereClause = {
                author: {
                    id: {
                        in: followedUsersIds
                    }
                }
            }
        }

        console.log('fetching new posts 3', whereClause)

        const posts = await db.post.findMany({
            take: parseInt(limit),
            skip: (parseInt(page) - 1) * parseInt(limit),
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                author: true,
                likes: true,
                comments: true,
            },
            where: whereClause
        })

        console.log('fetching new posts 4', posts)

        return new Response(JSON.stringify(posts))

    } catch (error) {
        if (error instanceof z.ZodError)
            return new Response('Invalid request data', { status: 422 })

        return new Response('Could not get posts', { status: 500 })
    }

}