import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const RatingStars = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      // full star
      stars.push(<FaStar key={i} className="text-green-600" />);
    } else if (rating >= i - 0.5) {
      // half star
      stars.push(<FaStarHalfAlt key={i} className="text-green-600" />);
    } else {
      // empty star
      stars.push(<FaRegStar key={i} className="text-gray-300" />);
    }
  }

  return <div className="flex items-center gap-1">{stars}</div>;
};

export default RatingStars;
