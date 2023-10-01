'use client'
import { FC } from 'react'
import './sideMenu.styles.scss'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuItem } from '../ui/dropdown-menu'
import { signOut } from 'next-auth/react'
import { Menu } from 'lucide-react'


const SideMenu = () => {

    return (
        <DropdownMenu>

            <DropdownMenuTrigger>
                <Menu />
            </DropdownMenuTrigger>


            <DropdownMenuContent >
                <DropdownMenuItem >
                    <p onClick={() => signOut()}>sign-out</p>
                </DropdownMenuItem>
            </DropdownMenuContent>


        </DropdownMenu>
    )

}

export default SideMenu