import React from 'react'
import { Button } from "@/components/ui/button"
import UserDetailContext from '../context/UserDetailContext'
import { useContext } from 'react'
import { useSidebar } from './ui/sidebar';

function Header() {
  const {toggleSidebar} =useSidebar();
  // const {userDetail, setUserDetail} = useContext(UserDetailContext)
  const {userDetail, setUserDetail,openDialog, setOpenDialog} = useContext(UserDetailContext)
  
  return (
    <div className='flex justify-between p-3 items-center border-b border-gray-800'>
      {/* <img src="/logo.png" alt="Logo" width={40} height={40}/> */}
      <h2 className="text-white font-bold text-xl cursor-pointer"
      onClick={userDetail ? toggleSidebar: undefined}
      >Web.Ai</h2>
      {!userDetail?.name?<div className='flex gap-4'>
        <Button   className="rounded bg-blue-700 hover:bg-blue-600" onClick={()=>setOpenDialog(true)}>Sign In</Button>
        {/* <Button className="rounded">Get Started</Button> */}
        </div>:
        <div className='flex gap-4 text-white'>
          <img className ="rounded-full" src={userDetail.picture} 
          alt="Profile photo" hight={40} width={40} onClick={toggleSidebar}/>
          </div>}
    </div>
  )
}

export default Header
