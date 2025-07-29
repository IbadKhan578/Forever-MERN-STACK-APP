import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets';
import { NavLink,Link,useNavigate } from 'react-router-dom';
import { shopContext } from '../context/ShopContext';

function Navbar() {
    const [visible,setVisible] = useState(false);
    const Navigate = useNavigate();
      let {setShowSearch,getCartCount,token,setToken,setCartItem} = useContext(shopContext);
      let navigate = useNavigate();
      const handleSearchClick=()=>{
        Navigate('/collection')
        setShowSearch(true);
      }

     let handleLogout =()=>{
    navigate('/login');
        setToken('')
        localStorage.removeItem('token');
        setCartItem({});
     } 

  return (
    <div className='flex items-center justify-between py-5 font-medium' >
        <img onClick={()=> Navigate('/') }src={assets.logo} className='w-36' alt="" />
        <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
            <NavLink to='/' className='flex flex-col items-center gap-1 '>
                <p>Home</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
            </NavLink>
            <NavLink to='/collection' className='flex flex-col items-center gap-1 '>
                <p>COLLECTION</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
            </NavLink>
            <NavLink to='/about' className='flex flex-col items-center gap-1 '>
                <p>ABOUT</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
            </NavLink>
            <NavLink to='/contact' className='flex flex-col items-center gap-1  '>
                <p>CONTACT</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
            </NavLink>


        </ul>

        <div className='flex items-center gap-6'>
            <img  onClick={ handleSearchClick } src={assets.search_icon} className='w-5 cursor-pointer' alt="" />
            <div className='group relative'>
            <img onClick={()=> token ? null : navigate('/login')}  src={assets.profile_icon} className='w-5 cursor-pointer' alt="" />
               {    
            token && (<div className='group-hover:block hidden absolute dropdown-menu z-1 right-0 pt-4'>
                    <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                        <p className='cursor-pointer hover:text-black'>My Profiles</p>
                        <p onClick={()=> navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                        <p  onClick={handleLogout} className='cursor-pointer hover:text-black'>Logout</p>
                    </div>


                </div>)
               }


            </div>
      <Link to='/cart' className='relative'>
      <img src={assets.cart_icon}  className='w-5 min-w-5 cursor-pointer' alt="" />
      <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square  rounded-full text-[8px] '>{getCartCount()}</p>
      </Link>
      <img  onClick={()=> setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden ' alt="" />
        </div>

        {/* sidebar menu for small screen */}
<div className={`absolute  h-screen z-50 top-0 bottom-0 right-0 overflow-hidden transition-all bg-white ${visible ? 'w-full' : 'w-0'}`}>
<div className='flex flex-col text-gray-600'>
    <div  onClick={()=>setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
        <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="" />
        <p>Back</p>

    </div>
  <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border'to='/'>HOME</NavLink>
  <NavLink onClick={()=>setVisible(false)}className='py-2 pl-6 border'to='/collection'>COLLECTION</NavLink>
  <NavLink onClick={()=>setVisible(false)}className='py-2 pl-6 border'to='/about'>ABOUT</NavLink>
  <NavLink onClick={()=>setVisible(false)}className='py-2 pl-6 border'to='/contact'>CONTACT</NavLink>

</div>

</div>



    </div>
  )
}

export default Navbar