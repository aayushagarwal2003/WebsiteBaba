import React,{useState} from "react";

import UserContext from "./UserContext";
import UserDetailContext from "./UserDetailContext";
import { GoogleOAuthProvider } from '@react-oauth/google';

const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [userDetail, setUserDetail] = useState(null);
    return(

        <GoogleOAuthProvider clientId={import.meta.env.VITE_OAUTH_CLIENT_ID}>
        <UserDetailContext.Provider value={{userDetail, setUserDetail}}>
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
        </UserDetailContext.Provider>
        </GoogleOAuthProvider>
    )
}

export default UserContextProvider