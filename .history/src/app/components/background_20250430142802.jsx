"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './animations.css'; // Import the animations CSS file
import axios from 'axios';
function Background() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const goTosignin = () => {
    router.push("/signin");
  }
  const send = async () =>{
    console.log(username, password)
    
      const res = await axios.post("https://backen-swart.vercel.app/api/login", {username: username, password: password})
      return res.data
    
  }
  const goToAbout = () => {
    if ((username && password !== "") && (username && password !== null)) {
    send().then((data) => {
      
          console.log(data.message);
          if (data.message === "ok") {
            localStorage.setItem("username", username);
            localStorage.setItem("password", password);
            router.push("/about");
          } else {
            console.log(data.why)
            setError(data.why)
          }
        
    
    })}
  };

  useEffect(() => {
    if(localStorage.getItem("username") !== null && localStorage.getItem("password") !== null){
      router.push("/about");
    } else {
      alert("1. หลังจาก Sign Up ให้ Log Out แล้ว Log In ใหม่อีกครั้ง เพื่อความเสถียร\n2. Website จะช้าหน่อยเพราะใช้ Hosting ฟรี\n3.ให้กด update หรือ refresh ทุกครั้งเพื่อ update เเละโหลด data ที่เคยมี");

    }
  }, []);

  return (
    
    <div className="relative h-screen overflow-y-scroll overflow-hidden">
      <div className="grid relative max-w-7xl max-h-7xl-lg rounded-2xl">
          <div className="relative mt-8 w-full max-w-2xl bg-gradient-to-r text-white p-12 rounded-3xl-lg fade-in top-10">
            <h1 className="text-white text-4xl md:text-6xl font-bold fade-in">Log in</h1>
            <div className="relative w-full max-w-2xl bg-gradient-to-r text-white p-12 rounded-3xl-lg fade-in">
              <p className="relative z-10">username</p>
              <input
              onChange={(e) => setUsername(e.target.value)}
                className="relative z-10 w-full px-8 py-3 max-w-2xl rounded-3xl text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="text"
                placeholder="Username"
              />
            </div>
            <div className="relative w-full max-w-2xl bg-gradient-to-r text-white p-12 rounded-3xl-lg fade-in">
              <p className="relative z-10">password</p>
              <input
              onChange={(e) => setPassword(e.target.value)}
                className="relative z-10 w-full max-w-2xl px-8 py-3 rounded-3xl text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="password"
                placeholder="Password"
              />
            </div>
            <button
              onClick={goToAbout}
              className="relative z-10 w-full max-w-3xl py-3 rounded-3xl text-white bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-700 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              Log in
            </button>
            <button 
            onClick={goTosignin}
            className="relative z-10 w-full p-8 max-w-3xl py-3 rounded-3xl text-white bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-700 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">Sign up</button>
            
          </div>
          
          
        </div>
        <div className="fixed bottom-0 w-full px-4 py-3 text-white bg-black-200 shadow-sm">
          {error && <p>{error}</p>}
        </div>
        
    </div>
    
  );
}

export default Background;
