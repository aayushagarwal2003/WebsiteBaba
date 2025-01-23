
import './App.css'

import Header from "./components/Header"
import {ChatBox} from "./components/index"
import UserContextProvider from './context/UserContextProvider'

function App() {
  

  return (
    <UserContextProvider>
      <Header></Header>
      <ChatBox></ChatBox>
    </UserContextProvider>
  )
}

export default App
