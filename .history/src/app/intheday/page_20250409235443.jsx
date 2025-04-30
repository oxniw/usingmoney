"use client";
import React,{useEffect,useState} from 'react'
import { useRouter } from "next/navigation";
import axios from "axios";
import PieChartCanvas from '../components/piechart';
import BarChart from "../components/barchart"
function page() {
    const router = useRouter();
    const [storedPassword, setStoredPassword] = useState("");
    const [storedUsername, setStoredUsername] = useState("");
    const [year,setyear] = useState("");
    const [day,setday] = useState("");
    const [month,setmounth] = useState("");
    const [income,setincome] = useState("");
    const [expense,setexpense] = useState("");
    const [balance,setbalance] = useState("");
    const [totalincome,settotalincome] = useState("");
    const [totalexpense,settotalexpense] = useState("");
    const [name,setname] = useState("");
    const [report , setreport] = useState([]);
    const [datas,setdata] = useState([]);
    const [description,setdescription] = useState("")
    const [data, setData] = useState([]);
    const [labels, setLabels] = useState([]);
    const [percent, setpercent] = useState([])
    
    const movedata = async (index,move) => {
      const res = await axios.post("http://localhost:5000/api/moveposition", {
        username: localStorage.getItem("username"),
        password: localStorage.getItem("password"),
        year:localStorage.getItem("years"),
        mounth: localStorage.getItem("mounth"),
        day: localStorage.getItem("day"),
        position:index,
        moveto:move
      })
      setdata(res.data.data.data)
    }
    const dele = async (position) =>{
      const res = await axios.post("http://localhost:5000/api/deletedata", {
        username: localStorage.getItem("username"),
        password: localStorage.getItem("password"),
        year:localStorage.getItem("years"),
        mounth: localStorage.getItem("mounth"),
        day: localStorage.getItem("day"),
        position:position
      })
      setdata(res.data.data.data)
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
      const getdata = async (year,mounth,day) => {
        const res = await axios.post("http://localhost:5000/api/getdata", {
          username: localStorage.getItem("username"),
          password: localStorage.getItem("password"),
          year: localStorage.getItem("years"),
          mounth: localStorage.getItem("mounth"),
          day: localStorage.getItem("day")
        })
        setdata(res.data.data.data)
        settotalincome(res.data.totalincome)
        settotalexpense(res.data.totalexpense)
        const res1 = await axios.post("http://localhost:5000/api/getcost", {
          username: localStorage.getItem("username"),
          password: localStorage.getItem("password"),
          year: localStorage.getItem("years"),
          mounth: localStorage.getItem("mounth"),
          day: localStorage.getItem("day")
        })
        console.log(res1.data.data.name)
        console.log(res1.data.data.data)
        console.log(res1.data.data.percent)
        setLabels(res1.data.data.name)
        setData(res1.data.data.cost)
        setpercent(res1.data.data.percent)
      }
      
      
      const update = async () => {
        if (income && expense && name !== "") {
          try {
            if (!isNaN(parseFloat(expense)) && !isNaN(parseFloat(income))) {
              const res = await axios.post("http://localhost:5000/api/updatedata", {
                username: localStorage.getItem("username"),
                password: localStorage.getItem("password"),
                income: parseFloat(income),
                expense: parseFloat(expense),
                name: name,
                year: year,
                mounth: month,
                day: day,
                description: description
              });
              
              setincome("");
              setexpense("");
              setname("");
              setdescription("")
              setreport([]);
              setdata(res.data.data.data)
              settotalincome(res.data.totalincome)
              settotalexpense(res.data.totalexpense)
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
      useEffect(() => {
        if (check()) {
          setyear(localStorage.getItem("years"));
          setmounth(localStorage.getItem("mounth"));
          setday(localStorage.getItem("day"));
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
        refresh
        </button>
        <div className="w-full max-w-96 bg-slate-600 rounded-xl flex justify-center items-center">
        <span>{localStorage.getItem("day")}/</span>
        <span>{localStorage.getItem("mounth")}/</span>
        <span>{localStorage.getItem("years")}</span>
        </div>
      </div>
      <div className="w-full bg-black max-w-7xl h-full max-h-40 relative justify-center items-center flex">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
        Stat about ur money
        </h1>
      </div>
      <div className="w-full bg-white-200 h-full relative grid grid-rows-3 gap-5 p-5">
        <div className="w-full gap-2 flex">
        
        <div className="w-full gap-2 flex overflow-x-auto max-w-xl bg-white rounded-xl transition-transform duration-300 hover:scale-105">
        
        <BarChart data={percent} labels={labels} cost={data} percent={percent} />

        </div>
        <div className=" justify-center items-center flex w-full text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              Barchart and pie charts
          </div>
        </div>
          
        <div className="w-full gap-2 flex">
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
        <div className="w-full gap-2 flex max-w-52 p-5 relative">
            <h1 className="drop-shadow-[0_0_2px_black] text-2xl font-bold bg-white-100 text-transparent bg-clip-text">totalincome {totalincome}</h1>
            <h1 className="drop-shadow-[0_0_2px_black] text-2xl font-bold bg-white-100 from-red-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">totalexpense {totalexpense}</h1>
            <h1 className="drop-shadow-[0_0_2px_black] text-2xl font-bold bg-white-100 from-cyan-500 to-blue-500 text-transparent bg-clip-text">balance {totalincome - totalexpense}</h1>
        </div>
        
      </div>
      <div className="w-full bg-black max-w-7xl h-full max-h-40 relative justify-center items-center flex">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
        Income and expense ledger
        </h1>
      </div>
      <div className="w-full h-full overflow-x-auto">
        <div className="w-full gap-1 grid-cols-8 grid">
        <div className=" w-full max-w-36 text-white">
        name
        <input 
        type="text"
        value={name}
        onChange={(e) => setname(e.target.value)}
        className="w-full max-w-36 transition-transform duration-300 hover:scale-110 rounded-2xl text-black bg-slate-500"/>
        </div>
        <div className=" w-full max-w-36 text-white">
        expense
        <input 
        type="text"
        value={expense}
        onChange={(e) => setexpense(e.target.value)}
        className="w-full max-w-36 rounded-2xl text-black bg-slate-500 transition-transform duration-300 hover:scale-110"/>
        </div>
        <div 
        className=" w-full max-w-36 text-white">
        income
        <input
        value={income}
        type="text"
        onChange={(e) => setincome(e.target.value)}
        className="w-full max-w-36 rounded-2xl text-black bg-slate-500 transition-transform duration-300 hover:scale-110"/>
        </div>
        <div 
        className=" w-full max-w-36 text-white">
        description
        <input
        value={description}
        type="text"
        onChange={(e) => setdescription(e.target.value)}
        className="w-full max-w-36 rounded-2xl text-black bg-slate-500 transition-transform duration-300 hover:scale-110"/>
        </div>
        <div className="w-full max-w-36 rounded-2xl transition-transform duration-300 hover:scale-110 items-center justify-center p-1">
        <button className="text-white w-full bg-black-200 rounded-2xl transition-transform duration-300 hover:scale-110 h-full" 
        onClick={update}>
        add
        </button>
        </div>
      </div>
      <div className="relative w-full px-4 py-3 text-white shadow-sm justify-center items-center flex">
          {report.map((err, index) => <p key={index}>{err}</p>)}
        </div>
        <div className="grid grid-cols-6">
          <div className=" relative w-full px-4 py-3 bg-black-300 text-white shadow-sm gap-12 overflow-x-auto">
          <p>name</p>
          {datas.map((items, index) => <p key={index}>{items.name}</p> )}
          </div>
          <div className=" relative w-full px-4 py-3 bg-black-200 text-white shadow-sm gap-12 overflow-x-auto">
          <p>income</p>
          {datas.map((items, index) => <p key={index}>{items.income}</p> )}
          </div>
          <div className=" relative w-full px-4 py-3 bg-black-300 text-white shadow-sm gap-12 overflow-x-auto">
          <p>expense</p>
          {datas.map((items, index) => <p key={index}>{items.expense}</p> )}
          </div>
          <div className=" relative w-full px-4 py-3 bg-black-200 text-white shadow-sm gap-12 overflow-x-auto">
          <p>description</p>
          {datas.map((items, index) => <p key={index} >{items.description}</p> )}
          </div>
          <div className=" relative w-full px-4 py-3 bg-black-300 text-white shadow-sm gap-12  overflow-x-auto">
          <p>delete</p>
          {datas.map((items, index) => (
          <div
          key={index}
          onClick={() => dele(index)}
          className="transition-transform duration-300 hover:scale-110 bg-slate-600 rounded-2xl justify-center items-center flex">
          {index}
          </div>
          ))}
          </div>
          <div className="relative w-full px-4 py-3 bg-black-300 text-white shadow-sm gap-12 ">
          <p>move</p>
          {datas.map((items, index) => (
          <div key={index} className="grid grid-cols-2 w-full  gap-2">
          <div className="bg-white-200 justify-center items-center flex rounded-xl transition-transform duration-300 hover:scale-110"
          onClick={() => movedata(index,index-1)}
          >↑</div>
          <div className="bg-white-200 justify-center items-center flex rounded-xl transition-transform duration-300 hover:scale-110"
          onClick={() => movedata(index,index+1)}
          >↓</div>
          </div>
          ))}
          </div>
        </div>
      </div>
      
      
    </div>
  )
}

export default page