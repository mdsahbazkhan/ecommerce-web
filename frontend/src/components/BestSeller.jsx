import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItems from "./ProductItems";
import { ProductGridSkeleton } from "./Skeleton";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (products.length > 0) {
      const bestProduct = products.filter((item) => item.bestseller === true);
      setBestSeller(bestProduct.slice(0, 5));
      setLoading(false);
    }
  }, [products]);

  if (loading) {
    return (
      <div className="my-10">
        <div className="text-center text-3xl py-3">
          <Title text1="BEST" text2="SELLERS" />
          <p className="text-gray-600 text-xs sm:text-sm md:text-base max-w-xl m-auto w-3/4">
            Discover our most loved products, chosen by customers for quality and style.
          </p>
        </div>
        <ProductGridSkeleton count={5} />
      </div>
    );
  }

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-3">
        <Title text1="BEST" text2="SELLERS" />
        <p className="text-gray-600 text-xs sm:text-sm md:text-base max-w-xl m-auto w-3/4">
          Discover our most loved products, chosen by customers for quality and
          style.
        </p>
      </div>

      {/* render bestSeller products here */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-6">
        {bestSeller.map((item, index) => {
          return (
            <ProductItems
              key={index}
              id={item._id}
              name={item.name}
              images={item.images}
              price={item.price}
              rating={item.rating}
              reviews={item.reviews}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BestSeller;
