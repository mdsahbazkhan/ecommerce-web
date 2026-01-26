import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "sonner";

const PlaceOrder = () => {
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    deliveryFee,
    products,
  } = useContext(ShopContext);

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

  const [errors, setErrors] = useState({});

  // ---------- INPUT CHANGE ----------
  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // ---------- VALIDATION ----------
  const validateForm = () => {
    let newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";

    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Enter a valid email";

    if (!formData.street.trim())
      newErrors.street = "Street address is required";

    if (!formData.city.trim()) newErrors.city = "City is required";

    if (!formData.state.trim()) newErrors.state = "State is required";

    if (!formData.zipCode.trim()) newErrors.zipCode = "Zip code is required";

    if (!formData.country.trim()) newErrors.country = "Country is required";

    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^[0-9]{10}$/.test(formData.phone))
      newErrors.phone = "Phone number must be exactly 10 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---------- SUBMIT ----------
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      let orderItems = [];

      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          if (cartItems[productId][size] > 0) {
            const product = structuredClone(
              products.find((p) => p._id === productId),
            );
            if (product) {
              product.size = size;
              product.quantity = cartItems[productId][size];
              orderItems.push(product);
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + deliveryFee,
      };

      // 🔹 COD
      if (paymentMethod === "cod") {
        const res = await axios.post(
          `${backendUrl}/api/order/place`,
          orderData,
          { headers: { token } },
        );

        if (res.data.success) {
          setCartItems({});
          navigate("/orders");
        }
      }

      // 🔹 STRIPE
      if (paymentMethod === "stripe") {
        const res = await axios.post(
          `${backendUrl}/api/order/stripe`,
          orderData,
          { headers: { token } },
        );
        if (res.data.success) {
          const { session_url } = res.data;
          window.location.replace(session_url);
        } else {
          toast.error(res.data.message);
        }
      }

      // 🔹 RAZORPAY
      // if (paymentMethod === "razorpay") {
      //   const res = await axios.post(
      //     `${backendUrl}/api/payment/razorpay`,
      //     orderData,
      //     { headers: { token } }
      //   );

      //   initRazorpay(res.data);
      // }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col lg:flex-row gap-10 pt-10 mt-10 border-t px-4 sm:px-0"
    >
      {/* ---------- LEFT : DELIVERY INFO ---------- */}
      <div className="flex flex-col gap-5 w-full lg:max-w-120">
        <Title text1="DELIVERY" text2="INFORMATION" />

        <div className="flex gap-3">
          <div className="w-full">
            <input
              name="firstName"
              value={formData.firstName}
              onChange={onChangeHandler}
              placeholder="First Name"
              className="input"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}
          </div>

          <div className="w-full">
            <input
              name="lastName"
              value={formData.lastName}
              onChange={onChangeHandler}
              placeholder="Last Name"
              className="input"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}
          </div>
        </div>

        <input
          name="email"
          value={formData.email}
          onChange={onChangeHandler}
          placeholder="Email Address"
          className="input"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <input
          name="street"
          value={formData.street}
          onChange={onChangeHandler}
          placeholder="Street Address"
          className="input"
        />
        {errors.street && (
          <p className="text-red-500 text-sm">{errors.street}</p>
        )}

        <div className="flex gap-3">
          <div className="w-full">
            <input
              name="city"
              value={formData.city}
              onChange={onChangeHandler}
              placeholder="City"
              className="input"
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city}</p>
            )}
          </div>

          <div className="w-full">
            <input
              name="state"
              value={formData.state}
              onChange={onChangeHandler}
              placeholder="State"
              className="input"
            />
            {errors.state && (
              <p className="text-red-500 text-sm">{errors.state}</p>
            )}
          </div>
        </div>

        <div className="flex gap-3">
          <div className="w-full">
            <input
              name="zipCode"
              value={formData.zipCode}
              onChange={onChangeHandler}
              placeholder="Zip Code"
              className="input"
            />
            {errors.zipCode && (
              <p className="text-red-500 text-sm">{errors.zipCode}</p>
            )}
          </div>

          <div className="w-full">
            <input
              name="country"
              value={formData.country}
              onChange={onChangeHandler}
              placeholder="Country"
              className="input"
            />
            {errors.country && (
              <p className="text-red-500 text-sm">{errors.country}</p>
            )}
          </div>
        </div>

        <input
          name="phone"
          value={formData.phone}
          onChange={(e) => {
            if (/^[0-9]{0,10}$/.test(e.target.value)) {
              onChangeHandler(e);
            }
          }}
          placeholder="Phone Number"
          className="input"
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
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
                className={`radio ${paymentMethod === "cod" ? "radio-active" : ""}`}
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
              className=" bg-indigo-600 text-white py-3 px-16 rounded-md font-semibold hover:bg-indigo-700 transition"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
      ;
    </form>
  );
};

export default PlaceOrder;
