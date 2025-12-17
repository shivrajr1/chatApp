import React, { useState } from "react";
import Chat from "./Components/Chat";
import Allusers from "./Components/Allusers";
import "./Body.css";

export default function Body() {
  const [activeUser, setActiveUser] = useState(null);

  return (
    <div className="chat-app">
      <Allusers info={setActiveUser} />

      {activeUser ? (
        <Chat toUser={activeUser} />
      ) : (
        <div className="empty-chat">
          <p>Select a user to start chatting</p>
        </div>
      )}
    </div>
  );
}
