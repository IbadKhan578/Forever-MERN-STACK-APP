import React from 'react'
import { assets } from '../assets/assets'
import { Navigate, useNavigate } from 'react-router-dom'

function Footer() {
    const Navigate = useNavigate()
  return (
    <div className=' flex flex-col sm:flex-row justify-between gap-14 mt-20 sm:mt-30'>
        <div className=' '>
            <img onClick={()=> Navigate('/')}className='w-36 cursor-pointer' src={assets.logo} alt="" />
            <p className=' max-w-md flex-1  text-xs sm:text-sm mt-3 sm:mt-4 text-gray-600'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>
        </div>

        <div>
            <p className='text-gray-900 font-medium  text-[20px]'>COMPANY</p>
            <div className=' mt-3 sm:mt-4 flex flex-col text-gray-500 '>
                <a className='text-[14px] cursor-pointer sm:text-base'href="#">Home</a>
                <a className='text-[14px] cursor-pointer sm:text-base'onClick={()=>Navigate('/about')}>About us</a> 
                <a className='text-[14px] cursor-pointer sm:text-base'href="">delivery</a>
                <a className='text-[14px] cursor-pointer sm:text-base'href="">Privacy</a>
  
            </div>

        </div>
        <div>
            <p className='text-gray-900   font-medium  text-[20px]'>GET IN TOUCH</p>
            <div className='flex flex-col  mt-3 sm:mt-4 text-gray-500'>
            <a className='text-[14px] sm:text-base' href="#">+92 3136370 275</a>
            <a className='text-[14px] sm:text-base' href="#">ibadkhansherani@gmail.com</a>
            <a className='text-[14px] sm:text-base' href="#">Instagram</a>
            </div>
        </div>


    </div>
  )
}

export default Footer