
import { FC } from 'react'
import LoginForm from '@/components/LoginForm/LoginForm'
import './signInPage.styles.scss'

interface pageProps {

}

const page: FC<pageProps> = ({ }) => {

    return (
        <main className='sign-in-page'>
            <LoginForm/>
        </main>
    )

}

export default page