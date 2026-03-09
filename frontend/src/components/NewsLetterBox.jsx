import React, { useState } from "react";

const NewsLetterBox = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail("");
      }, 3000);
    }
  };

  return (
    <div
      className="text-center py-20 px-6 bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-50 rounded-3xl my-12 mx-4 shadow-xl animate-fadeInUp relative overflow-hidden"
      style={{ animationDelay: "200ms" }}
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
      
      <div className="relative z-10">
        <p
          className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 animate-fadeIn"
          style={{ animationDelay: "300ms" }}
        >
          Get 20% Off on Your First Order
        </p>
        <p
          className="text-slate-600 mb-8 text-base md:text-lg animate-fadeIn"
          style={{ animationDelay: "400ms" }}
        >
          Be the first to know about new arrivals, special offers, and updates.
        </p>
        <form
          onSubmit={onSubmitHandler}
          className="mt-6 w-full sm:w-2/3 lg:w-1/2 mx-auto flex flex-col sm:flex-row items-center gap-4 animate-fadeInUp"
          style={{ animationDelay: "500ms" }}
        >
          <input
            className="sm:flex-1 w-full rounded-xl border-2 border-slate-200 px-6 py-4 outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition-all duration-300 bg-white shadow-md text-slate-900"
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 transition-all duration-300 text-white px-10 py-4 rounded-xl font-bold transform hover:scale-105 hover:shadow-xl active:scale-95 shadow-lg"
            type="submit"
          >
            {isSubmitted ? "Subscribed! ✓" : "Subscribe"}
          </button>
        </form>

        {/* Success Message Animation */}
        {isSubmitted && (
          <div className="mt-6 text-cyan-600 font-bold text-lg animate-bounceIn bg-white/80 backdrop-blur-sm py-3 px-6 rounded-full inline-block shadow-lg">
            ✓ Thanks for subscribing! Check your email for 20% off.
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsLetterBox;
