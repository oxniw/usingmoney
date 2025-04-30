"use client";
import React,{useEffect,useState} from 'react'
import { useRouter } from "next/navigation";
import axios from "axios";
import PieChartCanvas from '../components/piechart';
import BarChart from "../components/barchart"
import Clicking from "./clicking.css";
function page() {
    const router = useRouter();
    const [storedPassword, setStoredPassword] = useState("");
    const [storedUsername, setStoredUsername] = useState("");
    const [totalincome,settotalincome] = useState(0);
    const [totalexpense,settotalexpense] = useState(0);
    const [datas,setdata] = useState([]);
    const [yearss ,setyears] = useState(localStorage.getItem("years"));
    const [mounth ,setmounth] = useState(localStorage.getItem("mounth"));
    const [data, setData] = useState([]);
    const [labels, setLabels] = useState([]);
    const [percent, setpercent] = useState([])
    const [clicked, setClicked] = useState(false);
    const handleClick = () => {
        setClicked(true);
        setTimeout(() => {
          setClicked(false);
        }, 1000); // Reset clicked state after 1 second
      };
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
      const getdata = async (year,mounth,day) => {
        const res = await axios.post("http://localhost:5000/api/pullmounth3", {
          username: localStorage.getItem("username"),
          password: localStorage.getItem("password"),
          year: localStorage.getItem("years"),
          mounth: localStorage.getItem("mounth"),
          day: localStorage.getItem("day")
        })
        //console.log(res.data.data.datastore)
        console.log(res)
        //console.log(res.data.data.expense)
        //console.log(res.data.data.percent)
        setdata(res.data.data.datastore)
        settotalincome(res.data.data.totalincome)
        settotalexpense(res.data.data.totalexpense)
        setData(res.data.data.expense)
        setLabels(res.data.data.name)
        setpercent(res.data.data.percent) 
      }
      
      
      
      useEffect(() => {
        if (check()) {
          console.log("check")
        } else {
            router.push("/");
        }
      },)
  return (
    <div className="relative h-screen bg-black">
      <div className="w-full relative top-0 left-0 p-4 bg-gray-500 text-white flex items-center space-x-4">
        <button
        onClick={logout}
        className="relative right-0 p-4 bg-red-500 text-white rounded-3xl transition-transform duration-300 hover:scale-110"
        >
        back
        </button>
        <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
        <span className="text-xl">👤</span>
        </div>
        <span>{storedUsername}</span>
      </div>
      <div className="w-full justify-center items-center flex h-full max-h-24 p-5 gap-10">
        <button 
        className={`w-full text-white bg-black-200 rounded-2xl transition-transform duration-300 hover:scale-110 ${clicked ? Clicking.clicked : ''}`}
        onClick={getdata}>
        refresh
        </button>
      </div>

    </div>
  )
}

export default page