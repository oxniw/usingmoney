"use client";
import React from 'react'
import { useRouter } from 'next/navigation';
function page() {
    const router = useRouter();
    const logout = () => {
        router.push("/about");
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
        </div>
        <div>
            
        </div>
        <div className='w-full flex items-center justify-center h-screen bg-black-200'>
            
        </div>
    </div>

  )
}

export default page