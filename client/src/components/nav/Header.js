import React, { useState } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import {useNavigate} from "react-router-dom"
import { Link } from "react-router-dom";
import firebase from 'firebase/compat/app';
import { useDispatch,useSelector} from "react-redux";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");
  const navigate = useNavigate();
  let dispatch=useDispatch()
  let {user}= useSelector((state)=>({...state}));

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout=()=>{
    firebase.auth().signOut()
    dispatch({
      type:"LOGOUT",
      payload:null
    });
    navigate("/login");
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/">Home</Link>
      </Item>

      {!user && (
        <Item key="register" icon={<UserAddOutlined />}>
        <Link to="/register">Register</Link>
      </Item>
      )}

      {!user && (
        <Item key="login" icon={<UserOutlined />}>
        <Link to="/login">Login</Link>
      </Item>
      )}

      {user && (
        <SubMenu icon={<SettingOutlined />} title={user.email && user.email.split('@')[0]} className="float-right">

         {user && user.role === "subscriber" && (
            <Item>
              <Link to="/user/history">Dashboard</Link>
            </Item>
          )}

          {user && user.role === "admin" && (
            <Item>
              <Link to="/admin/dashboard">Dashboard</Link>
            </Item>
          )}
          
        <Item icon={<LogoutOutlined/>} onClick={logout}>LogOut</Item>
      </SubMenu>
      )}
     
    </Menu>
  );
};

export default Header;
