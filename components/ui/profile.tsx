
import { authOption } from "@/app/api/auth/[...nextauth]/route"

import { getServerSession } from "next-auth"
import { signOut } from "next-auth/react"
import { Button } from "./button"
import { Drop } from "./signout"

const Profile = async () => {
    //const user = await getServerSession(authOption)
  return (
    <Drop User={''}/>
  )
}

export default Profile