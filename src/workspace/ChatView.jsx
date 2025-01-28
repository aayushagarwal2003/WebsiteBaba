import { Button } from "@/components/ui/button"
import { useConvex, useMutation } from 'convex/react';
import React, { useEffect ,useState } from 'react'
import {  useParams } from 'react-router-dom'
import { api } from '../../convex/_generated/api';
import { useContext } from 'react';
import MassageContext from '../context/MassageContext';
import UserDetailContext from '../context/UserDetailContext';
import { Link ,ChevronRight, Loader2Icon} from 'lucide-react';
import Prompts from "@/data/Prompts";
import axios from "axios";
import ReactMarkDown from 'react-markdown';
import { useSidebar } from "@/components/ui/sidebar";


function ChatView() {
    const { workspaceId } = useParams();
    const convex = useConvex();
    const {massages, setMassages,activeTab, setActiveTab} = useContext(MassageContext)
    const {userDetail, setUserDetail} = useContext(UserDetailContext)
    const [userInput, setUserInput] = useState()

    const[lodding,setLodding] = useState(false);
    const {toggleSidebar} =useSidebar();
    const UpdateMassage= useMutation(api.workspace.UpdateMassages);

    useEffect(()=>{
        
        workspaceId&&getWorkspaceData();
    },[workspaceId])

    const getWorkspaceData = async () =>{
        const result = await convex.query(api.workspace.GetWorkspace,{workspaceId:workspaceId})
        setMassages(result.massages)
    }

    useEffect(()=>{
        if(massages?.length>0){
            const role = massages[massages?.length-1].role;
            if(role==='user'){
                GetAiResponse();
            }
        }
        
    },[massages])

    const GetAiResponse = async () =>{
        setLodding(true);
        const PROMPT = JSON.stringify(massages)+Prompts.CHAT_PROMPT;
        const result = await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/ai-chat",{prompt:PROMPT});
        // console.log(result.data.result.candidates[0].content.parts[0].text);
        const aiRes ={
            role:'ai',
        content:result.data.result.candidates[0].content.parts[0].text
        }
        setMassages(prev=>[...prev,{role:'ai',
            content:result.data.result.candidates[0].content.parts[0].text}])
        await UpdateMassage({
            massages:[...massages,aiRes],
            workspaceId:workspaceId

        })
        
        setLodding(false);

    }

    const onGenerate = async (input) =>{
        setMassages(prev=>[...prev,{role:'user',content:input}])
        setUserInput('')
    }




    return (
        
    <div className="relative h-[85vh] flex flex-col ">
        <div className="flex-1 overflow-y-scroll scrollbar-thumb-black scrollbar-track-gray-300 scrollbar-hide rounded-2xl">
            {massages?.map((msg,index)=>(
                <div key={index}
                className='p-3 rounded-2xl bg-gray-900 mb-2 flex gap-2 items-center leading-7 '
                >   
                    {userDetail?.name&&msg.role==='user'&&<img src={userDetail?.picture} alt="User Profile" width={35} height={35}
                        className='rounded-full'
                    />}
                    {/* <h2 className='text-white'>{msg.content}</h2> */}
                    <ReactMarkDown className=" text-white flex flex-col">{msg.content}</ReactMarkDown> 
                    
                </div>
            ))}
            {lodding&&<div className='p-3 rounded-lg bg-gray-800 mb-2 flex gap-2 items-center'>
                        <Loader2Icon className="animate-spin text-white "/>
                        <h2 className="text-white">Generating response...</h2>
                    </div>}
        </div>
        
        <div className="flex gap-2 items-end">
            {userDetail&&<img src={userDetail?.picture} alt="user" width={30} height={30}
            className="rounded-full mb-3" onClick={toggleSidebar}/>}
        <div className='p-5 border border-gray-800 rounded-xl max-w-xl w-full mt-3 '
            style={{background: '#151515'}}>
            <div className='flex gap-2'>
                <textarea placeholder='What you want to build?' 
                className='outline-none bg-transparent text-white w-full  h-32 max-h-56 resize-none'
                value={userInput}
                onChange={(event)=>{setUserInput(event.target.value);}}></textarea>
                {userInput&&<Button onClick={()=>onGenerate(userInput)}
                className='bg-blue-500 p-2 h-8 w-8 border-none rounded cursor-pointer' variant="outline" size="icon">
                <ChevronRight />
                </Button>}
        
            </div>

            <div>
                <Link  className='text-white h-5 w-5'/>
            </div>

    </div>
    </div>
    </div>

    
  )
}

export default ChatView