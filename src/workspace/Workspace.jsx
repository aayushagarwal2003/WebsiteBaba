import React, { useContext, useEffect } from "react";
import ChatView from "./ChatView";
import CodeView from "./CodeView";
import { useNavigate, useParams } from "react-router-dom";
import UserDetailContext from "@/context/UserDetailContext";
import { api } from "../../convex/_generated/api";
import { useConvex } from "convex/react";

const Workspace = () => {
  const navigate= useNavigate()
  const {userDetail, setUserDetail} = useContext(UserDetailContext)
  const convex = useConvex();
  const {workspaceId} = useParams();

  useEffect(()=>{
    isAuthenticated();
},[userDetail,setUserDetail])
const isAuthenticated = async() =>{
    if(typeof window !== 'undefined'){
        const user = JSON.parse(localStorage.getItem('user'));
        // console.log(user)
        if(!user){
            navigate('/');
            return
        }
        const userGet = await convex.query(api.users.GetUser,{email:user?.email});
        console.log("USER",userGet._id)
        const workspaceGet = await convex.query(api.workspace.GetWorkspace,{workspaceId:workspaceId})
        console.log("WORKSPACE",workspaceGet.user)
        if(userGet._id !== workspaceGet.user){
            navigate('/')
        }
        
        
    }
}
  

  return (
    <div className=" pt-2 pr-7 pl-7">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <ChatView/> 
        <div className="col-span-2">
            <CodeView/>
        </div>
        
      </div>
      
    </div>
  );
};

export default Workspace;
