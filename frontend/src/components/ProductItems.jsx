import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const ProductItems = ({
  id,
  name,
  images = [],
  price,
  rating,
  reviews,
  index = 0,
}) => {
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
      className="group cursor-pointer stagger-item"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* IMAGE */}
      <div className="relative overflow-hidden rounded-2xl bg-slate-50 img-zoom shadow-md hover:shadow-xl transition-shadow duration-300">
        <img
          src={images[currentImage] || images[0] || "/placeholder.png"}
          alt={name}
          className="block w-full transition-transform duration-500 ease-in-out group-hover:scale-110"
        />

        {/* ⭐ Rating Badge */}
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-xl flex items-center gap-1.5 text-xs font-bold shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
          <span className="flex items-center gap-1 text-slate-900">
            {rating} <FaStar className="text-amber-500 text-xs" />
          </span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-600">{formatReviews(reviews)}</span>
        </div>

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="bg-white px-6 py-3 rounded-full text-sm font-bold text-cyan-600 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
            Quick View
          </span>
        </div>
      </div>

      {/* NAME */}
      <p className="pt-4 text-sm font-bold text-slate-800 group-hover:text-cyan-600 transition-colors duration-300 line-clamp-2">
        {name}
      </p>

      {/* PRICE */}
      <p className="text-slate-900 text-base font-bold mt-1 group-hover:text-cyan-600 transition-all duration-300">
        {currency}
        {price}
      </p>
    </Link>
  );
};

export default ProductItems;
