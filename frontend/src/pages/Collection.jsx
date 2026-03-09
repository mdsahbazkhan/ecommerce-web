import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItems from "../components/ProductItems";
import { FiChevronDown } from "react-icons/fi";
import CollectionSkeleton from "../components/CollectionSkeleton";

const Collection = () => {
  const { products, search, showSearchBar, searchQuery } =
    useContext(ShopContext);
  const [showFilters, setShowFilters] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevance");
  const [loading, setLoading] = useState(true);

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

    if (searchQuery) {
      productsArray = productsArray.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }
    if (category.length > 0) {
      productsArray = productsArray.filter((item) =>
        category.includes(item.category),
      );
    }
    if (subCategory.length > 0) {
      productsArray = productsArray.filter((item) =>
        subCategory.includes(item.subCategory),
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
    if (products.length > 0) {
      setLoading(false);
    }
  }, [products]);

  useEffect(() => {
    setFilterProducts(products);
  }, [products]);

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearchBar]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  if (loading) return <CollectionSkeleton />;

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 mt-20 top-0">
      {/* Filter Options */}
      <div className="min-w-60 animate-fadeInLeft">
        <p
          onClick={() => setShowFilters(!showFilters)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2 text-slate-900 font-bold transform transition-all duration-300 hover:text-cyan-600"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden transition-transform duration-300 ${showFilters ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>

        {/* Category Filter */}
        <div
          className={`border-2 border-slate-200 rounded-xl pl-5 py-4 mt-6 transition-all duration-500 bg-white ${
            showFilters ? "opacity-100" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-bold text-slate-900">CATEGORIES</p>
          <div className="flex flex-col gap-3 text-sm font-medium text-slate-700">
            <label className="flex gap-2 cursor-pointer transform transition-all duration-200 hover:translate-x-1 hover:text-cyan-600">
              <input
                className="w-4 accent-cyan-600"
                type="checkbox"
                value={"Men"}
                onChange={toggleCategory}
              />
              <span>Men</span>
            </label>
            <label className="flex gap-2 cursor-pointer transform transition-all duration-200 hover:translate-x-1 hover:text-cyan-600">
              <input
                className="w-4 accent-cyan-600"
                type="checkbox"
                value={"Women"}
                onChange={toggleCategory}
              />
              <span>Women</span>
            </label>
            <label className="flex gap-2 cursor-pointer transform transition-all duration-200 hover:translate-x-1 hover:text-cyan-600">
              <input
                className="w-4 accent-cyan-600"
                type="checkbox"
                value={"Kids"}
                onChange={toggleCategory}
              />
              <span>Kids</span>
            </label>
          </div>
        </div>
        {/* SubCategory Filter */}
        <div
          className={`border-2 border-slate-200 rounded-xl pl-5 py-4 my-5 transition-all duration-500 bg-white ${
            showFilters ? "opacity-100" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-bold text-slate-900">TYPE</p>
          <div className="flex flex-col gap-3 text-sm font-medium text-slate-700">
            <label className="flex gap-2 cursor-pointer transform transition-all duration-200 hover:translate-x-1 hover:text-cyan-600">
              <input
                className="w-4 accent-cyan-600"
                type="checkbox"
                value={"Topwear"}
                onChange={toggleSubCategory}
              />
              <span>Topwear</span>
            </label>
            <label className="flex gap-2 cursor-pointer transform transition-all duration-200 hover:translate-x-1 hover:text-cyan-600">
              <input
                className="w-4 accent-cyan-600"
                type="checkbox"
                value={"Bottomwear"}
                onChange={toggleSubCategory}
              />
              <span>Bottomwear</span>
            </label>
            <label className="flex gap-2 cursor-pointer transform transition-all duration-200 hover:translate-x-1 hover:text-cyan-600">
              <input
                className="w-4 accent-cyan-600"
                type="checkbox"
                value={"Winterwear"}
                onChange={toggleSubCategory}
              />
              <span>Winterwear</span>
            </label>
          </div>
        </div>
      </div>
      {/* Right Side */}
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mb-4">
          <div className="animate-fadeInUp">
            <Title text1={"SHOP"} text2={"COLLECTION"} />
          </div>
          {/* Product Sort */}

          <div
            className="relative w-full sm:w-auto animate-fadeIn"
            style={{ animationDelay: "200ms" }}
          >
            <select
              onChange={(e) => setSortType(e.target.value)}
              className="appearance-none w-full sm:w-48 border-2 border-slate-200 text-slate-900 bg-white px-5 py-3 rounded-xl text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-cyan-100 focus:border-cyan-500 cursor-pointer transition-all duration-300 hover:border-cyan-400"
            >
              <option value="relevance">Sort by Relevance</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>

            {/* Dropdown Icon */}
            <FiChevronDown className="pointer-events-none absolute inset-y-0 right-3 top-3 flex items-center text-cyan-600 transform transition-transform duration-300" />
          </div>
        </div>
        {/* Map Product */}
        {filterProducts.length === 0 ? (
          <p className="text-center text-slate-500 mt-10 animate-fadeIn font-semibold">
            No products found
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {filterProducts.map((product, index) => (
              <ProductItems
                key={product._id}
                id={product._id}
                name={product.name}
                images={product.images}
                price={product.price}
                rating={product.rating}
                reviews={product.reviews}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;
