import React from "react";

const NewsLetterBox = () => {
  const onSubmitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-indigo-800">
        Get 20% Off on Your First Order
      </p>
      <p className="text-indigo-500">
        Be the first to know about new arrivals, special offers, and updates.
      </p>
      <form
        onSubmit={onSubmitHandler}
        className="mt-4 w-full sm:w-1/2  mx-auto flex items-center gap-3 my-6 border-gray-300  pl-3"
      >
        <input
          className=" sm:flex-1  rounded w-full border border-gray-300  px-5 py-3 outline-none focus:border-indigo-500"
          type="email"
          placeholder="Enter your email"
          required
        />
        <button
          className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-6 py-3 rounded font-medium"
          type="submit"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsLetterBox;
