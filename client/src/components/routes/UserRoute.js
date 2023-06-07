import React from "react";
import {Route,Link} from 'react-router-dom';
import { Outlet} from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

const UserRoute=({children, ...rest})=>{
    const {user} =useSelector((state)=>({...state}));

    return user && user.token ? (<Outlet/>): (<LoadingToRedirect/>);
}
//<Route {...rest} render={()=>children}  />
export default UserRoute;