import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import axios from "axios";
import { io } from "socket.io-client";

export default function Chat({ toUser }) {
  const user=localStorage.getItem('user')
  const socketRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socketRef.current = io(import.meta.env.VITE_Server, {
      withCredentials: true,
    });
    axios
      .post(`${import.meta.env.VITE_Server}/data/message`,{withUser:toUser.id}, {
        withCredentials: true,
      })
      .then((res) => {
        setMessages(res.data || []);
      })
      .catch(console.log);

    socketRef.current.on("message", (data) => {
      setMessages(prev => {
        if (prev.some(msg => msg.id === data.tempId)) return prev; 
        return [...prev, data];
      });
    });

    socketRef.current.on("error", console.log);

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const send = () => {
    if (!message.trim()) return;
    const tempId = Date.now(); 
    const newMessage = { id: tempId, message, sender_id: user };
    setMessages(prev => [...prev, newMessage]);

    socketRef.current.emit("message", { toUser: toUser.username, message, tempId });

    setMessage("");
  };

  return (
    <>
      {toUser && (
        <div className="chat-container">
          <div className="chat-header">
            Chat with <span>{toUser.username}</span>
          </div>

          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chat-message ${
                  msg.sender_id == user ? "sent" : "received"
                }`}
              >
                {msg.message ?? msg}
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
            />
            <button onClick={send}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}
