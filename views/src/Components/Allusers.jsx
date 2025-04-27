import axios from 'axios';
import "./Alluser.css"
import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'

export default function Allusers({info}) {
    
    const navigate = useNavigate();
    const [users,setUsers]=useState([]);

   let func=async()=>{
    await axios.get(`${import.meta.env.VITE_Server}/data/alluser`,{withCredentials:true})
    .then((res)=>{
        setUsers(res.data) 
    }).catch((err)=>{
        console.log(err)
    })
   }
    useEffect(()=>{
        if(!localStorage.getItem('user')){
            return navigate('/login')
        }
        func();
    }
    ,[])
  return (
    <div className="Allusers_container">
        {users&&users.map((e,idx)=><div key={idx} className='user_link' onClick={()=>{info(e.username)}}>{e.username}</div>)}
    </div>
  )
}
