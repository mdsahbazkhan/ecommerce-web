import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import RatingStars from "../components/RatingStars";

const Product = () => {
  const { productId } = useParams();
  const { products, currency } = useContext(ShopContext);

  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    }
  }, [productId, products]);
  const handleAddToCart = () => {
    if (!size) return;
    // add to cart logic here
  };
  const handleBuyNow = () => {
    if (!size) return;
    // add item to cart
    // redirect to checkout page
  };

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 mt-10">
      {/* Product Details */}
      <div className="flex gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse sm:flex-row gap-3">
          {/* Thumbnails */}
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll gap-3 sm:w-[18%] w-full">
            {productData.image.map((item, index) => (
              <img
                src={item}
                key={index}
                alt={`product-${index}`}
                onClick={() => setImage(item)}
                className={`w-[24%] sm:w-full sm:mb-3 shrink-0 cursor-pointer border
  ${image === item ? "border-indigo-600" : "border-transparent"}
  hover:border-indigo-500 transition`}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="w-full sm:w-[80%]">
            <img
              className="w-full h-auto object-cover rounded"
              src={image}
              alt="Selected product"
            />
          </div>
        </div>
        {/* ------Product Info------ */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2 text-indigo-800">
            {productData.name}
          </h1>
          <div className="flex items-center gap-1 mt-2">
            <RatingStars rating={productData.rating} />
            <p className="pl-2 text-indigo-800">
              ( {productData.reviews} reviews)
            </p>
          </div>
          <p className="mt-5 text-3xl font-semibold text-indigo-800">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-indigo-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`
      border 
      py-2 px-4 
      rounded-md 
      text-sm font-medium
      transition
      ${
        item === size
          ? "border-indigo-600 bg-indigo-100 text-indigo-800"
          : "border-gray-300 bg-white text-gray-700 hover:border-indigo-400"
      }
    `}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          {/* <button
            onClick={handleAddToCart}
            disabled={!size}
            className={`
    w-full sm:w-auto
    mt-6
    px-8 py-3
    text-sm font-semibold
    rounded-md
    transition-all
    ${
      size
        ? "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95"
        : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }
  `}
          >
            ADD TO CART
          </button> */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            {/* ADD TO CART */}
            <button
              onClick={handleAddToCart}
              disabled={!size}
              className={`
      flex-1
      px-8 py-3
      text-sm font-semibold
      rounded-md
      transition-all
      ${
        size
          ? "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
      }
    `}
            >
              ADD TO CART
            </button>

            {/* BUY NOW */}
            <button
              onClick={handleBuyNow}
              disabled={!size}
              className={`
      flex-1
      px-8 py-3
      text-sm font-semibold
      rounded-md
      border
      transition
      ${
        size
          ? "border-indigo-600 text-indigo-600 hover:bg-indigo-50"
          : "border-gray-300 text-gray-400 cursor-not-allowed"
      }
    `}
            >
              BUY NOW
            </button>
          </div>

          {/* <hr className="mt-8 sm:w-4/5" /> */}
          <div className="text-sm text-500 mt-5 flex flex-col gap-1">
            <p className="text-indigo-500">100% Original product.</p>
            <p className="text-indigo-500">
              {" "}
              Cash on delivery is available on this product.
            </p>
            <p className="text-indigo-500">
              Easy return and exchange policy within 7 days.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">
            Reviews({productData.reviews})
          </p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p></p>
          <p></p>
        </div>
      </div>
    </div>
  ) : (
    <div className="opacity-0">Loading...</div>
  );
};

export default Product;
