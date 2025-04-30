"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import '../components/animations.css'; // Import the animations CSS file
import Opup from './opop';
import axios from 'axios';
function Background() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();
  const send = async () =>{
    const res = await axios.post("https://backen-swart.vercel.app/api/signin", {username: username, password: password})
    return res.data
  }
  const goToAbout = () => {
    if ((username && password !== "") && (username && password !== null)) {
      send().then((data) => {
        console.log(data.message);
        console.log(data);
        if (data.message === "ok") {
          localStorage.setItem("username", username);
          localStorage.setItem("username", password);
          localStorage.setItem("day", "");
          router.push("/about");
        } else {
          setError(data.why)
        }
      })
    }
    
  };
  const goTologin = () => {
    
    router.push("/");
  }

  useEffect(() => {
    if(localStorage.getItem("username") !== null && localStorage.getItem("password") !== null){
      router.push("/about");
    }
  }, []);
//<WavyBackground className="fixed inset-0 w-full h-full z-0 bg-cover bg-center"/>
  return (
    <div className="relative h-screen overflow-y-scroll overflow-hidden">
      <div className="grid relative max-w-7xl max-h-7xl-lg rounded-2xl">
          <div className="relative mt-8 w-full max-w-2xl bg-gradient-to-r text-white p-12 rounded-3xl-lg fade-in top-10">
            <h1 className="text-white text-4xl md:text-6xl font-bold fade-in">Sign up</h1>
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
              sign up
            </button>
            <button 
            onClick={goTologin}
            className="relative z-10 w-full p-8 max-w-3xl py-3 rounded-3xl text-white bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-700 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">Log in</button>
            <div>
            forgot password? <span className="text-blue-500 cursor-pointer" onClick={() => setShowPopup(true)}>click here</span>
          </div>
          </div>
          
          <div>
            {showPopup && <Opup onClose={() => setShowPopup(false)}/>}
          </div>
        </div>
        {/*<div className="fixed bottom-0 w-full px-4 py-3 text-gray-700 bg-white shadow-sm">*/}
        {/*  {error.map((err, index) => <p key={index}>{err}</p>)}*/}
        {/*  </div>*/}
        <div className="fixed bottom-0 w-full px-4 py-3 text-white bg-black-200 shadow-sm">
          {error.map((err, index) => <p key={index}>{err}</p>)}
        </div>
    </div>
  );
}

export default Background;
