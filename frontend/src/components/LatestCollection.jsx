import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItems from "./ProductItems";
import { ProductGridSkeleton } from "./Skeleton";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (products.length > 0) {
      setLatestProducts(products.slice(0, 10));
      setLoading(false);
    }
  }, [products]);

  if (loading) {
    return (
      <div className="my-10">
        <div className="text-center text-3xl py-3">
          <Title text1={"FRESH "} text2={"PICKS"} />
          <p className="text-gray-600 text-xs sm:text-sm md:text-base max-w-xl m-auto w-3/4">
            Fresh styles, timeless designs, and quality you can trust — curated just for you.
          </p>
          <div className="mt-4">
            <ProductGridSkeleton count={10} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-3">
        <Title text1={"FRESH "} text2={"PICKS"} />
        <p className="text-gray-600 text-xs sm:text-sm  md:text-base max-w-xl m-auto w-3/4">
          Fresh styles, timeless designs, and quality you can trust — curated
          just for you.
        </p>
        {/* Rendering Product */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-6 mt-4">
          {latestProducts.map((product, index) => {
            return (
              <ProductItems
                key={index}
                id={product._id}
                name={product.name}
                images={product.images}
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
