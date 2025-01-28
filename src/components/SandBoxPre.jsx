import React, { useEffect, useRef } from 'react'
import {SandpackPreview, useSandpack,} from "@codesandbox/sandpack-react";
import { useContext } from 'react';
import MassageContext from '@/context/MassageContext';

function SandBoxPre() {
    const previewRef = useRef();
    const {sandpack} = useSandpack();
    const {savebutton, setSavebutton} = useContext(MassageContext);
    useEffect(()=>{
        if(savebutton==="deploy"){
            GetSandBox();
            setSavebutton(null)
        }
    },[sandpack&&savebutton])
    const GetSandBox = async()=>{
        const client = previewRef.current?.getClient();
        if(client){
            
            const result = await client.getCodeSandboxURL();
            // console.log('https://'+result?.sandboxId+'.csb.app/');
            window.open('https://'+result?.sandboxId+'.csb.app');
            // console.log(result?.sandboxId)
            // https://4rqtlz.csb.app/
            // window.open(result?.editorU

        }
    }
    return (
    <SandpackPreview 
    ref={previewRef}
    style={{height:'80vh'}} 
    showNavigator={true}/>
    )
}

export default SandBoxPre
