import React, { useContext, useEffect, useState } from 'react'
import  { shopContext } from '../context/ShopContext'
import SectionTitle from '../components/SectionTitle';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  let {products,currency,cartItem,updateCartQuantity} = useContext(shopContext);
  const [cartData,setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    if(products.length > 0){
      let tempData= [];
    for(let items in cartItem){
      for(let item in cartItem[items]){
        if(cartItem[items][item]>0){
          tempData.push({
            id:items,
            size: item,
            quantity:cartItem[items][item] 
          })
        }
      }
    }
        setCartData(tempData);

    }
    console.log(cartData);

  },[cartItem,products])

  





  return (
    <div className=' border-t border-gray-200 pt-14'>
      <div className='text-2xl mb-3'>
        <SectionTitle text1={'YOUR'} text2={'CART'} />
      </div>
      <div className=''>

        {
          cartData.map((item,index)=>{
            const ProductData = products.find((product)=> product._id===item.id);
            return(
              <div key={index} className='py-4 border-b border-t border-gray-200 text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 ' >
              <div className='flex items-start gap-6'>
                <img className='w-16 sm:w-20' src={ProductData.image[0]} alt="" />
                <div>
                  <p className='text-xs sm:text-lg font-medium '>{ProductData.name}</p>
                  <div className='flex items-center gap-4 mt-2'>
                    <p>{currency}{ProductData.price}</p>
                    <p className='border border-gray-200  sm:py-1 bg-slate-50 px-2 sm:px-3'>{item.size}</p>
                  </div>
                </div>
              </div>
              <input onChange={(e)=> e.target.value==='' || e.target.value==='0'? null : updateCartQuantity(item.id,item.size,Number(e.target.value)) } className='border border-gray-200 max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type="number" min={1} defaultValue={item.quantity} />
              <img onClick={()=>updateCartQuantity(item.id,item.size,0)} className='w-4 sm:w-5 mr-4 cursor-pointer' src={assets.bin_icon} alt="" />
              </div>
            )

          })

        }

      </div>

<div className='flex justify-end my-20 mb-80'>
   <div className='w-full sm:w-[450px]'>
         <CartTotal />
         <div className='w-full text-end'>
          <button onClick={()=>navigate('/place-order')}  className='bg-black text-white  text-sm my-8 px-8 py-3 cursor-pointer'>PROCEED TO CHECKOUT</button>
         </div>

   </div>

</div>
    </div>
  )
}

export default Cart