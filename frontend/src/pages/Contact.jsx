import { useState } from "react";
import Title from "../components/Title";
import axios from "axios";
import { toast } from "sonner";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { backendUrl } = useContext(ShopContext);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validation
  const validateForm = () => {
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.subject ||
      !formData.message.trim()
    ) {
      toast.error("All fields are required");
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      toast.error("Please enter a valid email");
      return false;
    }

    if (formData.message.length < 10) {
      toast.error("Message must be at least 10 characters");
      return false;
    }

    return true;
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await axios.post(backendUrl + "/api/contact/send", formData);

      if (res.data.success) {
        toast.success("Message sent successfully!");

        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });

        setSubmitted(true);

        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-t pt-10 mt-10">
      {/* Page Heading */}
      <div className="text-center text-2xl mb-10">
        <Title text1={"CUSTOMER"} text2={"SUPPORT"} />
        <p className="text-indigo-500 text-sm mt-2">
          We’re here to help. Contact our support team anytime.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-14 mb-20">
        {/* Contact Form */}
        <div className="flex-1">
          {/* Success Message Box */}
          {submitted && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-sm">
              Thank you! Your message has been sent. We will contact you soon.
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name */}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-indigo-500"
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-indigo-500"
            />

            {/* Subject */}
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-indigo-500 text-gray-600"
            >
              <option value="">Select a subject</option>
              <option>Order Issue</option>
              <option>Payment Issue</option>
              <option>Return & Refund</option>
              <option>General Inquiry</option>
            </select>

            {/* Message */}
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              maxLength="500"
              rows="5"
              placeholder="Write your message here..."
              className="border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-indigo-500 resize-none"
            ></textarea>

            {/* Character Counter */}
            <p className="text-xs text-gray-400">
              {formData.message.length}/500 characters
            </p>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-fit px-8 py-2 rounded-md font-medium transition text-white
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {loading ? "Sending Message..." : "Send Message"}
            </button>

            {/* Note */}
            <p className="text-xs text-indigo-400 mt-1">
              We usually respond within 24 hours.
            </p>
          </form>
        </div>

        {/* Contact Info */}
        <div className="flex-1 flex flex-col gap-6 text-indigo-500">
          <div>
            <b className="text-indigo-800">Email</b>
            <p>amdsahbaz19@gmail.com</p>
          </div>

          <div>
            <b className="text-indigo-800">Phone</b>
            <p>+91 62077 85640</p>
          </div>

          <div>
            <b className="text-indigo-800">Location</b>
            <p>Hyderabad, India</p>
          </div>

          <div className="text-sm text-indigo-400">
            Support available Monday – Saturday, 9AM – 6PM
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
