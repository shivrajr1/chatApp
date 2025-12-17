import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [info, setInfo] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_Server}/user/login`,
        info,
        { withCredentials: true }
      );
      localStorage.setItem("user", res.data.id);
      console.log(res.data)
      console.log(localStorage.getItem('user'))
      navigate("/");
    } catch (err) {
      console.error(err);
      localStorage.removeItem("user");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>

      <form className="login-form" onSubmit={login}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={info.username}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={info.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
