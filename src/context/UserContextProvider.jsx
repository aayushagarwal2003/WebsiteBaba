import React,{useEffect, useState} from "react";

import UserContext from "./UserContext";
import UserDetailContext from "./UserDetailContext";
import MassageContext from "./MassageContext";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useConvex } from "convex/react";
import { api } from '../../convex/_generated/api'



const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [userDetail, setUserDetail] = useState(null);
    const [massages, setMassages] = useState([]);
    const[openDialog, setOpenDialog] = useState(false)
    
    const[savebutton, setSavebutton] = useState(null);
    
    const convex = useConvex();
    // const navigate = useNavigate();
        useEffect(()=>{
            isAuthenticated();
        },[])
        const isAuthenticated =async () =>{
            if(typeof window !== 'undefined'){
                const user = JSON.parse(localStorage.getItem('user'));
                if(!user){
                    
                    return
                }
                const result = await convex.query(api.users.GetUser,{email:user?.email});
                
                setUserDetail(result);
            }
        }

    return(
        
        <GoogleOAuthProvider clientId={import.meta.env.VITE_OAUTH_CLIENT_ID}>
        <MassageContext.Provider value={{massages, setMassages,savebutton, setSavebutton}}>
        <UserDetailContext.Provider value={{userDetail, setUserDetail,openDialog, setOpenDialog}}>
        <UserContext.Provider value={{user, setUser}}>
        
            {children}
            
        </UserContext.Provider>
        </UserDetailContext.Provider>
        </MassageContext.Provider>
        </GoogleOAuthProvider>
         
    )
}

export default UserContextProvider