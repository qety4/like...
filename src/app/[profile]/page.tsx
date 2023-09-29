import { db } from '@/lib/db'
import Image from 'next/image'
import { FC, use } from 'react'
import './profilePage.styles.scss'
import SharePhoto from '@/components/SharePhoto/SharePhoto'
import { getAuthSession } from '@/lib/auth'

interface PageProps {
    params: {
        profile: string
    }
}

const Page: FC<PageProps> = async ({ params: { profile } }) => {
    const session = await getAuthSession()

    const user = await db.user.findFirst({
        where: {
            username: profile
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

    const ownerProfile = session?.user.id === user?.id

    console.log('userAcc db', user)

    return (
        <main className='profile-page'>
            <div className='profile'>

                <header className='profile__header'>

                    <div className='profile__image-container'>
                        <span className='profile__image'>
                            <Image
                                referrerPolicy='no-referrer'
                                src={`${user?.image}`}
                                fill
                                alt='profile image' />
                        </span>
                    </div>
                    <section className='profile__header-text'>
                        <p>
                            name:{user?.name}
                        </p>
                        <p>
                            username:{user?.username}
                        </p>
                    </section>
                </header>
                <div>

                </div>
                <div className='profile__posts'>
                    {ownerProfile && !user?.posts.at(0) ?
                        <SharePhoto />
                        :
                        <div>
                            {/* User Posts Display */}
                            user posts
                        </div>
                    }
                </div>
            </div>
        </main>
    )

}

export default Page