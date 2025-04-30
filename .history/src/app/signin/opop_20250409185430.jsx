"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
function opoup({ onClose }) {
    const [fadeOut, setFadeOut] = useState(false);
    const [getusername, getsetUsername] = useState("");
    const handleClose = () => {
        setFadeOut(true);
        setTimeout(() => {
          onClose();
        }, 300);
      };
    const handleClick = async (username) => {
        const res = await axios.post("http://127.0.0.1:5000/api/returnusename", {
            username : username
        })
    }
  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 shadow-lg bg-gradient-to-r bg-opacity-10 backdrop-blur-lg transition-all duration-300 fadein ${fadeOut ? "opacity-0" : "opacity-100"} `}>
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-bold mb-4">enter Username</h2>
        <p className="mb-4">You clicked the button 🎉</p>
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
      </div>
    </div>
  )
}

export default opoup