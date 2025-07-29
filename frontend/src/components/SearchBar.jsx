import React, { useContext, useEffect, useState } from 'react'
import { shopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

function SearchBar() {
    let {search ,setSearch ,showSearch,setShowSearch} = useContext(shopContext);
    let [visible,setVisible] = useState(false);
    let location = useLocation();
    useEffect(()=>{
        if(location.pathname.includes('collection')&& showSearch){
            setVisible(true)
        }else{
            setVisible(false);
        }
      
    },[location])
  


  return showSearch && visible ?  (
    <div className='   my-2 bg-gray-50 border-t border-b border-gray-300  text-center  py-5 '>
        <div className='  w-3/4 px-5  py-2 sm:w-1/2  mx-3  inline-flex  justify-center items-center  border border-gray-400  rounded-full'>
            <input value={search} onChange={(e)=>setSearch(e.target.value)} className='flex-1 outline-none text-left ' type="text" placeholder='Search'/>
            <img  className='h-4 sm:h5' src={assets.search_icon} alt="" />
        </div>
        <img onClick={()=>setShowSearch(false)} className='inline-flex w-3 cursor-pointer  ' src={assets.cross_icon } alt="" />
        
          </div>
  ):null;
}

export default SearchBar