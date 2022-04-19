import React from "react";
import "./index.css";

export const Header = ({ userInfo }) => {
  return (
    <div className="header">
      <div className="logo">
        <h1>Rettiwt</h1>
      </div>
      <div className="links">
        <button>Home</button>
        <button>Rettiwt Docs</button>
        <a href="https://github.com/Khabspotter/" target="_blank">
          <button>GitHub</button>
        </a>
      </div>
      <div style={{ lineHeight: "0%", cursor:'pointer'}}>
        <p style={{ color: "blue", fontWeight: "600", fontSize:'18px'}}>{userInfo.name}</p>
        <p style={{color:'grey'}}>{userInfo.email}</p>
        <p>{userInfo.about}</p>
      </div>
    </div>
  );
};
