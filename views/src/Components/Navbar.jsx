import React from 'react'
import { NavLink } from "react-router-dom";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import './Navbar.css'
export default function Navbar() {

    const navigate = useNavigate();
  let logout=async()=>{
    await axios.delete(`${import.meta.env.VITE_Server}/user/logout`,{withCredentials:true})
    localStorage.removeItem()
    navigate("/login")
  }

  
  return (
    <nav className='nav-container'>
        <NavLink to="/" className={'navlink'}>Home</NavLink>
        <div>
        <NavLink to="/register"className={'navlink'}>register</NavLink>
        <NavLink to="/login"className={'navlink'}>login</NavLink>
        <NavLink to="/login"className={'navlink'} onClick={logout}>logout</NavLink>
        </div>
    </nav>
  )
}
