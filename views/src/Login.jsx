import React, { useState } from 'react'
import axios from 'axios'

export default function Login() {
  const [info,setInfo]=useState({username:"",password:""})

  const login=async(e)=>{
    e.preventDefault();
    // console.log(import.meta.env.VITE_Server)
    await axios.post(`${import.meta.env.VITE_Server}/user/login`,info,{withCredentials:true})
    .then((res)=>{
      res.data=='success'?localStorage.setItem('user',info.username):localStorage.removeItem()
    }).catch(err=>{console.log(err);localStorage.removeItem()})
  }
  
  const input=(e)=>{
    setInfo((preInfo)=>{
      preInfo[e.target.name]=e.target.value;
      return {...preInfo};
    })
  }
 
  return (
    <div className="login_container">
      <h1>Login</h1>
      <form onSubmit={login}>
        <input type="text" value={info.username} name='username' onChange={input}required/>
        <input type="password" value={info.password} name='password' onChange={input}required/>
        <button type='submit'>Loign</button>
      </form>
    </div>
  )
}
