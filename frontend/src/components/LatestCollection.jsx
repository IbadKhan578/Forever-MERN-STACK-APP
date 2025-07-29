import React, { useContext, useEffect, useState } from "react";
import { shopContext } from "../context/ShopContext";
import SectionTitle from "./SectionTitle.jsx";
import Productitem from "./Productitem.jsx";
const LatestCollection = () => {
  const [latestCollection, setLatestCollection] = useState([]);
  const { products } = useContext(shopContext);
  useEffect(() => {
    setLatestCollection(products.slice(0, 10));
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <SectionTitle text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className="w-3/4 m-auto text-xs  sm:text-sm md:text-base text-gray-600">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the.
        </p>
      </div>
      {/* redering products */}
      <div    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {
            latestCollection.map((item,index)=>(
                <Productitem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
            ))
        }
      </div>
    </div>
  );
};

export default LatestCollection;
