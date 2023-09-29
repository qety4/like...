import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { PostValidator } from "@/lib/validators/post"
import { z } from "zod"


export async function POST(req: Request) {

    try {
        const session = await getAuthSession()
        if (!session?.user) {
            return new Response('Unauthorized', { status: 401 })
        }
        const body = await req.json()
        const { content, userId } = PostValidator.parse(body)

        console.log('content', content, userId)

        if (session.user.id !== userId)
            return new Response('Unauthorized', { status: 401 })

        await db.post.create({
            data: {
                content,
                authorId: session.user.id,
                
            }
        })

        return new Response('OK')
    } catch (error) {
        if (error instanceof z.ZodError)
            return new Response('Invalid data parsed', { status: 422 })

        return new Response('Could not post to subreddit, try later', { status: 500 })
    }
}