import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    useSidebar,
  } from "./ui/sidebar";
  import { Button } from "./ui/button";
import { LogOut, MessageCircleCode,PanelLeftClose } from "lucide-react";
import { SidebarHistory } from "./index";
import React, { useContext } from 'react'
import { useNavigate } from "react-router-dom";


import { googleLogout } from '@react-oauth/google';
import UserDetailContext from "@/context/UserDetailContext";



function AppSidebar() {
  const {toggleSidebar} =useSidebar();
  const navigate = useNavigate();
  const {userDetail, setUserDetail} = useContext(UserDetailContext)

  const Logout =()=>{
    
      googleLogout();
      localStorage.removeItem('user');
      setUserDetail(null);
      toggleSidebar()
      window.location.reload();

    
  }
  
  

  const StartChat =()=>{
    navigate('/');
    toggleSidebar()

  }
  return (
    <Sidebar className='border-none  '>
        <SidebarHeader className="p-5">           
          
          {/* <img src={'/logo.png'} alt="logo" width={30} height={30} />
           */}
          <div className="flex flex-row justify-between">
          <h2 className="text-white font-bold text-xl font-">Web.Ai</h2>
          <PanelLeftClose onClick={toggleSidebar}/>
          </div>
          
          <Button className='bg-white mt-3 text-black rounded-xl hover:bg-gray-300'
          onClick={StartChat}
          ><MessageCircleCode/>Start New Chat </Button>
        </SidebarHeader>
        
        <SidebarContent className='p-5'>
          
          <SidebarGroup>
            <SidebarHistory/>
          </SidebarGroup>
          
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter >
          <div className="p-5 mb-10 text-white">
          <Button onClick={Logout} variant= "ghost" className='w-full  flex justify-start rounded-xl hover:bg-gray-600  '>
            <LogOut className="text-white"/>
            Logout</Button>
            </div>
        </SidebarFooter >
      </Sidebar>
  )
}
  export default AppSidebar;

  
  