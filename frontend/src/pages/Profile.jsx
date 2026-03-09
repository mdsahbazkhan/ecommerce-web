import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import {
  FiUser,
  FiMail,
  FiCalendar,
  FiPackage,
  FiLogOut,
  FiEdit2,
  FiCreditCard,
  FiSave,
  FiX,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Profile = () => {
  const {
    user,
    token,
    setToken,
    setUser,
    setCartItems,
    updateUserProfile,
    getUserProfile,
  } = useContext(ShopContext);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: {
      firstName: "",
      lastName: "",
      email: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      phone: "",
    },
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      setLoading(false);
    }
  }, [token, navigate]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        address: user.address || {
          firstName: "",
          lastName: "",
          email: "",
          street: "",
          city: "",
          state: "",
          zipCode: "",
          country: "",
          phone: "",
        },
      });
    }
  }, [user]);

  const handleLogout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    setCartItems({});
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    const addr = formData.address;
    if (!addr.firstName?.trim())
      newErrors["address.firstName"] = "First name is required";
    if (!addr.lastName?.trim())
      newErrors["address.lastName"] = "Last name is required";
    if (!addr.street?.trim())
      newErrors["address.street"] = "Street address is required";
    if (!addr.city?.trim()) newErrors["address.city"] = "City is required";
    if (!addr.state?.trim()) newErrors["address.state"] = "State is required";
    if (!addr.zipCode?.trim())
      newErrors["address.zipCode"] = "Zip code is required";
    if (!addr.country?.trim())
      newErrors["address.country"] = "Country is required";
    if (!addr.phone?.trim())
      newErrors["address.phone"] = "Phone number is required";
    else if (!/^[6-9]\d{9}$/.test(addr.phone)) {
      newErrors["address.phone"] =
        "Phone must start with 6, 7, 8, or 9 and be 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setSaving(true);
    try {
      const result = await updateUserProfile(formData);
      if (result.success) {
        toast.success("Profile updated successfully");
        setIsEditing(false);
        await getUserProfile();
      } else {
        toast.error(result.message || "Failed to update profile");
      }
    } catch {
      toast.error("Failed to update profile");
    }
    setSaving(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      address: user?.address || {
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        phone: "",
      },
    });
    setErrors({});
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="border-t pt-16 mt-10 flex justify-center items-center min-h-[50vh]">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-24 h-24 rounded-full bg-cyan-100"></div>
          <div className="h-6 w-48 bg-cyan-100 rounded"></div>
          <div className="h-4 w-64 bg-cyan-100 rounded"></div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="border-t pt-16 mt-10">
      <div className="text-2xl mb-8">
        <Title text1={"MY"} text2={"PROFILE"} />
      </div>

      <div className="max-w-2xl mx-auto px-4">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-xl p-4 sm:p-8 mb-6 text-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <FiUser className="text-3xl sm:text-4xl text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl sm:text-2xl font-semibold truncate">
                  {user?.name || "User"}
                </h2>
                <p className="text-cyan-100 flex items-center gap-2 mt-1 text-sm sm:text-base truncate">
                  <FiMail className="flex-shrink-0" />
                  <span className="truncate">{user?.email || "No email"}</span>
                </p>
                <p className="text-cyan-100 text-xs sm:text-sm flex items-center gap-2 mt-1">
                  <FiCalendar className="flex-shrink-0" />
                  Member since {formatDate(user?.createdAt)}
                </p>
              </div>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition w-full sm:w-auto justify-center"
              >
                <FiEdit2 /> Edit
              </button>
            )}
          </div>
        </div>

        {/* Edit Form */}
        {isEditing && (
          <div className="bg-white rounded-xl shadow-sm border border-cyan-100 overflow-hidden mb-6">
            <div className="p-4 border-b border-cyan-100 bg-cyan-50">
              <h3 className="text-lg font-semibold text-cyan-800">
                Edit Profile
              </h3>
            </div>

            <div className="p-6 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-cyan-700 mb-1">
                  Full Name
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={onChangeHandler}
                  className="w-full border border-cyan-200 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500"
                  placeholder="Your full name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Address Section */}
              <div className="pt-4 border-t border-cyan-100">
                <h4 className="font-medium text-cyan-800 mb-4">
                  Delivery Address
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-cyan-700 mb-1">
                      First Name
                    </label>
                    <input
                      name="address.firstName"
                      value={formData.address.firstName}
                      onChange={onChangeHandler}
                      className="w-full border border-cyan-200 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500"
                      placeholder="First name"
                    />
                    {errors["address.firstName"] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors["address.firstName"]}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-cyan-700 mb-1">
                      Last Name
                    </label>
                    <input
                      name="address.lastName"
                      value={formData.address.lastName}
                      onChange={onChangeHandler}
                      className="w-full border border-cyan-200 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500"
                      placeholder="Last name"
                    />
                    {errors["address.lastName"] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors["address.lastName"]}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-cyan-700 mb-1">
                    Street Address
                  </label>
                  <input
                    name="address.street"
                    value={formData.address.street}
                    onChange={onChangeHandler}
                    className="w-full border border-cyan-200 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500"
                    placeholder="Street address"
                  />
                  {errors["address.street"] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors["address.street"]}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-cyan-700 mb-1">
                      City
                    </label>
                    <input
                      name="address.city"
                      value={formData.address.city}
                      onChange={onChangeHandler}
                      className="w-full border border-cyan-200 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500"
                      placeholder="City"
                    />
                    {errors["address.city"] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors["address.city"]}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-cyan-700 mb-1">
                      State
                    </label>
                    <input
                      name="address.state"
                      value={formData.address.state}
                      onChange={onChangeHandler}
                      className="w-full border border-cyan-200 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500"
                      placeholder="State"
                    />
                    {errors["address.state"] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors["address.state"]}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-cyan-700 mb-1">
                      Zip Code
                    </label>
                    <input
                      name="address.zipCode"
                      value={formData.address.zipCode}
                      onChange={onChangeHandler}
                      className="w-full border border-cyan-200 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500"
                      placeholder="Zip code"
                    />
                    {errors["address.zipCode"] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors["address.zipCode"]}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-cyan-700 mb-1">
                      Country
                    </label>
                    <input
                      name="address.country"
                      value={formData.address.country}
                      onChange={onChangeHandler}
                      className="w-full border border-cyan-200 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500"
                      placeholder="Country"
                    />
                    {errors["address.country"] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors["address.country"]}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-cyan-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    name="address.phone"
                    value={formData.address.phone}
                    onChange={(e) => {
                      if (/^[0-9]{0,10}$/.test(e.target.value)) {
                        onChangeHandler(e);
                      }
                    }}
                    className="w-full border border-cyan-200 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500"
                    placeholder="10-digit phone number"
                  />
                  {errors["address.phone"] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors["address.phone"]}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                <button
                  onClick={handleCancel}
                  className="flex items-center justify-center gap-2 px-4 py-2 border border-cyan-300 text-cyan-600 rounded-lg hover:bg-cyan-50 transition"
                >
                  <FiX /> Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition disabled:opacity-50"
                >
                  {saving ? (
                    "Saving..."
                  ) : (
                    <>
                      <FiSave /> Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Account Options */}
        <div className="bg-white rounded-xl shadow-sm border border-cyan-100 overflow-hidden">
          <div className="p-4 border-b border-cyan-100">
            <h3 className="text-lg font-semibold text-cyan-800">
              Account Settings
            </h3>
          </div>

          <div className="divide-y divide-cyan-50">
            {/* My Orders */}
            <button
              onClick={() => navigate("/orders")}
              className="w-full p-4 flex items-center justify-between hover:bg-cyan-50 transition duration-200 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center group-hover:bg-cyan-200 transition">
                  <FiPackage className="text-cyan-600 text-lg" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-cyan-800">My Orders</p>
                  <p className="text-sm text-cyan-500">
                    View order history and track shipments
                  </p>
                </div>
              </div>
              <span className="text-cyan-400 group-hover:text-cyan-600">
                →
              </span>
            </button>

            {/* Payment Methods */}
            <button
              onClick={() => navigate("/cart")}
              className="w-full p-4 flex items-center justify-between hover:bg-cyan-50 transition duration-200 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center group-hover:bg-cyan-200 transition">
                  <FiCreditCard className="text-cyan-600 text-lg" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-cyan-800">Payment Methods</p>
                  <p className="text-sm text-cyan-500">
                    Manage your payment options
                  </p>
                </div>
              </div>
              <span className="text-cyan-400 group-hover:text-cyan-600">
                →
              </span>
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full p-4 flex items-center justify-between hover:bg-red-50 transition duration-200 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition">
                  <FiLogOut className="text-red-600 text-lg" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-red-600">Log Out</p>
                  <p className="text-sm text-red-400">
                    Sign out of your account
                  </p>
                </div>
              </div>
              <span className="text-red-400 group-hover:text-red-600">→</span>
            </button>
          </div>
        </div>

        {/* Account Info Card */}
        <div className="mt-6 bg-cyan-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-cyan-800 mb-4">
            Account Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-cyan-500 mb-1">Full Name</p>
              <p className="font-medium text-cyan-800">
                {user?.name || "Not provided"}
              </p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-cyan-500 mb-1">Email Address</p>
              <p className="font-medium text-cyan-800">
                {user?.email || "Not provided"}
              </p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-cyan-500 mb-1">Account Type</p>
              <p className="font-medium text-cyan-800 capitalize">
                {user?.authProvider || "Local"}
              </p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-cyan-500 mb-1">Member Since</p>
              <p className="font-medium text-cyan-800">
                {formatDate(user?.createdAt)}
              </p>
            </div>
          </div>

          {/* Saved Address */}
          {user?.address && Object.keys(user.address).length > 0 && (
            <div className="mt-4 bg-white rounded-lg p-4">
              <p className="text-sm text-cyan-500 mb-2">Saved Address</p>
              <p className="font-medium text-cyan-800">
                {user.address.firstName} {user.address.lastName}
              </p>
              <p className="text-cyan-600 text-sm">
                {user.address.street}, {user.address.city}, {user.address.state}{" "}
                {user.address.zipCode}
              </p>
              <p className="text-cyan-600 text-sm">{user.address.country}</p>
              <p className="text-cyan-600 text-sm">
                Phone: {user.address.phone}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
