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

import { useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'
import uuid4 from 'uuid4'

function SignUp({openSignUp,closeSignUp}) {

    const {userDetail, setUserDetail} = useContext(UserDetailContext)
    const createUser = useMutation(api.users.CreateUser);

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
        // console.log(tokenResponse);
        const userInfo = await axios.get(
            'https://www.googleapis.com/oauth2/v3/userinfo',
            { headers: { Authorization: 'Bearer '+tokenResponse?.access_token } },

        );
        sessionStorage.setItem('access_token', tokenResponse.access_token);
    
        // console.log(userInfo);
        const user = userInfo.data;
        await createUser({
            name: user?.name,
            email: user?.email,
            picture: user?.picture,
            uid: uuid4()
        })

        if(typeof window !== 'undefined') localStorage.setItem('user', JSON.stringify(user));

        setUserDetail(userInfo?.data);
        closeSignUp();
        window.location.reload();
        
        },
        onError: errorResponse => console.log(errorResponse),
    });

    return (

        <Dialog open={openSignUp} onOpenChange={closeSignUp} >
        
        <DialogContent className='bg-slate-900 p-5  border border-gray-800'>
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
