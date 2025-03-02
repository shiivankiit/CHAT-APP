import React from "react";
import NavBar from "./components/NavBar";
import {Routes,Route,Navigate} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import ProfilePage  from "./Pages/ProfilePage";
import SettingsPage from "./Pages/SettingsPage";
import SignUpPage from "./Pages/SignUpPage";
import { useAuthStore } from "./store/useAuthStore";
import {useEffect} from "react";
import {Loader} from "lucide-react";
import {Toaster} from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore";

const App = () => {
   
  const {authUser,checkAuth,isCheckingAut,onlineUsers} = useAuthStore();
  const{theme}=useThemeStore();
  
  console.log({onlineUsers});

  useEffect(()=>{
    checkAuth()
  },[checkAuth]);
  // console.log({authUser})

  if(isCheckingAut && !authUser)
    return (
      <div className ="flex items-center justify-center h-screen">
        <Loader className="size-20 animate-spin"/>
      </div>

  )
  return (
    <div data-theme={theme }>
      <NavBar/>

     <Routes>
        <Route path="/" element={authUser ? <HomePage/>:<Navigate to ="/login"/>}/>
        <Route path="/signup" element={!authUser ? <SignUpPage/>:<Navigate to ="/"/>}/>
        <Route path="/login" element={!authUser ? <LoginPage/>:<Navigate to ="/"/>}/>
        <Route path="/settings" element={<SettingsPage/>}/>
        <Route path="/profile" element={authUser ? <ProfilePage/>:<Navigate to ="/login"/>}/>
     </Routes>
    <Toaster/>
    </div>
  )
}

export default App;