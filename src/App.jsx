
import './App.css'

import Header from "./components/Header"

import { SidebarProvider } from './components/ui/sidebar';
import{ AppSidebar} from './components/index';
import { Outlet } from 'react-router-dom';


function App() {
  

  return (
    <>
      
      <SidebarProvider defaultOpen={false} > 
      <AppSidebar/>
      <div className='flex flex-col w-full'>
      
      <Header/>
      
      <Outlet/>
      </div>
      
      
      
      
      </SidebarProvider>
      
     </>
  )
}

export default App
