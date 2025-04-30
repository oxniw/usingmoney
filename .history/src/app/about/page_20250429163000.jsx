"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
function Page() {
  const router = useRouter();
    const [storedPassword,setstoredPassword] = useState("");
    const [storedUsername,setstoredUsername] = useState("");
  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    localStorage.removeItem("day");
    localStorage.removeItem("mounth");
    localStorage.removeItem("years");
    router.push("/");
  };
  const de = async () => {
    const res = await axios.post("http://127.0.0.1:5000/api/pulldata",
        { username: localStorage.getItem("username") , password: localStorage.getItem("password")}
    );
    return res;
  }
  const date = () => {
    router.push("/date");
  }
  const inthemounth =() => {
    router.push("/datemon");
  }
  const dashboard = () => {
    router.push("/dashboard");
  }
  useEffect(() => {
    
    if (localStorage.getItem("username") === null && localStorage.getItem("password") === null) {
      router.push("/");
    } else {
        setstoredPassword(localStorage.getItem("password"));
        setstoredUsername(localStorage.getItem("username"));
        de().then((data) => {
          console.log(data);
        }).catch((error) => {
          console.error(error);
        });
    }
    

  }, []);

  return (
    <div className="relative h-screen">
      
      <div className="w-full relative top-0 left-0 p-4 bg-gray-500 text-white flex items-center space-x-4">
      <button
        onClick={logout}
        className="fixed right-0 p-4 bg-red-500 text-white rounded-3xl transition-transform duration-300 hover:scale-110">
        Logout
      </button>
        <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
          <span className="text-xl">👤</span>
          
        </div>
        <span>{storedUsername}</span>
      </div>
      <div className="w-full h-screen gap-5 rounded-lg grid overflow-y-auto bg-black grid-cols-3">
        <div className="w-full max-w-96 h-full max-h-52 rounded-2xl bg-slate-950 text-white gap-4 p-4 relative grid transition-transform duration-300 hover:scale-110"
        onClick={date}>
          <p className="justify-center items-center flex">ปติทินวัน</p>
          <div className="w-full max-w-96 h-full max-h-24 rounded-2xl bg-white-100 text-white flex gap-4 p-2 bottom-0"style={{ backgroundImage: "url('/72eececbd6184e81f4bca6c57213e0d8.jpg')" }}></div>

        </div>
        <div className="w-full max-w-96 h-full max-h-52 rounded-2xl bg-slate-950 text-white gap-4 p-4 relative grid transition-transform duration-300 hover:scale-110"
        onClick={inthemounth}>
          <p className="justify-center items-center flex">ปติทินเดือน</p>
          <div className="w-full max-w-96 h-full max-h-24 rounded-2xl bg-white-100 text-white flex gap-4 p-2 bottom-0"style={{ backgroundImage: "url('/72eececbd6184e81f4bca6c57213e0d8.jpg')" }}></div>

        </div>
        <div className="w-full max-w-96 h-full max-h-52 rounded-2xl bg-slate-950 text-white gap-4 p-4 relative grid transition-transform duration-300 hover:scale-110"
        onClick={dashboard}>
          <p className="justify-center items-center flex">เป้าหมายของฉัน</p>
          <div className="w-full max-w-96 h-full max-h-24 rounded-2xl bg-white-100 text-white flex gap-4 p-2 bottom-0"style={{ backgroundImage: "url('/72eececbd6184e81f4bca6c57213e0d8.jpg')" }}></div>

        </div>
      
      </div>
      {/*<div className="scrollbar-hide h-full max-w-28 gap-5 bg-gray-600 rounded-lg grid overflow-y-auto">*/}
      {/*  <p>This is a private page</p>*/}
    </div>
  );
}

export default Page;