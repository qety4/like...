
import { FC } from 'react'
import LoginForm from '@/components/LoginForm/LoginForm'
import './loginPage.styles.scss'

interface pageProps {

}

const page: FC<pageProps> = ({ }) => {

    return (
        <main className='login-page'>
            <LoginForm/>
        </main>
    )

}

export default page