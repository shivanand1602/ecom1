import {BrowserRouter, Routes,Route} from 'react-router-dom'
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import React,{useEffect} from 'react'

import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Home from './pages/Home'
import Header from './components/nav/Header'
import RegisterComplete from './pages/auth/RegisterComplete'
import ForgotPassword from './pages/auth/ForgotPassword'

import {auth} from './firebase'
import {useDispatch} from 'react-redux'
import { currentUser } from './functions/auth'


const App=()=>{
const dispatch=useDispatch()

useEffect(()=>{
  const unsubscribe=auth.onAuthStateChanged(async (user)=>{
    if(user){
      const idTokenResult=await user.getIdTokenResult()
      console.log("user",user);

      currentUser(idTokenResult.token).then(
        (res)=>{
          dispatch({
            type: 'LOGGED_IN_USER',
            payload:{
              name:res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            }
        });
        
        }).catch((err)=>console.log(err));
    }
  });
  //cleanup
  return ()=>unsubscribe();
},[])


    return(
      <>
       <Header/> 
       <ToastContainer />
       <Routes>
          <Route exact path="/" element={<Home/>}/> 
          <Route exact path="/login" element={<Login/>}/> 
          <Route exact path="/register" element={<Register/>}/> 
          <Route exact path="/register/complete" element={<RegisterComplete/>}/> 
          <Route exact path="/forgot/password" element={<ForgotPassword/>}/> 
       </Routes>
      </>
    )
}


export default App;
