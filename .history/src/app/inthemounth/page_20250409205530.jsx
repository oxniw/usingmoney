"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

function Page() {
  const router = useRouter();
  const [storedPassword, setStoredPassword] = useState("");
  const [storedUsername, setStoredUsername] = useState("");
  const [date, setDate] = useState(1);
  const [year, setyear] = useState(1);
  const [day,setday] = useState([]);
  const de = async () => {
    const res = await axios.post("http://127.0.0.1:5000/api/pulldata", {
      username: localStorage.getItem("username"),
      password: localStorage.getItem("password"),
    });
    return res;
  };
  const getyear = async () => {
    const res = await axios.post("http://127.0.0.1:5000/api/pullyear", {
        username: localStorage.getItem("username"),
        password: localStorage.getItem("password"),
        year: year,
        mounth:date
    });
    return res;
  }
  const logout = () => {
    router.push("/about");
  };

  function check() {
    if (localStorage.getItem("username") === null && localStorage.getItem("password") === null) {
      router.push("/");
      return false;
    } else {
      setStoredPassword(localStorage.getItem("password"));
      setStoredUsername(localStorage.getItem("username"));
      return true;
    }
  }

  useEffect(() => {;
    if (check()) {
        de().then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      router.push("/");
    }
    
  }, []);
    useEffect(() => {
      getyear().then((data) => {
        console.log(data.data.d);
        setday(data.data.d.set);
      }).catch((error) => {
        console.error(error);
      })
    }, [date, year]);
  return (
    <div className="relative h-screen text-white">
      <div className="w-full relative top-0 left-0 p-4 bg-gray-500 text-white flex items-center space-x-4">
        <button
          onClick={logout}
          className="fixed right-0 p-4 bg-red-500 text-white rounded-3xl transition-transform duration-300 hover:scale-110"
        >
          back
        </button>
        <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
          <span className="text-xl">👤</span>
        </div>
        <span>{storedUsername}</span>
      </div>

      
      <div className="w-full grid grid-cols-8 gap-2 p-4 bg-gray-700 h-full max-h-96">
      {day.map((inboxusername, i) => (
                <div key={i}
                onClick={() => {
                  console.log(i + 1)
                  localStorage.setItem("day",i + 1)
                  localStorage.setItem("mounth",date)
                  localStorage.setItem("years",year + 2023)
                  router.push("/intheday")
                }}
                className="p-4 bg-stone-700 rounded w-full max-w-3xl transition-transform duration-300 hover:scale-110">
                    {inboxusername}
                </div>
            ))}
      </div>
      <div className="w-full relative top-0 left-0 p-4 bg-gray-500 text-white flex items-center justify-center space-x-4">
        
        <button
          onClick={() => {
            if (year > 1) {
                setyear(year - 1);
            }
          }}
          className="p-4 bg-red-500 text-white rounded-3xl transition-transform duration-300 hover:scale-110"
        >
          《《《
        </button>
        <button
          onClick={() => {
            if (date > 1) {
              setDate(date - 1);
            }
          }}
          className="p-4 bg-red-500 text-white rounded-3xl transition-transform duration-300 hover:scale-110"
        >
          Back
        </button>
        <span
        >{date}</span>
        <span>{year + 2023}</span>
        <button
          onClick={() => {
            setDate(date + 1);
            if (date > 11) {
                setDate(1);
            }
          }}
          className="p-4 bg-red-500 text-white rounded-3xl transition-transform duration-300 hover:scale-110"
        >
          Go
        </button>
        <button
          onClick={() => {
            setyear(year + 1);
            if (year > 1) {
                setyear(1);
            }
          }}
          className="p-4 bg-red-500 text-white rounded-3xl transition-transform duration-300 hover:scale-110"
        >
          》》》
        </button>
      </div>   
    </div>
  );
}

export default Page;
