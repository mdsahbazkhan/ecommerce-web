import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItems from "./ProductItems";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"FRESH "} text2={"PICKS"} />
        <p className="text-gray-600 text-xs sm:text-sm  md:text-base max-w-xl m-auto w-3/4">
          Fresh styles, timeless designs, and quality you can trust — curated
          just for you.
        </p>
        {/* Rendering Product */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-6">
          {latestProducts.map((product, index) => {
            return (
              <ProductItems
                key={index}
                id={product._id}
                name={product.name}
                image={product.image}
                price={product.price}
                rating={product.rating}
                reviews={product.reviews}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LatestCollection;
