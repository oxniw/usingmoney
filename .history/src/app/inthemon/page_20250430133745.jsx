"use client";
import React,{useEffect,useState} from 'react'
import { useRouter } from "next/navigation";
import axios from "axios";
import PieChartCanvas from '../components/piechart';
import BarChart from "../components/barchart"
function Page() {
    const router = useRouter();
    
    const [storedUsername, setStoredUsername] = useState("");
    const [totalincome,settotalincome] = useState(0);
    const [totalexpense,settotalexpense] = useState(0);
    const [datas,setdata] = useState([]);
    const yearss = localStorage.getItem("years")
    const mounth  = localStorage.getItem("mounth")
    const [data, setData] = useState([]);
    const [labels, setLabels] = useState([]);
    const [percent, setpercent] = useState([])
    const logout = () => {
        router.push("/about");
      };
    function check() {
        if (localStorage.getItem("username") === null && localStorage.getItem("password") === null) {
          router.push("/");
          return false;
        } else {
          
          setStoredUsername(localStorage.getItem("username"));
          return true;
        }
      }
      const getdata = async (year,mounth,day) => {
        const res = await axios.post("https://backen-swart.vercel.app/api/pullmounth3", {
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
        <button className="w-full text-white bg-black-200 rounded-2xl transition-transform duration-300 hover:scale-110 " 
        onClick={getdata}>
        update
        </button>
        <div className="w-full max-w-96 bg-slate-600 rounded-xl flex justify-center items-center">
        <span>{localStorage.getItem("day")}/</span>
        <span>{localStorage.getItem("mounth")}/</span>
        <span>{localStorage.getItem("years")}</span>
        </div>
      </div>
      <div className="w-full bg-black h-full max-h-40 relative justify-center items-center flex">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
        Stat about ur money
        </h1>
      </div>
      <div className="w-full bg-white-200 h-full relative gap-5 p-5">
        <div className=" justify-center items-center flex w-full text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              Barchart and pie charts
          </div>
          <div className="w-full gap-2 flex justify-center items-center">
            <div className="w-full gap-2 flex overflow-x-auto max-w-xl bg-white rounded-xl transition-transform duration-300 hover:scale-105">
              <BarChart data={percent} labels={labels} cost={data} percent={percent} />
            </div>
          </div>
        <div className="w-full gap-2 flex justify-center items-center p-3">
        <PieChartCanvas 
          data={(totalincome - totalexpense < 0) 
            ? [1,0] 
            : [totalexpense, totalincome - totalexpense]} 
          colors={["#31313F", "#5D5D77"]} 
          className="relative"
        />
      
          <div className="w-full flex max-w-52 p-5 gap-5">
              <div className="w-full flex max-w-24 bg-slate-500 justify-center items-center rounded-xl max-h-24">
                  income
              </div>
              <div className="w-full flex max-w-24 bg-zinc-700 justify-center items-center rounded-xl max-h-24">
                  expense
              </div>
          </div>
        </div>

        <div className="w-full gap-2 flex p-5 relative justify-center items-center overflow-auto">
          <div className="w-full flex bg-slate-500 justify-top items-top rounded-xl">
            <h1 className="drop-shadow-[0_0_2px_black] text-2xl font-bold bg-white-100 text-transparent bg-clip-text gap-12 p-2">totalincome: {totalincome}</h1>
          </div>
          <div className="w-full flex bg-slate-500 justify-top items-top rounded-xl">
            <h1 className="drop-shadow-[0_0_2px_black] text-2xl font-bold bg-white-100 from-red-500 via-purple-500 to-blue-500 text-transparent bg-clip-text gap-12 p-2">totalexpense: {totalexpense}</h1>
          </div>
          
          <div className="w-full flex bg-slate-500 justify-top items-top rounded-xl">
            <h1 className="drop-shadow-[0_0_2px_black] text-2xl font-bold bg-white-100 from-cyan-500 to-blue-500 text-transparent bg-clip-text gap-12 p-2">balance: {totalincome - totalexpense}</h1>
          </div>

          <div className="w-full flex bg-slate-500 justify-top items-top rounded-xl">
            <h1 className="drop-shadow-[0_0_2px_black] text-2xl font-bold bg-white-100 from-cyan-500 to-blue-500 text-transparent bg-clip-text gap-12 p-2">balance percent: {(totalexpense === 0) ? 0 : ((totalincome - totalexpense)/totalincome)*100} %</h1>
          </div>

          <div className="w-full flex bg-slate-500 justify-top items-top rounded-xl">
            <h1 className="drop-shadow-[0_0_2px_black] text-2xl font-bold bg-white-100 from-cyan-500 to-blue-500 text-transparent bg-clip-text gap-12 p-2">expense percent: {(totalincome === 0) ? 0 : 100*totalexpense/totalincome} %</h1>
          </div>
        </div>
        
      </div>
      <div className="w-full bg-black h-full max-h-40 relative justify-center items-center flex">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
        data about uses
        </h1>
      </div>
      <div className="w-full bg-white-200 h-full relative gap-5 p-5 flex overflow-auto">{Object.entries(datas).map(([key, value]) => (
            <div key={key} className="w-full ">
              <h3 className="drop-shadow-[0_0_2px_black] text-2xl font-bold bg-white-100 from-cyan-500 to-blue-500 text-transparent bg-clip-text gap-12 p-2">{key.split(",")[0]} / {mounth} / {yearss}</h3>
              <ul className="gap-5 flex flex-wrap flex-row">
                {value.map((item, idx) => (
                  <div className="bg-black-200  w-full h-full max-h-52 rounded-2xl bg-slate-950 text-white gap-10 p-4 relative transition-transform duration-300 hover:scale-110"
                  key={idx}
                  >
                    <div>{(item.name)}
                    </div>
                    <div className='flex justify-between items-center'>
                      <span className="text-green-600">{(item.income)}</span><span className="text-red-600">{(item.expense)}</span>
                    </div>
                  
                  </div>
                ))}
              </ul>
            </div>
  ))}</div>
    </div>
  )
}

export default Page