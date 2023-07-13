import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css'
import { useGetUserID } from "../hooks/useGetUserID";

const Navbar = () => {
  const [cookie, setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const userID = useGetUserID();

  const [hover, setHover] = useState(false);

  const logoutHandle = (e) => {
    e.preventDefault();

    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  };

  const styleComp = {
    // color: hover ? "white" : "gold",
  };

  return (
    <div className="navbar">  
      <Link
        to="/"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={styleComp}
      >
        
        <span>Home</span>
      </Link>
      <Link
        to="/create-interview"
      >
        Create Interview
      </Link>
      {userID && <Link to="/saved-interviews">Saved Interviews</Link>}
      {!cookie.access_token ? (
        <Link to="/auth">Login/Register</Link>
      ) : (
        <button onClick={logoutHandle}>Logout</button>
      )}
    </div>
  );
};

export default Navbar;
