import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("user");

  const logout = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_Server}/user/logout`,
        { withCredentials: true }
      );

      localStorage.removeItem("user");
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="nav-container">
      <NavLink to="/" className="nav-logo">
        ChatApp
      </NavLink>

      <div className="nav-links">
        {!isLoggedIn ? (
          <>
            <NavLink to="/register" className="navlink">
              Register
            </NavLink>
            <NavLink to="/login" className="navlink">
              Login
            </NavLink>
          </>
        ) : (
          <button className="navlink logout-btn" onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
