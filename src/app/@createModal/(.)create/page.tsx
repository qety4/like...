import CreateModal from '@/components/CreateModal/CreateModal'
import Overlay from '@/components/Overlay/Overlay'
import { getAuthSession } from '@/lib/auth'
import { notFound } from 'next/navigation'


const page = async () => {

    const session = await getAuthSession()

    return session ? (
        <>
            <CreateModal userId={session.user.id} />
            <Overlay />
        </>
    ) : (
        notFound()
    )

}

export default page