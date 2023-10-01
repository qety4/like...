import CreateModal from '@/components/CreateModal/CreateModal'
import { getAuthSession } from '@/lib/auth'
import { notFound } from 'next/navigation'
import { FC } from 'react'



const page = async () => {

    const session = await getAuthSession()

    return session ? (
        <>
            <p>actual page</p>
            <CreateModal userId={session.user.id} />
        </>
    ) : (
        notFound()
    )

}

export default page