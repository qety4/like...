import { FC } from 'react'
import { Logo } from './three-dots-svg'
import './sidebar.styles.scss'
import { Circle } from 'lucide-react'
import { PlusCircle } from 'lucide-react';
import { Heart } from 'lucide-react';
import { Send } from 'lucide-react';
import { Compass } from 'lucide-react';
import Link from 'next/link'
import { getAuthSession } from '@/lib/auth'
import UserSidebar from '../UserSidebar/UserSidebar'
import { db } from '@/lib/db'
import SideMenu from '../SideMenu/SideMenu';


interface SidebarProps {
}

const Sidebar: FC<SidebarProps> = async ({ }) => {

    const session = await getAuthSession()

    const user = session ? await db.user.findFirst({
        where: {
            id: session?.user.id
        }
    })
        : null

    console.log('session sidebar', user)

    return (
        <div className='sidebar-container'>

            <div className='sidebar'>

                <div className='sidebar__logo'>
                    <Link href="/">
                        <Logo />
                    </Link>
                </div>

                <ul className='sidebar__redirect'>
                    <li>
                        <Link href="/"><Circle /></Link>
                    </li>
                    <li>
                        search
                        {/* search component */}
                    </li>
                    <li>
                        <Link href=""><Compass /></Link>
                    </li>
                    <li>
                        reels
                    </li>
                    <li>
                        <Link href="messages"><Send /></Link>
                    </li>
                    <li>
                        <Link href=""><Heart /></Link>
                    </li>
                    <li>
                        <Link href="create"><PlusCircle /></Link>
                    </li>
                    <li>
                        <UserSidebar user={user} />
                    </li>
                </ul>

                <div className='sidebar__menu-container'>
                    {user ?
                        <SideMenu />
                        :
                        <>
                        </>
                    }

                </div>

            </div>

        </div>
    )

}

export default Sidebar