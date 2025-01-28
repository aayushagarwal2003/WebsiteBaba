import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Workspace from './workspace/Workspace';
import UserContextProvider from './context/UserContextProvider'
import {ChatBox} from "./components/index"

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL );

const router = createBrowserRouter([{
    path: '/',
    element: <App />,
      children:[
        {
          path: "/",
          element:<ChatBox/>
          
        },
        {
          path: "/workspace/:workspaceId",
          element: <Workspace />,
        }

      ]
    },
    
  ])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <ConvexProvider client={convex}>
      <UserContextProvider>
    <RouterProvider router={router}/>
    </UserContextProvider>
    </ConvexProvider>
  </StrictMode>,
)
