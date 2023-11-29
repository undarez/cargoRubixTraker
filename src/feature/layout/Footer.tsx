import { buttonVariants } from '@/components/ui/button'
import clsx from 'clsx'
import { AppWindow, Home, MailPlus } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'


export const Footer= async() => {
  const emailAdress="fortuna77320@gmail.com"
  return (
    <footer className="py-2 px-20 flex justify-between container gap-1 fixed bottom-0 left-0 right-0 bg-background max-w-lg m-auto border-t border-accent">
      <Link href="/" className={clsx(buttonVariants({variant:'MyGhost'}))} >
        <Home size={16} className="" />
      </Link>
      <a href={`mailto:${emailAdress}`} className={clsx(buttonVariants({variant: 'MyGhost'}))}>
      <MailPlus size={16} className="" />
      </a>
      <Link href="https://codegenius3.vercel.app/" className={clsx(buttonVariants({variant:'MyGhost'}))} >
        <AppWindow  size={16} className="" />
      </Link>
        
    </footer>
  )
}
