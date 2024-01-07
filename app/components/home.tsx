'use client'

import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"

export const Home = () => {
  return (
    <div>welcome to kaban Log in to continue

        <Button onClick={()=>signIn(undefined,{callbackUrl:`${window.location.origin}/board`})}>Continue with google</Button>
    </div>

  )
}
