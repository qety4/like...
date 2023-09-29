'use client'

import { FC, useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { signIn } from 'next-auth/react'
import './loginForm.styles.scss'

interface loginFormProps {

}


const LoginForm: FC<loginFormProps> = ({ }) => {

    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const loginWithGoogle = async () => {
        setIsLoading(true)
        try {
            await signIn('google')
        } catch (error) {
            toast({
                title: 'FAILED LOGIN',
                description: "ERROR LOGINING IN WITH GOOGLE",
                variant: 'destructive',
            })

        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='login-form'>
            <form action="">
                {/* credentials login form */}
            </form>
            <button className="google-btn" onClick={loginWithGoogle}>
                login with google
            </button>
        </div>
    )

}

export default LoginForm