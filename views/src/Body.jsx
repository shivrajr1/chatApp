import React, { useState } from 'react'
import Chat from './Components/Chat'
import Allusers from './Components/Allusers'
import "./Body.css"

export default function Body() {
  const [toUser,setToUser]=useState('')
  let info=(toUser)=>{
    setToUser(toUser);
  }
  return (
    <div className='body'>
    <Allusers info={info}/>
    <Chat toUser={toUser}/>
    </div>
  )
}
