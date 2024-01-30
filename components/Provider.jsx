"use client"

import { SessionProvider } from 'next-auth/react'
const Provider = ({children, session}) => {
  return (
    <SessionProvider sessioon={session}> 
      {children}
    </SessionProvider>
  )
}

export default Provider
