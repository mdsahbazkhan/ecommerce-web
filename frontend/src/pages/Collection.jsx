import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItems from "../components/ProductItems";
import { FiChevronDown } from "react-icons/fi";

const Collection = () => {
  const { products } = useContext(ShopContext);
  const [showFilters, setShowFilters] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevance");
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(category.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(subCategory.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };
  const applyFilter = () => {
    let productsArray = products.slice();
    if (category.length > 0) {
      productsArray = productsArray.filter((item) =>
        category.includes(item.category)
      );
    }
    if (subCategory.length > 0) {
      productsArray = productsArray.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }
    setFilterProducts(productsArray);
  };
  const sortProduct = () => {
    let productsArray = filterProducts.slice();
    switch (sortType) {
      case "low-high":
        setFilterProducts([...productsArray].sort((a, b) => a.price - b.price));

        break;
      case "high-low":
        setFilterProducts(productsArray.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };
  useEffect(() => {
    setFilterProducts(products);
  }, [products]);
  useEffect(() => {
    applyFilter();
  }, [category, subCategory]);
  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10  mt-12">
      {/* Filter Options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilters(!showFilters)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2 text-indigo-800 font-semibold"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilters ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>

        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilters ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium text-indigo-800">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3 text-indigo-500"
                type="checkbox"
                value={"Men"}
                onChange={toggleCategory}
              />
              <span className="text-indigo-500">Men</span>
            </p>
            <p className="flex gap-2">
              <input
                className="w-3 text-indigo-500"
                type="checkbox"
                value={"Women"}
                onChange={toggleCategory}
              />
              <span className="text-indigo-500">Women</span>
            </p>
            <p className="flex gap-2">
              <input
                className="w-3 text-indigo-500"
                type="checkbox"
                value={"Kids"}
                onChange={toggleCategory}
              />
              <span className="text-indigo-500">Kids</span>
            </p>
          </div>
        </div>
        {/* SubCategory Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilters ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium text-indigo-800">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3 text-indigo-500"
                type="checkbox"
                value={"Topwear"}
                onChange={toggleSubCategory}
              />
              <span className="text-indigo-500">Topwear</span>
            </p>
            <p className="flex gap-2">
              <input
                className="w-3 text-indigo-500"
                type="checkbox"
                value={"Bottomwear"}
                onChange={toggleSubCategory}
              />
              <span className="text-indigo-500">Bottomwear</span>
            </p>
            <p className="flex gap-2">
              <input
                className="w-3 text-indigo-500"
                type="checkbox"
                value={"Winterwear"}
                onChange={toggleSubCategory}
              />
              <span className="text-indigo-500">Winterwear</span>
            </p>
          </div>
        </div>
      </div>
      {/* Right Side */}
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mb-4">
          <Title text1={"SHOP"} text2={"COLLECTION"} />
          {/* Product Sort */}

          <div className="relative w-full sm:w-auto">
            <select
              onChange={(e) => setSortType(e.target.value)}
              className="
      appearance-none
      w-full
      sm:w-48
      border border-indigo-300
      text-indigo-700
      bg-white
      px-4 py-2
      rounded-md
      text-sm
      focus:outline-none
      focus:ring-2
      focus:ring-indigo-500
      cursor-pointer
    "
            >
              <option value="relevance">Sort by Relevance</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>

            {/* Dropdown Icon */}
            <FiChevronDown className="pointer-events-none absolute inset-y-0 right-3 top-3 flex items-center text-indigo-600" />
          </div>
        </div>
        {/* Map Product */}
        {filterProducts.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">No products found</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {filterProducts.map((product) => (
              <ProductItems
                key={product._id}
                id={product._id}
                name={product.name}
                image={product.image}
                price={product.price}
                rating={product.rating}
                reviews={product.reviews}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;
