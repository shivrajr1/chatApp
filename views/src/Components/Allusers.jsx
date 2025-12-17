import axios from "axios";
import "./Alluser.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Allusers({ info }) {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
      return;
    }

    axios
      .get(`${import.meta.env.VITE_Server}/data/alluser`, {
        withCredentials: true,
      })
      .then((res) =>{ setUsers(res.data)})
      .catch(console.log);
  }, [navigate]);

  return (
    <div className="allusers-container">
      <h3 className="allusers-title">Users</h3>

      <div className="allusers-list">
        {users.map((user, idx) => (
          <div
            key={idx}
            className="user-item"
            onClick={() => info(user)}
          >
            <div className="user-avatar">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <span className="user-name">{user.username}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
