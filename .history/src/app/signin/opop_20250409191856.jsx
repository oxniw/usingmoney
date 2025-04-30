"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
function opoup({ onClose }) {
    const [fadeOut, setFadeOut] = useState(false);
    const [getusername, getsetUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleClose = () => {
        setFadeOut(true);
        setTimeout(() => {
          onClose();
        }, 300);
      };
    const handleClick = async () => {
        const res = await axios.post("http://127.0.0.1:5000/api/returnusename", {
            username : getusername
        })
        console.log(res.data);
    }
  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 shadow-lg bg-gradient-to-r bg-opacity-10 backdrop-blur-lg transition-all duration-300 fadein ${fadeOut ? "opacity-0" : "opacity-100"} `}>
      <div className="bg-white p-6 shadow-lg text-center flex gap-5 rounded-xl">
        <h2 className="text-xl font-bold mb-4">enter Username</h2>
        <input type="text" className="bg-blue-400 rounded-xl"
        onChange={(e) => getsetUsername(e.target.value)}/>
        <button
          onClick={handleClick}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          findpassword
        </button>
        <button
          onClick={handleClose }
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Close
        </button>
        <div>{getusername}</div>
      </div>
    </div>
  )
}

export default opoup