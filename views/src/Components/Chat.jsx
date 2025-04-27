import React, { useEffect, useState } from 'react'
import "./Chat.css"
import axios from 'axios';
import {io} from 'socket.io-client'
export default function Chat({toUser}) {

    const socket=io(`${import.meta.env.VITE_Server}`,{withCredentials:true})
    
    const [messages,setMessages]=useState([])
    const [message,setMessage]=useState("") 

    // let func=async()=>{
    //     await axios.get(`${import.meta.env.VITE_Server}/data/message`,{withCredentials:true})
    //     .then((res)=>{
    //         // setUsers(res.data.user)
    //         console.log(res)
    //     }).catch((err)=>{
    //         console.log(err)
    //     })
    //    }

    useEffect(()=>{
        // func()
        socket.on("message",(data)=>{
            console.log(data)
            // setMessages(data)
        })
        return ()=>{socket.off("message")}
    },[])
    const send=()=>{
        socket.emit("message",{"user":"a","toUser":toUser,"message":message})
        setMessage("");
    }
    // console.log(toUser)
    socket.on("error",(err)=>{console.log(err)})
  return (<>
    {toUser&&<div className="Chat_container">{toUser}
        {messages&&messages.map((element,idx)=>{
            <div className="message"key={idx}>{element}</div>
        })}
        <div className="chat_input">
        <input type="text" name='message'value={message} onChange={(e)=>{
            setMessage(e.target.value);
        }}/>
        <button onClick={send}>send</button>
        </div>
    </div>}</>
  )
}
