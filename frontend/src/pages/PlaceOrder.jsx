import React, { useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
// import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };
  // const navigate = useNavigate();

  return (
    <form className="flex flex-col lg:flex-row gap-10 pt-10 mt-10 border-t px-4 sm:px-0">
      {/* ---------- LEFT : DELIVERY INFO ---------- */}
      <div className="flex flex-col gap-5 w-full lg:max-w-120">
        <div className="text-xl sm:text-2xl mb-2">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>

        {/* Name */}
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-indigo-500"
            type="text"
            placeholder="First Name"
            required
          />
          <input
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-indigo-500"
            type="text"
            placeholder="Last Name"
            required
          />
        </div>

        <input
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-indigo-500"
          type="email"
          placeholder="Email Address"
          required
        />
        <input
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-indigo-500"
          type="text"
          placeholder="Street Address"
          required
        />

        {/* City / State */}
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-indigo-500"
            type="text"
            placeholder="City"
            required
          />
          <input
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-indigo-500"
            type="text"
            placeholder="State"
            required
          />
        </div>

        {/* Zip / Country */}
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="zipCode"
            value={formData.zipCode}
            className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-indigo-500"
            type="number"
            placeholder="Zip Code"
            required
          />
          <input
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            className="input"
            type="text"
            placeholder="Country"
            required
          />
        </div>

        <input
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-indigo-500"
          type="number"
          placeholder="Phone Number"
          required
        />
      </div>

      {/* ---------- RIGHT : ORDER SUMMARY ---------- */}
      <div className="flex-1">
        <CartTotal />

        {/* PAYMENT METHOD */}
        <div className="mt-10">
          <Title text1="PAYMENT" text2="METHOD" />

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            {/* Stripe */}
            <div
              onClick={() => setPaymentMethod("stripe")}
              className="payment-box"
            >
              <span
                className={`radio ${
                  paymentMethod === "stripe" ? "radio-active" : ""
                }`}
              />
              <img src={assets.stripe_logo} alt="Stripe" className="h-5" />
            </div>

            {/* Razorpay */}
            <div
              onClick={() => setPaymentMethod("razorpay")}
              className="payment-box"
            >
              <span
                className={`radio ${
                  paymentMethod === "razorpay" ? "radio-active" : ""
                }`}
              />
              <img src={assets.razorpay_logo} alt="Razorpay" className="h-5" />
            </div>

            {/* Cash on Delivery */}
            <div
              onClick={() => setPaymentMethod("cod")}
              className="payment-box"
            >
              <span
                className={`radio ${
                  paymentMethod === "cod" ? "radio-active" : ""
                }`}
              />
              <p className="text-sm font-medium text-indigo-700">
                CASH ON DELIVERY
              </p>
            </div>
          </div>

          {/* PLACE ORDER BUTTON */}
          <div className="mt-8 w-full text-end">
            <button
              type="submit"
              // onClick={() => navigate("/orders")}
              className=" bg-indigo-600 text-white py-3 px-16 rounded-md font-semibold hover:bg-indigo-700 transition"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
