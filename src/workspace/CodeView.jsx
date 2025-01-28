import React ,{useContext, useEffect, useState}from 'react'
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer 
} from "@codesandbox/sandpack-react";
import Data from '@/data/Data';
import MassageContext from '@/context/MassageContext';
import Prompts from '@/data/Prompts';
import axios from 'axios';
import { useConvex, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useParams } from 'react-router-dom';
import { Download, Loader2Icon } from 'lucide-react';
import CustomEditor from '@/components/CustomEditor';
import { Button } from '../components/ui/button';
import SandBoxPre from '../components/SandBoxPre'

import { autocompletion, completionKeymap } from "@codemirror/autocomplete";


function CodeView() {
  const [activeTab, setActiveTab] = useState('code')
  const [files, setFiles] = useState(Data.DEFAULT_FILE)
  const {massages, setMassages,savebutton, setSavebutton} = useContext(MassageContext)
  const UpdateFile = useMutation(api.workspace.UpdateFile);
  const { workspaceId } = useParams();
  const convex= useConvex()
  const [loading,setLoading] = useState(false);

  useEffect(()=>{workspaceId&&GetFiles()},[workspaceId])

  const GetFiles=async()=>{
    setLoading(true);
    
    const result = await convex.query(api.workspace.GetWorkspace,{workspaceId:workspaceId});
    const mergedFiles = {...Data.DEFAULT_FILE,...result.fileData}
    setFiles(mergedFiles);
    setLoading(false);

  }

  useEffect(()=>{
    if(massages?.length>0){
      const role = massages[massages?.length-1].role;
      if(role==='user'){
        GenerateAiCode();
      }
    }
  },[massages])

  const GenerateAiCode = async () =>{
    setLoading(true);
    setActiveTab('code');
    const PROMPT = JSON.stringify(massages)+" "+Prompts.CODE_GEN_PROMPT;
    const result = await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/ai-code",{prompt:PROMPT});
    const temp1 = result.data.result.candidates[0].content.parts[0].text.replace(/^```json\n/, '').replace(/```$/, '').trim();
    const temp = temp1.replace("```", "")
    const aicode=JSON.parse(temp);
    const mergedFiles = {...Data.DEFAULT_FILE,...aicode.files}
    setFiles(mergedFiles);
    await UpdateFile({
      workspaceId:workspaceId,
      fileData:aicode?.files
    })
    // console.log(mergedFiles);
    setLoading(false);

  }
  
  
  
 

  
  return (
    <div className='relative '>
    <div className='text-white flex flex-row justify-between bg-[#181818] w-full p-2 rounded-lg '>
      <div className='flex items-center flex-wrap shrink-0 bg-black p-1  w-[140px] gap-3 justify-center rounded-full mb-2'>
        <h2 className={`text-sm cursor-pointer ${activeTab=='code'&& 'text-blue-500 bg-blue-500 bg-opacity-25 p-1 px-2 rounded-full' }`}
          onClick={()=>setActiveTab('code')}
        >Code</h2>
        <h2 className={`text-sm cursor-pointer ${activeTab=='preview'&& 'text-blue-500 bg-blue-500 bg-opacity-25 p-1 px-2 rounded-full' }`}
          onClick={()=>setActiveTab('preview')}
        >Preview</h2>
      </div>
      
      <div className='flex gap-2'>
      <Button className="bg-[#181818] rounded-xl hover:bg-gray-500 " onClick={()=>{setSavebutton("download")}}> <Download/> Export</Button>
      <Button className="bg-blue-700 rounded-xl hover:bg-blue-500 " 
      onClick={()=>{setActiveTab('preview');setTimeout(() => {
            setSavebutton('deploy');}, 3000);}}>Deploy</Button>
      </div>
      </div>
      <SandpackProvider template="react" theme={'dark'} files={files}
      customSetup={{
        dependencies: {
          ...Data.DEPENDANCY
        }
      }}
      options={{
        externalResources: ['https://cdn.tailwindcss.com']
          
      }}>
        <CustomEditor
        extensions={[autocompletion()]}
        extensionsKeymap={[completionKeymap]}
        />
        <SandpackLayout>
          {activeTab=='code'?<>
          <SandpackFileExplorer style={{height:'80vh'}}/>
          <SandpackCodeEditor style={{height:'80vh'}}/>
          
          </>:
          <>
          
          <SandBoxPre/>
          </>}
        </SandpackLayout>
      </SandpackProvider>
      {loading&&<div className='p-10 bg-gray-900 opacity-75 
      absolute top-0 rounded-lg w-full h-full flex items-center justify-center '>
        <Loader2Icon className='animate-spin h-10 w-10 text-white'/>
        <h2 className='text-white'>Generating your files... </h2>
      </div>}
    </div>
  
  )
}

export default CodeView