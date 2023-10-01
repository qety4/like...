
import { FC } from 'react'
import { UserCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Session } from 'next-auth';
import './userSidebar.styles.scss'
import { User } from '@prisma/client';

interface UserSidebarProps {
    user: User | null
}

const UserSidebar: FC<UserSidebarProps> = ({ user }) => {

    console.log('user sidebar',user)
    return (
        <span className='userSidebar-container'>
            {user ?
                (
                    <Link className="user" href={`${user.username}`}>
                        <Image src={`${user.image}`} alt='profile picture' width={30} height={30}
                            referrerPolicy='no-referrer'
                        />
                    </Link>
                )
                :
                (
                    <Link href='sign-in'>
                        <UserCircle />
                    </Link>
                )
            }
        </span>
    )
}

export default UserSidebar