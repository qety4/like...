import { z } from 'zod'


export const PostValidator =  z.object({
    userId: z.string(),
    content: z.any(),
})

export type PostCreationRequest = z.infer<typeof PostValidator>