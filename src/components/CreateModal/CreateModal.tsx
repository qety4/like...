import { FC } from 'react'
import './createModal.styles.scss'
import Editor from '../Editor/Editor'

interface CreateModalProps {
    userId:string
}

const CreateModal: FC<CreateModalProps> = ({userId}) => {

    return (
        <div className='createModal-container'>
            <section className='createModal'>
                <div className='createModal-panel'>
                    <h3>create new post</h3>
                    <div>
                        {/* <Editor userId={userId}/> */}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default CreateModal