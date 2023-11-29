import { ThemeToggle } from '@/src/Theme/ThemeToggle'
import React from 'react'
import LoginButton from './auth/LoginButton'
import { getAuthSession } from '@/lib/auth'
import UserProfil from './auth/UserProfile'

export const Header = async () => {
   const session = await getAuthSession()
   return (
      <header className="  border-b border-b-accent sticky top-0 z-20 bg-background w-full">
         <div className="  container flex items-center py-2 max-w-lg m-auto gap-1">
            <h2 className="  scale-85 duration-300 text-2xl font-bold mr-auto bg-[#041e4e] hover:bg-[#fed401] p-3 text-[#fed602] hover:text-[#041e4f] transition ease-in-out delay-150 hover:scale-125 direction-normal  translate-y-2  rounded-lg font-text">
               CargoRubixTraker
            </h2>
            {session?.user ? <UserProfil/> :<LoginButton/>}
            <ThemeToggle />
         </div>
      </header>
   )
}
