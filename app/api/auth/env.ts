import {z} from 'zod'



const enschema = z.object({
    GOOGLE_CLIENT_ID:z.string().min(1),
    GOOGLE_CLIENT_SECRET:z.string().min(1),
    NEXTAUTH_URL:z.string().min(1),
    NEXTAUTH_SECRET:z.string().min(1),
})

const env = enschema.parse(process.env)


export default env