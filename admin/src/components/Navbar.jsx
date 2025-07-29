import React from 'react'
import {assets} from '../assets/assets.js'
function Navbar({setToken}) {
 
  const handleLogout =()=>{
   localStorage.removeItem('token');
   setToken('');

  }


  return (
    <div className=' px-[4%] py-2 flex item-center  justify-between'>
        <img className='w-[max(10%,80px)]' src={assets.logo} alt="" />
        <button onClick={handleLogout}   className='bg-gray-500  cursor-pointer  px-5 py-2 sm:px-7 sm:py-2 rounded-full text-white text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar