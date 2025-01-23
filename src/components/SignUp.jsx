import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    } from "@/components/ui/dialog"

import axios from 'axios'
import {useContext} from 'react'
import { Button } from "@/components/ui/button"
import UserDetailContext from '../context/UserDetailContext'
import { useGoogleLogin } from '@react-oauth/google';



function SignUp({openSignUp,closeSignUp}) {

    const {userDetail, setUserDetail} = useContext(UserDetailContext)
    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
        console.log(tokenResponse);
        const userInfo = await axios.get(
            'https://www.googleapis.com/oauth2/v3/userinfo',
            { headers: { Authorization: 'Bearer '+tokenResponse?.access_token } },

        );
    
        console.log(userInfo);
        setUserDetail(userInfo?.data);
        closeSignUp();
        
        },
        onError: errorResponse => console.log(errorResponse),
    });

    return (

        <Dialog open={openSignUp} onOpenChange={closeSignUp}>
        
        <DialogContent >
            <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription className='flex flex-col gap-3 items-center justify-center'>

                
                <Button onClick={googleLogin} className='bg-blue-500 hover:bg-blue-400'>Sign in with Google</Button>
            
                
                
                
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
        </Dialog>


    )
}

export default SignUp
