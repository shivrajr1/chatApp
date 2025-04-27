import React, { useState } from 'react'
import axios from 'axios'
export default function Signup() {
  const [info,setInfo]=useState({
    username:"",
    email:"",
    number:"",
    role:"Student",
    password:""
  })
  const signup=async(e)=>{
    e.preventDefault();console.log(info)
    // console.log(import.meta.env.VITE_Server)
    await axios.post(`${import.meta.env.VITE_Server}/user/register`,info,{withCredentials:true})
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
    <div className="SignUp_container">
      <h1>Register</h1>
      <form onSubmit={signup}>
        <input type="username" name='username'value={info.username}onChange={input}required/>
        <input type="email" name='email'value={info.email}onChange={input}required/>
        <input type="number" name='number' value={info.number} onChange={input}required/>
        <select name="role" onChange={input}>
        <option value="role"disabled >Role</option>
          <option value="Student"defaultValue={"Student"} >Student</option>
          <option value="Teacher">Teacher</option>
          <option value="Institute">Institute</option>
          </select>
        <input type="password" name='password'value={info.password}onChange={input}required/>
        <button type='submit'>Signup</button>
      </form>
    </div>
  )
}
