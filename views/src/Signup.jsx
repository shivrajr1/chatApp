import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

export default function Signup() {
  const navigate = useNavigate();

  const [info, setInfo] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  const signup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_Server}/user/register`,
        info,
        { withCredentials: true }
      );

        localStorage.setItem("user", res.data);
        navigate("/");

    } catch (err) {
      console.error(err);
      localStorage.removeItem("user");
    }
  };

  return (
    <div className="signup-container">
      <h1>Create Account</h1>

      <form className="signup-form" onSubmit={signup}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={info.username}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={info.email}
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

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
