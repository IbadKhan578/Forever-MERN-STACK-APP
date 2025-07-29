import React, { useEffect, useState } from 'react'
import SectionTitle from '../components/SectionTitle'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { shopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const [method,setMethod] = useState('cod');
  const navigate = useNavigate();
  let {token, backendUrl, products, cartItem,setCartItem, getCartAmount, delivery_fee} = useContext(shopContext);

  const [formData,setFormData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipCode:'',
    country:'',
    phone:''
  })

  const onChangeHandler =(e)=>{
    const name = e.target.name;
    const value = e.target.value;

    setFormData(data=> ({...data,[name]:value}))


  }

  const onSubmitHandler = async (e)=>{
    e.preventDefault();
    try {

      let orderItems = [];
      for(let items in cartItem){
        for(let item in cartItem[items]){
          if(cartItem[items][item] > 0){
            const itemInfo = structuredClone(products.find(product=> product._id === items ));
            if(itemInfo){
              itemInfo.size = item;
              itemInfo.quantity = cartItem[items][item];
              orderItems.push(itemInfo);
            }

          }
        }
      }

      let OrderData = {
        
        address : formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }


      switch(method){
        //  API call for COD
         case 'cod':
          let response = await axios.post(backendUrl+'/api/order/place', OrderData, {headers:{token}} )
          if(response.data.success){
            setCartItem({})
            navigate('/orders')
          }else{
            toast.error(response.data.message);
          }
        break;
        case 'stripe':
          let StripeResponse = await axios.post(backendUrl+'/api/order/stripe',OrderData, {headers:{token}})
          if(StripeResponse.data.success){
            const {sessionUrl} = StripeResponse.data;
            window.location.replace(sessionUrl);
          }else{
            toast.error(StripeResponse.data.message)
          }
          break;

        default:
          break;

      }

      
    } catch (error) {
       console.log("Order Error:", error);
  toast.error(error.message || "Something went wrong")
      
    }

  }

  useEffect(()=>{
    console.log(method);

  },[method])



  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-15 min-h-[80vh] border-t border-gray-200  ">
      {/* left side  */}
      <div className="flex flex-col w-full gap-4 sm:w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <SectionTitle text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        <div className="flex gap-3 ">
          <input required
          onChange={onChangeHandler} name='firstName' value={formData.firstName}
            className="border border-gray-300 px-3.5 rounded py-1.5 w-full "
            type="text"
            placeholder="First name"
            
          />
          <input required
           onChange={onChangeHandler} name='lastName' value={formData.lastName}
            className="border border-gray-300 px-3.5 rounded py-1.5 w-full "
            type="text"
            placeholder="Last name"
          />
        </div>

        <input required
          onChange={onChangeHandler} name='email' value={formData.email}
          className="border border-gray-300 px-3.5 rounded py-1.5 w-full "
          type="text"
          placeholder="Email address"
        />
        <input required
           onChange={onChangeHandler} name='street' value={formData.street}
          className="border border-gray-300 px-3.5 rounded py-1.5 w-full "
          type="text"
          placeholder="Street"
        />
        <div className="flex gap-3 ">
          <input required
            onChange={onChangeHandler} name='city' value={formData.city}
            className="border border-gray-300 px-3.5 rounded py-1.5 w-full "
            type="text"
            placeholder="City"
          />
          <input required
            onChange={onChangeHandler} name='state' value={formData.state}
            className="border border-gray-300 px-3.5 rounded py-1.5 w-full "
            type="text"
            placeholder="State"
          />
        </div>
        <div className="flex gap-3 ">
          <input required
             onChange={onChangeHandler} name='zipCode' value={formData.zipCode}
            className="border border-gray-300 px-3.5 rounded py-1.5 w-full "
            type="text"
            placeholder="Zipcode"
          />
          <input required
            onChange={onChangeHandler} name='country' value={formData.country}
            className="border border-gray-300 px-3.5 rounded py-1.5 w-full "
            type="text"
            placeholder="Country"
          />
        </div>
        <input required
           onChange={onChangeHandler} name='phone' value={formData.phone}
          className="border border-gray-300 px-3.5 rounded py-1.5 w-full "
          type="text"
          placeholder="Phone"
        />
      </div>
      {/* right side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <SectionTitle text1={"PAYMENT"} text2={"METHOD"} />
          {/* payment method selection */}
          <div className="flex flex-col gap-3 lg:flex-row">

            <div onClick={()=>setMethod('stripe')} className='flex items-center gap-3 p-2 px-3 border border-gray-300'>
            <p className={`min-w-3.5 h-3.5 border rounded-full  ${method==='stripe'? `bg-green-600`:"" } `}></p>
            <img className='h-5 mx-4'src={assets.stripe_logo} alt="" />  </div>
            
             <div onClick={()=>setMethod('razorpay')} className='flex items-center gap-3 p-2 px-3 border border-gray-300'>
            <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='razorpay'? `bg-green-600`:"" } `}></p>
            <img className='h-5 mx-4'src={assets.razorpay_logo} alt="" />  </div>

             <div onClick={()=>setMethod('cod')} className='flex items-center gap-3 p-2 px-3 border border-gray-300'>
            <p className={`min-w-3.5 h-3.5  border rounded-full ${method==='cod'? `bg-green-600`:"" }  `}></p>
            <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
        </div>
          </div>
          <div className='mt-8 text-end'>
            <button  type='submit'  className='bg-black text-sm text-white py-3 px-16 cursor-pointer'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder