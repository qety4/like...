'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { PostCreationRequest, PostValidator } from '@/lib/validators/post'
import { FC } from 'react'
import type EditorJS from '@editorjs/editorjs'
import { uploadFiles } from '@/lib/uploadthing'
import { toast } from '@/hooks/use-toast'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import './editor.styles.scss'

interface EditorProps {
    userId: string
}

const Editor: FC<EditorProps> = ({ userId }) => {


    const ref = useRef<EditorJS>()
    const [isMounted, setIsMounted] = useState<boolean>(false)
    const _titleRef = useRef<HTMLTextAreaElement>()
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        if (typeof window != 'undefined') {
            setIsMounted(true)
        }

    }, [])


    const initializeEditor = useCallback(async () => {
        const EditorJS = (await import('@editorjs/editorjs')).default
        const Header = (await import('@editorjs/header')).default
        const Embed = (await import('@editorjs/embed')).default
        const Table = (await import('@editorjs/table')).default
        const List = (await import('@editorjs/list')).default
        const Code = (await import('@editorjs/code')).default
        const LinkTool = (await import('@editorjs/link')).default
        const InlineCode = (await import('@editorjs/inline-code')).default
        const ImageTool = (await import('@editorjs/image')).default

        if (!ref.current) {

            const editor = new EditorJS({
                holder: 'editor',
                onReady() {
                    ref.current = editor
                },
                placeholder: 'Write your post here',
                inlineToolbar: true,
                data: {
                    blocks: []
                },
                tools: {
                    header: Header,
                    linkTool: {
                        class: LinkTool,
                        config: {
                            endpoint: '/api/link',
                        },
                    },
                    image: {
                        class: ImageTool,
                        config: {
                            uploader: {
                                async uploadByFile(file: File) {
                                    const [res] = await uploadFiles([file])

                                    return {
                                        success: 1,
                                        file: {
                                            url: res.fileUrl
                                        }
                                    }
                                }
                            }
                        },
                    },

                    list: List,
                    code: Code,
                    inlineCode: InlineCode,
                    table: Table,
                    embed: Embed
                },
            })
        }
    }, [])



    useEffect(() => {
        const init = async () => {
            await initializeEditor()

            setTimeout(() => {
                _titleRef.current?.focus()
            }, 100)
        }

        if (isMounted) {
            init()
            return () => {
                ref.current?.destroy()
                ref.current = undefined
            }
        }

    }, [isMounted, initializeEditor])

    const { mutate: createPost } = useMutation({
        mutationFn: async ({ content, userId }: PostCreationRequest) => {

            const payload: PostCreationRequest = {
                content: content,
                userId
            }
            console.log('payload', payload)

            const { data } = await axios.post('/api/post/create', payload)
            console.log('data', data)
            return data
        },
        onError: () => {
            return toast({
                title: 'Something went wrong',
                description: 'Your post was not published, try again later'
            })
        },
        onSuccess: () => {
            const newPathname = pathname.split('/').slice(0, -1).join('/')
            router.push(newPathname)

            router.refresh()
            return toast({
                description: 'Your post is published'
            })
        }
    })


    async function onSubmit() {

        const blocks = await ref.current?.save()

        const payload: PostCreationRequest = {
            content: blocks,
            userId
        }

        createPost(payload)
    }



    if (!isMounted) return null



    return (

        <form id="post-form" className="editor-form"
            onSubmit={onSubmit}
            action="submit">

            <div id='editor' className='min-h-[500px]' />
        </form>
    )
}

export default Editor