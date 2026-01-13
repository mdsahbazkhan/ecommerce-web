import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItems from "./ProductItems";
import { RelatedProductsSkeleton } from "./Skeleton";

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (products.length > 0) {
      let productCopy = products.slice();
      productCopy = productCopy.filter((item) => category === item.category);
      productCopy = productCopy.filter(
        (item) => subCategory === item.subCategory
      );
      setRelated(productCopy.slice(0, 5));
      setLoading(false);
    }
  }, [products, category, subCategory]);

  if (loading) return <RelatedProductsSkeleton />;
  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1="YOU MAY ALSO" text2="LIKE" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-6 mt-4">
        {related.map((product, index) => {
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
  );
};

export default RelatedProducts;
