import UserDetailContext from '@/context/UserDetailContext';
import { api } from '../../convex/_generated/api';
import { useConvex } from 'convex/react';
import React, { useContext, useEffect, useState } from 'react'
import { GetAllWorkspaces } from '../../convex/workspace';
import { Link, useParams } from 'react-router-dom';
import { useSidebar } from './ui/sidebar';

function SidebarHistory() {
    const {userDetail, setUserDetail} = useContext(UserDetailContext);
    const convex = useConvex();
    const [workspaceList, setWorkspaceList] = useState();
    const {toggleSidebar} =useSidebar()
    const {workspaceId} = useParams()
   
    useEffect(()=>{
        userDetail&&GetAllWorkspace();
    },[userDetail])

    const GetAllWorkspace = async()=>{
        const result = await convex.query(api.workspace.GetAllWorkspaces,
            {userId:userDetail?._id}
        );
        setWorkspaceList(result);
        // console.log(result);
    }


    return (
    <div>
      <h2 className='font-medium text-lg'>Your Chats</h2>
      <div >
        {workspaceList&&workspaceList.map((workspace,index)=>(
            <Link to={`/workspace/${workspace._id}`} key={index}>
            <h2 onClick={toggleSidebar} key={index} 
              className={`text-sm  mt-5  cursor-pointer  ${workspace._id === workspaceId ? 'text-white font-bold ' : 'text-gray-400 '} hover:text-white  `}>
                {workspace?.massages[0]?.content}
            </h2>
            </Link>
        ))}
      </div>
    </div>
  )
}

export default SidebarHistory
