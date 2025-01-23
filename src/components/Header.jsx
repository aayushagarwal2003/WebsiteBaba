import React from 'react'
import { Button } from "@/components/ui/button"
function Header() {
  return (
    <div className='flex justify-between p-4 items-center'>
      <img src="/logo.png" alt="Logo" width={40} height={40}/>
      <div className='flex gap-4'>
        <Button>Sign In</Button>
        <Button>Get Started</Button>
        </div>
    </div>
  )
}

export default Header
