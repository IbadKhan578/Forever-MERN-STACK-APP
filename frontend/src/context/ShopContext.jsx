import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
export const shopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  let [search,setSearch] = useState('');
  let [showSearch,setShowSearch] = useState(false);
  let [cartItem,setCartItem] = useState({});
  const [products,setProducts]= useState([]);
  let [token , setToken] = useState('');

  let addToCart = async (itemId,size)=>{
    let cartData= structuredClone(cartItem); // copying an object
    if(!size){
      toast.error('Select Product Size');
      return;
    }
    if(cartData[itemId]){ // check if item already exists in cart 
      if(cartData[itemId][size]){   // item alreay exists with same size in cart just increase the quantity
      cartData[itemId][size] +=1;
      }else{ // if we have product but not with same size we will create new entry
        cartData[itemId][size]=1;

      }
    }else{ // if item does not exist in cart we will create new entry
      cartData[itemId]={};
      cartData[itemId][size]=1;

    }
    setCartItem(cartData);

   if(token){
    try {
          await axios.post(backendUrl+'/api/cart/add',{itemId,size},{headers:{token}})

      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }



   }



  }

  const getCartCount=()=>{
let totalCount = 0;
for(let items in cartItem){
  for(let item in cartItem[items]){
    try {
      if(cartItem[items][item]>0){
        totalCount+= cartItem[items][item];
      }
      
    } catch (error) {
      console.error(error);
      
    }

  }
}
return totalCount;

  }

  const updateCartQuantity = async(itemId,size,quantity)=>{
    let cartData = structuredClone(cartItem);
    cartData[itemId][size] = quantity;
    setCartItem(cartData);

    if(token){
      try {

        await axios.post(backendUrl+'/api/cart/update',{itemId,size,quantity}, {headers:{token}})
        
      } catch (error) {
        console.log(error);
        toast.error(error.message);
        
      }
    }





  }

  const getCartAmount =  ()=>{
    let totalAmount = 0;
    for(const items in cartItem){
      let itemInfo = products.find((product)=> product._id === items );
      for(const item in cartItem[items]){
        if(cartItem[items][item]>0){
          totalAmount+= itemInfo.price * cartItem[items][item];

        }
      }
    }

return totalAmount;

  }


  const getProductsData = async ()=>{
    try {
       const response = await  axios.get(backendUrl+"/api/product/list");

       if(response.data.success){
        toast.success(response.data.message);
        setProducts(response.data.products)
       }else{
        toast.error(response.data.message);
       }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
      
    }
  }

  const getUserCart = async (token)=>{

    try {

      let response = await axios.post(backendUrl+'/api/cart/get',{},{headers:{token}});
   
   if(response.data.success){
    setCartItem(response.data.cartData);
   }

      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      
    }

   
  }

useEffect(()=>{

  getProductsData();
},[])
  
useEffect(()=>{

  if(!token && localStorage.getItem('token')){
    setToken(localStorage.getItem('token'));
    getUserCart(localStorage.getItem('token'));
  }

},[])

  let value = {
    products,
    currency,
    delivery_fee,
    search , setSearch ,
     showSearch ,setShowSearch ,
     addToCart , cartItem, setCartItem,
     getCartCount , updateCartQuantity,
     getCartAmount,
     backendUrl,
     token,
     setToken
     
  };

  return (
    <shopContext.Provider value={value}>
        {props.children}
     </shopContext.Provider>
  );
};

export default ShopContextProvider;
