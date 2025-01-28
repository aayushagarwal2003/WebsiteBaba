import { ChevronRight, Link  } from 'lucide-react'
import { Button } from "@/components/ui/button"
import React,{useState,useContext} from 'react'
import UserContext from '../context/UserContext'
import UserDetailContext from '../context/UserDetailContext'
import {SignUp} from './index'
import { useMutation } from 'convex/react'
import { useNavigate } from 'react-router-dom'
import { Header } from './index'

import { api } from '../../convex/_generated/api'

function ChatBox() {
    const [userInput, setUserInput] = useState()
    const {user, setUser} = useContext(UserContext)
    const {userDetail, setUserDetail,openDialog, setOpenDialog} = useContext(UserDetailContext)

    // const[openDialog, setOpenDialog] = useState(false)
    
    const createWorkspace = useMutation(api.workspace.CreateWorkspace);
    const navigate = useNavigate();
    const onGenerate = async (userData) =>{
        
        if(!userDetail?.name){
            setOpenDialog(true);
            return;
        }
        setUser({
            role: 'user',
            content: userData
        })

        const workspaceId = await createWorkspace({
            
            user:userDetail._id,
            massages:[{
                role: 'user',
                content: userData
            }]
        })
        // console.log(workspaceId);
        navigate(`/workspace/${workspaceId}`);
        window.location.reload();

        // navigate(`/workspace`);

        // console.log(user);
    }

    const SUGGSTIONS= ['Create ToDo App in React', 'Create Budget Track App', 
                        'Create Gym Management Portal Dashboard',
                        'Create Quizz App On History', 'Create Login Signup Screen']
  return (
    
    
    <div className='flex flex-col items-center w-full mt-36 xl:mt-42 gap-2 '> 
    
      <h2 className='text-white font-bold text-4xl'>What do you want to build?</h2>
      <p className='text-gray-400'>Prompt, run, edit, and deploy full-stack web apps.</p>

        <div className='p-5 border border-gray-800 rounded-xl max-w-xl w-full mt-3 '
            style={{background: '#151515'}}>
            <div className='flex gap-2'>
                <textarea placeholder='What you want to build?' 
                className='outline-none bg-transparent text-white w-full  h-32 max-h-56 resize-none'
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
        <div className='flex mt-8 flex-wrap max-w-2xl items-center justify-center gap-3 '>
            {SUGGSTIONS.map((suggestion,index)=>(
                <h2  key = {index} onClick={()=>onGenerate(suggestion)}
                className='text-sm text-gray-400 p-1 px-2 border rounded-full 
                border-gray-700 hover:text-white cursor-pointer'
                
                >{suggestion}</h2>
            ))}
        </div>
        <SignUp openSignUp={openDialog} closeSignUp={(e)=>setOpenDialog(e)}/>
            
    
    </div>

  )
}

export default ChatBox
