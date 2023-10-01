import { db } from '@/lib/db'
import Image from 'next/image'
import { FC } from 'react'
import './profilePage.styles.scss'
import { getAuthSession } from '@/lib/auth'
import { notFound } from 'next/navigation'
import { Camera, PlusCircle } from 'lucide-react'
import Link from 'next/link'

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
    if (!user) notFound()

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
                        <div>
                            {/* profile dashboard */}
                            <p>
                                name:{user?.name}
                            </p>
                            <p>
                                username:{user?.username}
                            </p>
                        </div>
                    </section>
                </header>

                <div>
                    {/* stories */}
                </div>

                <div className='profile__posts'>
                    {ownerProfile && !user?.posts.at(0) ?
                        <>
                            <div className='sharePhoto-container'>
                                <span className='cameraIcon'>
                                    <Camera />
                                </span>
                                <span className='sharePhoto__text'>
                                    <h3>add post</h3>
                                    <Link href='create'>
                                        <PlusCircle />
                                    </Link>
                                </span>
                            </div>
                        </>
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