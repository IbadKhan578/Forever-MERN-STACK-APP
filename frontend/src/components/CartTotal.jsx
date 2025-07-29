import React, { useContext } from 'react'
import { shopContext } from '../context/ShopContext'
import SectionTitle from './SectionTitle';

function CartTotal() {
    let {currency,delivery_fee,getCartAmount} = useContext(shopContext);
  return (
    <div className='w-full     '>
        <div className='text-2xl '>
            <SectionTitle text1={'CART'} text2={'TOTALS'}/>
        </div>
        <div className='flex flex-col gap-2 mt-2 text-sm'>
            <div className='flex justify-between border-b  border-gray-200 py-1'>
                <p>Subtotal</p>
                <p>{currency} {getCartAmount() }.00</p>
            </div>
            <div className='flex justify-between border-b  border-gray-200 py-1'>
                <p>Shipping Fee</p>
                <p>{currency} {delivery_fee}.00 </p>
            </div>
             <div className='flex justify-between border-b  border-gray-200 py-1'>
                <b>Total</b>
                <b>{currency} {getCartAmount()===0 ? '0': getCartAmount()+delivery_fee }</b>
            </div>

        </div>
    </div>
  )
}

export default CartTotal