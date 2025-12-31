import React from "react";
import Title from "../components/Title";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // submit logic later
  };

  return (
    <div className="border-t pt-10 mt-10">
      {/* Page Heading */}
      <div className="text-center text-2xl mb-10">
        <Title text1={"CONTACT"} text2={"US"} />
        <p className="text-indigo-500 text-sm mt-2">
          We’re here to help. Reach out to us anytime.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-14 mb-20">
        {/* Contact Form */}
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name */}
            <input
              type="text"
              placeholder="Full Name"
              required
              className="border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-indigo-500"
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Email Address"
              required
              className="border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-indigo-500"
            />

            {/* Subject Dropdown */}
            <select
              className="border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-indigo-500 text-gray-600"
              required
            >
              <option value="">Select a subject</option>
              <option>Order Issue</option>
              <option>Payment Issue</option>
              <option>Return & Refund</option>
              <option>General Inquiry</option>
            </select>

            {/* Message */}
            <textarea
              rows="5"
              placeholder="Write your message here..."
              required
              className="border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-indigo-500 resize-none"
            ></textarea>

            {/* Submit */}
            <button
              type="submit"
              className="w-fit bg-indigo-600 text-white px-8 py-2 rounded-md font-medium hover:bg-indigo-700 transition"
            >
              Send Message
            </button>

            {/* Response Time Note */}
            <p className="text-xs text-indigo-400 mt-1">
              We usually respond within 24 hours.
            </p>
          </form>
        </div>

        {/* Contact Info */}
        <div className="flex-1 flex flex-col gap-6 text-indigo-500">
          <div>
            <b className="text-indigo-800">Email</b>
            <p>support@bazario.com</p>
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
