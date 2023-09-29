'use client'

import { Camera, PlusCircle } from 'lucide-react'
import { FC, useState } from 'react'
import './sharePhoto.styles.scss'
import CreateModal from '../CreateModal/CreateModal'

interface SharePhotoProps {

}

const SharePhoto: FC<SharePhotoProps> = ({ }) => {
    const [open, setOpen] = useState(false)

    return (
        <div className='sharePhoto-container'>
            <span className='cameraIcon'>
                <Camera />
            </span>
            <span className='sharePhoto__text'>
                <h3>add post</h3>
                <PlusCircle onClick={() => setOpen((prev) => !prev)} />
                {
                    open ?
                    <>
                    <CreateModal />
                    <div className='createModal-overlay' onClick={() => setOpen((prev) => !prev)}/>
                    </>
                    :
                    <></>
                }
            </span>
        </div>
    )

}

export default SharePhoto