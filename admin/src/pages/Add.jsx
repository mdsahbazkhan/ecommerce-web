import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { backendUrl } from "../App";
import ActionModal from "../components/ActionModal";

const Add = ({ token }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [highlights, setHighlights] = useState("");
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const images = [image1, image2, image3, image4];
  const imageSetters = [setImage1, setImage2, setImage3, setImage4];

  // ---------- MODAL STATES ----------
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("success"); // success | error
  const [modalMessage, setModalMessage] = useState("");

  // ---------- SIZE HANDLER ----------
  const handleSizeClick = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  // ---------- VALIDATION ----------
  const validateForm = () => {
    const newErrors = {};

    if (name.trim().length < 5) {
      newErrors.name = "Product name must be at least 5 characters";
    }

    if (description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    if (!price || Number(price) <= 0) {
      newErrors.price = "Please enter a valid price";
    }

    if (sizes.length === 0) {
      newErrors.sizes = "Select at least one size";
    }

    if (!image1 && !image2 && !image3 && !image4) {
      newErrors.images = "Upload at least one product image";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---------- SUBMIT ----------
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Inline validation
    if (!validateForm()) return;

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);

      const highlightsArray = highlights
        .split(",")
        .map((h) => h.trim())
        .filter(Boolean);

      formData.append("highlights", JSON.stringify(highlightsArray));
      formData.append("sizes", JSON.stringify(sizes));

      images.forEach((image, index) => {
        if (image) {
          formData.append(`image${index + 1}`, image);
        }
      });
      setLoading(true);
      const res = await axios.post(backendUrl + "/api/product/add", formData, {
        headers: {
          token,
        },
      });
      setLoading(false);

      // ✅ SUCCESS MODAL
      setModalType("success");
      setModalMessage(res.data.message || "Product added successfully");
      setShowModal(true);

      // Reset form
      setName("");
      setDescription("");
      setPrice("");
      setHighlights("");
      setSizes([]);
      setBestseller(false);
      setImage1(null);
      setImage2(null);
      setImage3(null);
      setImage4(null);
      setErrors({});
    } catch (error) {
      // ❌ BACKEND ERROR MODAL
      setModalType("error");
      setModalMessage(
        error.response?.data?.message ||
          "Some error occurred while adding product"
      );
      setShowModal(true);
    }
  };
  const getAvailableSizes = () => {
    // Bottomwear → numeric sizes
    if (subCategory === "Bottomwear") {
      return ["28", "30", "32", "34", "36"];
    }

    // Default → alpha sizes
    return ["S", "M", "L", "XL", "XXL"];
  };
  useEffect(() => {
    setSizes([]);
  }, [subCategory]);

  return (
    <>
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col w-full items-start gap-4"
      >
        {/* Upload Images */}
        <div>
          <p className="mb-2 font-medium text-gray-700">Upload Images</p>
          <div className="flex flex-wrap gap-3">
            {[1, 2, 3, 4].map((item, index) => (
              <div key={item} className="relative">
                <label
                  htmlFor={`image${item}`}
                  className="w-20 h-20 border-2 border-dashed border-indigo-300
        rounded-lg flex items-center justify-center cursor-pointer
        hover:bg-indigo-50 transition overflow-hidden"
                >
                  {images[index] ? (
                    <img
                      src={URL.createObjectURL(images[index])}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FiUploadCloud className="text-2xl text-indigo-500" />
                  )}

                  <input
                    type="file"
                    hidden
                    id={`image${item}`}
                    accept="image/*"
                    onChange={(e) => imageSetters[index](e.target.files[0])}
                  />
                </label>

                {/* ❌ REMOVE BUTTON */}
                {images[index] && (
                  <button
                    type="button"
                    onClick={() => imageSetters[index](null)}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-black/70
          text-white rounded-full flex items-center justify-center
          text-xs hover:bg-black transition"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>

          {errors.images && (
            <p className="text-sm text-red-500 mt-1">{errors.images}</p>
          )}
        </div>

        {/* Product Name */}
        <div className="w-full">
          <p className="mb-2 font-medium text-gray-700">Product Name</p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Men Cotton T-Shirt"
            className="w-full max-w-[500px] px-3 py-2 border rounded-lg
            focus:ring-2 focus:ring-indigo-400 outline-none"
          />
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">{errors.name}</p>
          )}
        </div>

        {/* Product Description */}
        <div className="w-full">
          <p className="mb-2 font-medium text-gray-700">Product Description</p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Write product description"
            className="w-full max-w-[500px] px-3 py-2 border rounded-lg
            focus:ring-2 focus:ring-indigo-400 outline-none"
          />
          {errors.description && (
            <p className="text-sm text-red-500 mt-1">{errors.description}</p>
          )}
        </div>

        {/* Product Highlights */}
        <div className="w-full">
          <p className="mb-2 font-medium text-gray-700">Product Highlights</p>
          <textarea
            value={highlights}
            onChange={(e) => setHighlights(e.target.value)}
            rows={3}
            placeholder="Soft fabric, Comfortable fit, Easy to wash"
            className="w-full max-w-[500px] px-3 py-2 border rounded-lg
            focus:ring-2 focus:ring-indigo-400 outline-none"
          />
        </div>

        {/* Category / SubCategory / Price */}
        <div className="flex flex-col sm:flex-row gap-6">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2 border rounded-md focus:ring-1 focus:ring-indigo-500"
          >
            <option>Men</option>
            <option>Women</option>
            <option>Kids</option>
          </select>

          <select
            onChange={(e) => setSubCategory(e.target.value)}
            className="px-3 py-2 border rounded-md focus:ring-1 focus:ring-indigo-500"
          >
            <option>Topwear</option>
            <option>Bottomwear</option>
            <option>Winterwear</option>
          </select>

          <div>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
            />
            {errors.price && (
              <p className="text-sm text-red-500 mt-1">{errors.price}</p>
            )}
          </div>
        </div>

        {/* Product Sizes */}
        <div>
          <p className="mb-2 font-medium text-gray-700">Product Sizes</p>

          <div className="flex gap-3 flex-wrap">
            {getAvailableSizes().map((size) => (
              <span
                key={size}
                onClick={() => handleSizeClick(size)}
                className={`px-3 py-1 border rounded-md cursor-pointer transition
          ${
            sizes.includes(size)
              ? "bg-indigo-600 text-white border-indigo-600"
              : "text-gray-600 hover:bg-indigo-100"
          }`}
              >
                {size}
              </span>
            ))}
          </div>

          {errors.sizes && (
            <p className="text-sm text-red-500 mt-1">{errors.sizes}</p>
          )}
        </div>

        {/* Bestseller */}
        <label className="flex gap-2 items-center">
          <input
            type="checkbox"
            checked={bestseller}
            onChange={() => setBestseller(!bestseller)}
          />
          Add to bestseller
        </label>

        <button
          disabled={loading}
          className={`bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium
    ${loading ? "opacity-60 cursor-not-allowed" : "hover:bg-indigo-700"}
  `}
        >
          {loading ? "Adding..." : "ADD PRODUCT"}
        </button>
      </form>

      {/* -------- FINAL SUBMIT MODAL -------- */}
      <ActionModal
        open={showModal}
        type={modalType}
        title={modalType === "success" ? "SUCCESS !" : "Action Failed !"}
        message={modalMessage}
        buttonText="Back to main menu"
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

export default Add;
