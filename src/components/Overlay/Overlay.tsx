'use client'
import { useRouter } from 'next/navigation'
import './overlay.styles.scss'

useRouter
const Overlay = () => {
    const router = useRouter()

    return (

        <div className='overlay' onClick={()=> router.back()} />
    )

}

export default Overlay