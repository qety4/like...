import { db } from '@/lib/db'
import { FC } from 'react'


interface PageProps {
    params: {
        user: string
    }
}

const Page: FC<PageProps> = async ({ params: { user } }) => {

    const userAcc = await db.user.findFirst({
        where: {
            username: user
        },
        include: {
            posts: {
                include: {
                    author: true,
                    likes: true,
                    comments: true
                }
            }
        }
    })

    console.log('userAcc db', userAcc)
    
    return (
        <main>
            <div>
                <p>
                    name:{userAcc?.name}
                </p>
                <p>
                    username:{userAcc?.username}
                </p>

            </div>
        </main>
    )

}

export default Page