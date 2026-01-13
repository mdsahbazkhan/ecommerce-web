import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import RatingStars from "../components/RatingStars";
import RelatedProducts from "../components/RelatedProducts";

/* ---------- SIZE CHART DATA ---------- */
const sizeChartTopwear = {
  S: { chest: "36-38 in", length: "26 in", shoulder: "17 in", sleeve: "24 in" },
  M: { chest: "38-40 in", length: "27 in", shoulder: "18 in", sleeve: "25 in" },
  L: { chest: "40-42 in", length: "28 in", shoulder: "19 in", sleeve: "26 in" },
  XL: { chest: "42-44 in", length: "29 in", shoulder: "20 in", sleeve: "27 in" },
  XXL: { chest: "44-46 in", length: "30 in", shoulder: "21 in", sleeve: "28 in" },
};

const sizeChartBottomwear = {
  28: { waist: "28 in", length: "40 in", hip: "36 in", thigh: "20 in", inseam: "30 in" },
  30: { waist: "30 in", length: "41 in", hip: "38 in", thigh: "21 in", inseam: "31 in" },
  32: { waist: "32 in", length: "42 in", hip: "40 in", thigh: "22 in", inseam: "32 in" },
  34: { waist: "34 in", length: "43 in", hip: "42 in", thigh: "23 in", inseam: "33 in" },
  36: { waist: "36 in", length: "44 in", hip: "44 in", thigh: "24 in", inseam: "34 in" },
  38: { waist: "38 in", length: "45 in", hip: "46 in", thigh: "25 in", inseam: "35 in" },
};

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.images?.[0] || "");
      setSize("");
      setShowSizeChart(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [productId, products]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const handleBuyNow = () => {
    if (!size) {
      toast.error("Please select a size first ❗");
      return;
    }
    toast("Coming soooooon 🚀");
  };

  if (!productData) {
    return (
      <div className="border-t-2 pt-10 mt-10">
        <div className="flex gap-12 flex-col sm:flex-row">
          {/* Image Skeleton */}
          <div className="flex-1 flex flex-col-reverse sm:flex-row gap-3">
            <div className="flex sm:flex-col gap-3 sm:w-[18%] w-full overflow-auto">
              {Array.from({ length: 4 }, (_, i) => (
                <div key={i} className="w-20 h-20 sm:w-full sm:h-24 bg-gray-200 rounded-md animate-pulse"></div>
              ))}
            </div>
            <div className="w-full sm:w-[80%] h-96 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* Product Info Skeleton */}
          <div className="flex-1 space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            <div className="flex items-center gap-2">
              <div className="h-5 bg-gray-200 rounded w-24 animate-pulse"></div>
              <div className="h-5 bg-gray-200 rounded w-20 animate-pulse"></div>
            </div>
            <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
            
            <div className="space-y-2">
              <div className="h-5 bg-gray-200 rounded w-20 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
            </div>

            <div className="space-y-3">
              <div className="h-5 bg-gray-200 rounded w-24 animate-pulse"></div>
              <div className="flex gap-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <div key={i} className="h-10 w-12 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <div className="flex-1 h-12 bg-gray-200 rounded animate-pulse"></div>
              <div className="flex-1 h-12 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-t-2 pt-10 mt-10">
      {/* ---------- PRODUCT DETAILS ---------- */}
      <div className="flex gap-12 flex-col sm:flex-row">
        {/* Images */}
        <div className="flex-1 flex flex-col-reverse sm:flex-row gap-3">
          <div className="flex sm:flex-col gap-3 sm:w-[18%] w-full overflow-auto">
            {productData.images?.map((item, index) => (
              <img
                key={index}
                src={item}
                onClick={() => setImage(item)}
                className={`cursor-pointer border-2 rounded-md w-20 h-20 sm:w-full sm:h-auto object-cover ${
                  image === item ? "border-indigo-600" : "border-gray-200 hover:border-indigo-400"
                }`}
                alt=""
              />
            ))}
          </div>

          <div className="w-full sm:w-[80%] relative">
            <div 
              className="relative overflow-hidden rounded cursor-crosshair"
              onMouseEnter={() => setShowZoom(true)}
              onMouseLeave={() => setShowZoom(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                src={image}
                alt=""
                className="w-full h-auto object-cover rounded transition-transform duration-200"
              />
              
              {/* Zoom Overlay */}
              {showZoom && (
                <div 
                  className="absolute inset-0 bg-white bg-opacity-30 pointer-events-none"
                  style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: '200%',
                    backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    backgroundRepeat: 'no-repeat'
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {/* ---------- PRODUCT INFO ---------- */}
        <div className="flex-1">
          <h1 className="text-2xl font-medium text-indigo-800">
            {productData.name}
          </h1>

          <div className="flex items-center gap-2 mt-2">
            <RatingStars rating={productData.rating} />
            <span className="text-indigo-600">
              ({productData.reviews} reviews)
            </span>
          </div>

          <p className="mt-4 text-3xl font-semibold text-indigo-800">
            {currency}
            {productData.price}
          </p>

          {/* Highlights */}
          <div className="mt-4">
            <p className="font-medium text-indigo-800 mb-2">Highlights</p>
            <ul className="list-disc pl-5 text-sm text-indigo-500 space-y-1">
              {productData.highlights?.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>

          {/* ---------- SIZE SELECTION ---------- */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-2">
              <p className="font-medium">Select Size</p>
              <button
                onClick={() => setShowSizeChart((prev) => !prev)}
                className="text-sm text-indigo-600 hover:underline"
              >
                Size Chart
              </button>
            </div>

            <div className="flex gap-2 flex-wrap">
              {productData.sizes?.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`px-4 py-2 border rounded-md text-sm transition ${
                    size === item
                      ? "bg-indigo-100 border-indigo-600 text-indigo-800"
                      : "border-gray-300 hover:border-indigo-400"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* ---------- SIZE CHART ---------- */}
            {showSizeChart && (
              <div className="mt-4 bg-white border border-indigo-200 rounded-lg shadow-sm overflow-hidden">
                <div className="bg-indigo-50 px-4 py-3 border-b border-indigo-200">
                  <h3 className="text-indigo-800 font-semibold text-sm flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                    Size Guide (All measurements are approximate)
                  </h3>
                </div>

                <div className="p-4">
                  {/* TOPWEAR TABLE */}
                  {productData.subCategory === "Topwear" && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-2 px-3 font-semibold text-indigo-800 bg-gray-50">Size</th>
                            <th className="text-center py-2 px-3 font-semibold text-indigo-800 bg-gray-50">Chest</th>
                            <th className="text-center py-2 px-3 font-semibold text-indigo-800 bg-gray-50">Length</th>
                            <th className="text-center py-2 px-3 font-semibold text-indigo-800 bg-gray-50">Shoulder</th>
                            <th className="text-center py-2 px-3 font-semibold text-indigo-800 bg-gray-50">Sleeve</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.entries(sizeChartTopwear).map(([size, info], index) => (
                            <tr key={size} className={`border-b border-gray-100 hover:bg-indigo-25 transition-colors ${
                              index % 2 === 0 ? 'bg-gray-25' : 'bg-white'
                            }`}>
                              <td className="py-3 px-3 font-medium text-indigo-700">{size}</td>
                              <td className="py-3 px-3 text-center text-gray-700">{info.chest}</td>
                              <td className="py-3 px-3 text-center text-gray-700">{info.length}</td>
                              <td className="py-3 px-3 text-center text-gray-700">{info.shoulder}</td>
                              <td className="py-3 px-3 text-center text-gray-700">{info.sleeve}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* BOTTOMWEAR TABLE */}
                  {productData.subCategory === "Bottomwear" && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-2 px-3 font-semibold text-indigo-800 bg-gray-50">Size</th>
                            <th className="text-center py-2 px-3 font-semibold text-indigo-800 bg-gray-50">Waist</th>
                            <th className="text-center py-2 px-3 font-semibold text-indigo-800 bg-gray-50">Length</th>
                            <th className="text-center py-2 px-3 font-semibold text-indigo-800 bg-gray-50">Hip</th>
                            <th className="text-center py-2 px-3 font-semibold text-indigo-800 bg-gray-50">Thigh</th>
                            <th className="text-center py-2 px-3 font-semibold text-indigo-800 bg-gray-50">Inseam</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.entries(sizeChartBottomwear).map(([size, info], index) => (
                            <tr key={size} className={`border-b border-gray-100 hover:bg-indigo-25 transition-colors ${
                              index % 2 === 0 ? 'bg-gray-25' : 'bg-white'
                            }`}>
                              <td className="py-3 px-3 font-medium text-indigo-700">{size}</td>
                              <td className="py-3 px-3 text-center text-gray-700">{info.waist}</td>
                              <td className="py-3 px-3 text-center text-gray-700">{info.length}</td>
                              <td className="py-3 px-3 text-center text-gray-700">{info.hip}</td>
                              <td className="py-3 px-3 text-center text-gray-700">{info.thigh}</td>
                              <td className="py-3 px-3 text-center text-gray-700">{info.inseam}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  <div className="mt-3 p-3 bg-blue-50 rounded-md border border-blue-200">
                    <p className="text-xs text-blue-700 flex items-start gap-2">
                      <svg className="w-3 h-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <span>
                        <strong>How to measure:</strong> Lay the garment flat and measure across. For best fit, compare with a similar garment that fits you well.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ---------- ACTION BUTTONS ---------- */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => addToCart(productData._id, size)}
              className="flex-1 bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700"
            >
              ADD TO CART
            </button>

            <button
              onClick={handleBuyNow}
              className="flex-1 border border-indigo-600 text-indigo-600 py-3 rounded-md hover:bg-indigo-50"
            >
              BUY NOW
            </button>
          </div>

          {/* Info */}
          <div className="text-sm text-indigo-500 mt-5 space-y-1">
            <p>✔ 100% Original product</p>
            <p>✔ Cash on delivery available</p>
            <p>✔ 7 days return & exchange</p>
          </div>
        </div>
      </div>

      {/* ---------- TABS ---------- */}
      <div className="mt-10 border-b border-indigo-300">
        <div className="flex gap-6 text-sm">
          <button
            onClick={() => setActiveTab("description")}
            className={`pb-2 ${
              activeTab === "description"
                ? "border-b-2 border-indigo-600 text-indigo-700"
                : "text-indigo-400"
            }`}
          >
            Description
          </button>

          <button
            onClick={() => setActiveTab("reviews")}
            className={`pb-2 ${
              activeTab === "reviews"
                ? "border-b-2 border-indigo-600 text-indigo-700"
                : "text-indigo-400"
            }`}
          >
            Reviews ({productData.reviews})
          </button>
        </div>

        <div className="mt-6 text-sm text-indigo-500">
          {activeTab === "description" && <p>{productData.description}</p>}

          {activeTab === "reviews" && <p>No reviews yet.</p>}
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;
