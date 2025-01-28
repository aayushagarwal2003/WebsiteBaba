import React, { useContext, useEffect } from 'react'

import { useSandpack } from "@codesandbox/sandpack-react";


import JSZip from 'jszip';
import { saveAs } from 'file-saver';

import MassageContext from '@/context/MassageContext';

function CustomEditor() {
    
    const { sandpack } = useSandpack();
    const { files, activeFile } = sandpack;

    const {savebutton, setSavebutton} = useContext(MassageContext);
    
    useEffect(()=>{
        
        if (savebutton==="download") {
            
            
            downloadZip();
              setSavebutton(null); 
            }
        
        
    },[savebutton, setSavebutton])

    const downloadZip = async () => {
        const zip = new JSZip();
        
        Object.entries(files).forEach(([filePath, fileContent]) => {
          const sanitizedPath = filePath.replace(/^\/+/, ''); // Remove leading slashes
            if (fileContent.code) {
            zip.file(sanitizedPath, fileContent.code.trim());
            }
        });
    
        try {
            const blob = await zip.generateAsync({ type: 'blob' });
            saveAs(blob, 'project_files.zip');
        } catch (error) {
            console.error('Error generating ZIP file:', error);
        }
      };


    
    return (
    <>
    
    </>
    )
}

export default CustomEditor
