import React, { useContext } from 'react'
import { shopContext } from '../context/ShopContext'
import SectionTitle from '../components/SectionTitle';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const Orders = () => {
  let {currency,backendUrl, token } = useContext(shopContext);
  const [orderData, setOrderData] = useState([]);


  const loadOrders = async() =>{
    try {
      if(!token){
        return null;
      }


      const response = await axios.post(backendUrl+'/api/order/userorders',{},{headers:{token}})
      if(response.data.success){
        let allOrderItems =[];
        response.data.orders.map((order)=>{
          order.items.map(item=>{
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            allOrderItems.push(item);
          })
        })

        setOrderData(allOrderItems.reverse());
        console.log(orderData);
      }
      



      
    } catch (error) {
      console.log(error);
      toast.error(response.data.message);
      
    }
  }

  useEffect(()=>{
    loadOrders();
  },[token])


  
  return (
    <div className='border-t border-gray-300 pt-14'>
      <div className='text-2xl'>
        <SectionTitle text1={'MY'} text2={'ORDERS'} />
      </div>
      <div>
        {
          orderData.map((item,index)=>(
            <div key={index} className=' py-4 border-t border-b border-gray-200 text-gray-700 flex flex-col sm:flex-row  md:items-center md:justify-between gap-4 '>
              <div className='flex items-start gap-6 text-sm'>
                <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
                  <div>
                <p className='sm:text-base font-medium'>{item.name}</p>
                <div className='flex items-center text-gray-700 gap-3 mt-2 text-base '>
                   <p className='text-lg'>{currency} {item.price * item.quantity}</p>
                   <p>Quantity: {item.quantity}</p>
                   <p>Size: {item.size}</p>
                   </div>
             
              <p className='mt-2'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span>  </p>
              <p className='mt-2'>Payment: <span className='text-gray-400'>{item.paymentMethod}</span>  </p>
               </div>
              </div>
              <div className='md:w-1/2 flex justify-between'>
              <div className='flex items-center gap-2'>
                <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                <p className='text-sm md:text-base'>{item.status}</p>
              </div>
              <button onClick={loadOrders} className='border cursor-pointer text-sm font-medium rounded-sm border-gray-200 px-4 py-2'>Track Order</button>


              </div>

             
            
            </div>
          ))
        }
      </div>


    </div>
  )
}

export default Orders