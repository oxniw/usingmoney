"use client";
import React,{useEffect,useState} from 'react'
import { useRouter } from "next/navigation";
import axios from "axios";
import PieChartCanvas from '../components/piechart';
import BarChart from "../components/barchart"
import Clicking from "../components/clicking.module.css";
function page() {
    const router = useRouter();
    const [storedPassword, setStoredPassword] = useState("");
    const [storedUsername, setStoredUsername] = useState("");
    const [totalincome,settotalincome] = useState(0);
    const [totalexpense,settotalexpense] = useState(0);
    const [totalexpenseinyear, settotalexpenseinyear] = useState(0);
    const [totalincomeinyear, settotalincomeinyear] = useState(0);
    const [datas,setdata] = useState([]);
    const [yearss ,setyears] = useState(localStorage.getItem("years"));
    const [mounth ,setmounth] = useState(localStorage.getItem("mounth"));
    const [data, setData] = useState([]);
    const [labels, setLabels] = useState([]);
    const [percent, setpercent] = useState([])
    const [clicked, setClicked] = useState(false);
    const [prices, setprice] = useState(0)
    const [goalname, setgoalname] = useState("")
    const [report , setreport] = useState([]);
    const [priceandgoalname, setpriceandgoalname] = useState([])
    const [totalbalance, settotalbalance] = useState(0)
    const add = async () => {
      if (prices && goalname !== "") {
        try {
          if (!isNaN(parseFloat(prices))) {
            const res = await axios.post("http://localhost:5000/api/add", {
              username: localStorage.getItem("username"),
              password: localStorage.getItem("password"),
              goalname: goalname,
              price : prices
            })
            setprice(0)
            setgoalname("")
            setreport([]);
            //setpriceandgoalname(res.data.data.goal)
            setpriceandgoalname(res.data.goal.goal)
            settotalexpenseinyear(res.data.totalbalance)
            settotalincomeinyear(res.data.totalincome)
          } else {
            setreport(["Please enter valid numbers for income and expense"]);
          }
        } catch (e) {
          setreport(["Error updating data. Please try again."]);
        }
      } else {
        setreport(["Fields cannot be empty"]);
      }
    };
    const handleClick = () => {
        setClicked(true);
        getdata()
        setTimeout(() => {
          setClicked(false);
        }, 100);
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
      const getdata = async () => {
        const res = await axios.post("http://localhost:5000/api/pullmounth3", {
          username: localStorage.getItem("username"),
          password: localStorage.getItem("password"),
          year: localStorage.getItem("years"),
          mounth: localStorage.getItem("mounth"),
          day: localStorage.getItem("day")
        })
        setdata(res.data.data.datastore)
        settotalincome(res.data.data.totalincome)
        settotalexpense(res.data.data.totalexpense)
        setData(res.data.data.expense)
        setLabels(res.data.data.name)
        setpercent(res.data.data.percent) 
        setpriceandgoalname(res.data.data.goal.goal)
        //console.log(res.data.data.goal.goal)
        settotalbalance(res.data.data.totalbalance)
        settotalexpenseinyear(res.data.data.totalexpenseinyear)
        settotalincomeinyear(res.data.data.totalincomeinyear)
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
        {/*
        <button 
        className={`w-full text-white bg-black-200 rounded-2xl ${clicked ? Clicking.clicked : ''}`}
        onClick={handleClick}>
        refresh
        </button>
        */}
        
        <button 
        className={`w-full text-white bg-black-200 rounded-2xl`}
        onClick={handleClick}>
        refresh
        </button>
      </div>
      <div className="w-full h-screen bg-white-200 relative">
        <div className="w-full h-10 bg-red-500 text-white flex justify-center items-center">
            กรอกชื่อที่ซ้ำกับชื่อเดิมเพื่อเเก้ไขข้อมูล
        </div>
        <div className="w-full h-xl flex justify-center items-center gap-10 p-4 ">
          <span className="font-bold w-full">goal name : <input type="text" name="goal name" id="goal name" className="rounded-xl text-black w-full" onChange={(e) => {setgoalname(e.target.value)}} value={goalname}/> </span>
          <span className="font-bold w-full">price : <input type="text" name="price" id="price" className="rounded-xl text-black w-full" onChange={(e) => {setprice(e.target.value)} } value={prices}/></span>
          <button className="w-full max-w-xl rounded-xl text-white  h-full bg-black-100"
          onClick={add}
          >add</button>
        </div>
          {report.map((item, index) => (
              <div key={index} className="w-full h-10 bg-red-500 text-white flex justify-center items-center">
                {item}
              </div>
            ))}
        <div className='w-full h-40 relative flex justify-center items-center gap-10 bg-white'>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              your goal
            </h1>
        </div>
        <div className='w-full h-16 relative flex justify-center items-center gap-10 bg-white'>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              totalbalance : {totalbalance}
            </h1>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              totalincome : {totalincomeinyear}
            </h1>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              totalexpense : {totalexpenseinyear}
            </h1>
        </div>
        <div className='w-full h-24 relative grid grid-cols-3 gap-10 bg-black justify-center items-center p-7'>
          <div className='rounded-lg w-full h-full relative flex justify-center items-center gap-10 bg-white'>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              name
            </h1>
          </div>
            
          <div className='w-full h-full relative flex justify-center items-center gap-10 bg-white'>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              goal
            </h1>
          </div>
          <div className='w-full h-full relative flex justify-center items-center gap-10 bg-white'>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              goal percent
            </h1>
          </div>
        </div>

        <div className="w-full bg-black-100 h-full relative gap-5 p-5 overflow-auto">
          
          <div className='w-full h-screen relative'>
            
            {Object.entries(priceandgoalname).map(([key, value]) => (
            <div key={key} className="w-full justify-center items-center h-10 p-3 bg-slate-400 grid grid-cols-3 rounded-xl">
              <h1 className='text-2xl font-bold bg-gradient-to-r bg-clip-text'>
                {key}
              </h1>
              <h1>
                {value}
              </h1>
              <h1>
                {String((totalbalance/value * 100).toFixed(2))} %
              </h1>
            </div>
          ))}</div>
          
        </div>
          
        
        
        
      </div>
      
    </div>
  )
}

export default page