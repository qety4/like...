
import { FC } from 'react'
import Editor from '../Editor/Editor'
import './createModal.styles.scss'

interface CreateModalProps {
    userId: string
}

const CreateModal: FC<CreateModalProps> = ({ userId }) => {

    return (
        <div className='createModal-container'>
            <section className='createModal'>
                <div className='createModal__title'>
                    <h3>create new post</h3>
                </div>
                <div className='createModal-panel'>
                    <Editor userId={userId} />
                </div>
            </section>
        </div>
    )
}

export default CreateModal