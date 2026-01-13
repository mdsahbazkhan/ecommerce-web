import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const ProductItems = ({ id, name, images = [], price, rating, reviews }) => {
  const { currency } = useContext(ShopContext);
  const [currentImage, setCurrentImage] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!hovered || images.length <= 1) return;
   
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [hovered, images]);

  const formatReviews = (num) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + "k";
    return num;
  };

  return (
    <Link
      to={`/product/${id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setCurrentImage(0);
      }}
      className="group cursor-pointer"
    >
      {/* IMAGE */}
      <div className="relative overflow-hidden rounded-md bg-slate-50">
        <img
          src={images[currentImage] || images[0] || "/placeholder.png"}
          alt={name}
          className="block w-full transition-transform duration-300 ease-in-out group-hover:scale-105"
        />

        {/* ⭐ Rating Badge */}
        <div className="absolute bottom-2 left-2 bg-white px-2 py-1 rounded-md flex items-center gap-1 text-xs font-medium shadow">
          <span className="flex items-center gap-1 text-gray-800">
            {rating} <FaStar className="text-green-600 text-xs" />
          </span>
          <span className="text-gray-400">|</span>
          <span className="text-gray-600">{formatReviews(reviews)}</span>
        </div>
      </div>

      {/* NAME */}
      <p className="pt-3 text-sm font-medium text-gray-800">{name}</p>

      {/* PRICE */}
      <p className="text-indigo-800 text-sm font-semibold">
        {currency}
        {price}
      </p>
    </Link>
  );
};

export default ProductItems;
