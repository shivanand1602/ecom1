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
import History from './pages/user/History'
import UserRoute from './components/routes/UserRoute';
import AdminRoute from './components/routes/AdminRoute';
import Password from './pages/user/Password'
import Wishlist from './pages/user/Wishlist'
import AdminDashboard from './pages/admin/AdminDashboard'
import CategoryCreate from './pages/admin/category/CategoryCreate'
import CategoryUpdate from './pages/admin/category/CategoryUpdate'
import SubCreate from './pages/admin/sub/SubCreate'
import SubUpdate from './pages/admin/sub/SubUpdate'
import ProductCreate from './pages/admin/product/ProductCreate'
import AllProducts from './pages/admin/product/AllProducts'
import ProductUpdate from './pages/admin/product/ProductUpdate'
import Product from './pages/Product'
import CategoryHome from './pages/category/CategoryHome'
import SubHome from './pages/sub/SubHome'
import Shop from './pages/Shop'


import {auth} from './firebase'
import {useDispatch} from 'react-redux'
import { createOrUpdateUser } from './functions/auth'
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
          
          <Route element={<UserRoute/>}>
            <Route exact path="/user/history" element={<History />}/>
            <Route exact path="/user/password" element={<Password />}/>
            <Route exact path="/user/wishlist" element={<Wishlist/>}/>
          </Route>
          
          <Route element={<AdminRoute/>}>
            <Route exact path="/admin/dashboard" element={<AdminDashboard />}/>
            <Route exact path="/admin/category" element={<CategoryCreate />}/>
            <Route exact path="/admin/category/:slug" element={<CategoryUpdate />}/>
            <Route exact path="/admin/sub" element={<SubCreate />}/>
            <Route exact path="/admin/sub/:slug" element={<SubUpdate />}/>
            <Route exact path="/admin/product" element={<ProductCreate />}/>
            <Route exact path="/admin/products" element={<AllProducts />}/>
            <Route exact path="/admin/product/:slug" element={<ProductUpdate />}/>
          </Route>

          <Route exact path="/product/:slug" element={<Product/>}/>
          <Route exact path="/category/:slug" element={<CategoryHome/>}/>
          <Route exact path="/sub/:slug" element={<SubHome/>}/>
          <Route exact path="/shop" element={<Shop/>}/> 
          
          
          
       </Routes>
      </>
    )
}
//<Route exact path="/user/history" element={<History />}/>

export default App;
