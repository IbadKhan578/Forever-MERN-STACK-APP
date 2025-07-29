import React, { useContext, useEffect, useState } from 'react'
import { shopContext } from '../context/ShopContext'
import SectionTitle from './SectionTitle';
import Productitem from './Productitem';
import { useNavigate } from 'react-router-dom';

function RelatedProduct({category, subCategory}) {
    const {products} = useContext(shopContext);
    const [related,setRelated] = useState([]);
        useEffect(()=>{
        if (products.length>0) {
            let productCopy = products.slice();
            productCopy = productCopy.filter((item)=> category===item.category)
            productCopy = productCopy.filter((item)=> subCategory===item.subCategory)
            setRelated(productCopy.slice(0,5))
        }


    },[products])


  return (
 <div className='my-24'>
       <div className=' py-2 text-3xl  text-center'>
            <SectionTitle  text1={'RELATED'} text2={'PRODUCTS'} />
    </div>
  <div className='grid grid-cols-2 md:grid-cols-4 sm:grid-cols-3  lg:grid-cols-5 gap-4 gap-y-6'>
      {
        related.map((item,index)=>(
            <Productitem  key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
        ))
    }
  </div>

 </div>
  )
}

export default RelatedProduct