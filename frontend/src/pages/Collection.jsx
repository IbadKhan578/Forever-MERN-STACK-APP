import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets.js";
import SectionTitle from "../components/SectionTitle.jsx";
import {shopContext} from '../context/ShopContext'
import Productitem from '../components/Productitem.jsx'

const Collection = () => {
  const [showFilter, setShowFilter] = useState(false);
  const {products, search , showSearch} = useContext(shopContext);
  const [filteredProduct,setFilteredProduct ] = useState([]);
  const [category,setCategory] = useState([]);
  const [subCategory,setSubCategory] = useState([]);
  let [sortType,setSortType]=useState('relevent');


   

   useEffect(()=>{
     applyFilter();
   },[category,subCategory,search,showSearch,products])

   useEffect(()=>{
   sortProduct();
   },[sortType])


   const toggleCategory = (e) => {
     if (category.includes(e.target.value)) {
       setCategory((prev) => prev.filter((item) => item !== e.target.value));
     } else {
       setCategory((prev) => [...prev, e.target.value]);
     }
   };
   const toggleSubCategory=(e)=>{
    if(subCategory.includes(e.target.value)){
      setSubCategory((prev)=> prev.filter(item => item!==e.target.value))
    }else{
      setSubCategory((prev)=>[...prev,e.target.value]);
    }

   }

   const applyFilter =()=>{

    let productCopy = products.slice();
    if(showSearch && search){
      productCopy = productCopy.filter((item)=> item.name.toLowerCase().includes(search.toLowerCase()))
    }


    if(category.length>0){
      productCopy = productCopy.filter((item)=> category.includes(item.category));
    }
    if(subCategory.length>0){
      productCopy = productCopy.filter((item)=> subCategory.includes(item.subCategory));
    setFilteredProduct(productCopy);
    }
    setFilteredProduct(productCopy);

   }

   let sortProduct =()=>{
    let fpCopy = filteredProduct.slice();
    switch (sortType) {
      case 'low-high': setFilteredProduct(fpCopy.sort((a,b)=>(a.price - b.price)))    
        break;
        case 'high-low' : setFilteredProduct(fpCopy.sort((a,b)=>(b.price - a.price)))
    
      default:
        applyFilter();
        break;
    }




   }



  

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10  border-t">
      {/* filter options */}
      <div onClick={() => setShowFilter((prev) => !prev)} className="min-w-60">
        <p className="my-2 text-xl flex items-center cursor-pointer gap-2  ">
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>
        {/* CATEGORY FILTER */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Men"} onChange={toggleCategory} />
              Men
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Women"} onChange={toggleCategory} />
              Women
            </p>{" "}
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Kids"} onChange={toggleCategory} />
              Kids
            </p>
          </div>
        </div>
        {/* sub category filter */}

        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Topwear"} onChange={toggleSubCategory} />
              Topwear
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Bottomwear"} onChange={toggleSubCategory}/>
              Bottomwear
            </p>{" "}
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Winterwear"} onChange={toggleSubCategory} />
              Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="flex-1">
        <div className=" flex justify-between text-base sm:text-2xl mb-4 ">
          <SectionTitle text1={"All"} text2={"Collection"} />
          {/* Product Sort */}
          <select  onChange={(e)=>setSortType(e.target.value)}className="border-2 border-gray-300 text-sm px-2">
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        {/* product map */}
        <div className="grid grid-cols-2 md:grid-col-3 lg:grid-cols-4 gap-4 gap-y-6 ">
          
          {
            filteredProduct.map((item,index)=>(
              <Productitem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
            ))

          }


        </div>

      


      </div>
    </div>
  );
};

export default Collection;
