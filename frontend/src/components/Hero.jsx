import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-50 mt-20 overflow-hidden relative">
      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{animationDelay: '2s'}}></div>
      
      {/* Hero Left */}
      <div className="w-full sm:w-1/2 flex items-center justify-center px-6 sm:px-12 py-20 relative z-10">
        <div className="text-slate-900 max-w-md">
          {/* Small Heading */}
          <div className="flex items-center gap-3 mb-6 animate-fadeInUp">
            <span className="w-12 h-[2px] bg-gradient-to-r from-cyan-500 to-cyan-600 transform origin-left animate-scaleIn"></span>
            <p
              className="font-bold text-sm uppercase tracking-wider text-cyan-600 animate-fadeIn"
              style={{ animationDelay: "200ms" }}
            >
              Our Bestsellers
            </p>
          </div>

          {/* Main Heading */}
          <h1
            className="prata-regular text-5xl lg:text-6xl leading-tight mb-6 text-slate-900 animate-fadeInUp"
            style={{ animationDelay: "300ms" }}
          >
            New Season Picks
          </h1>

          {/* CTA */}
          <Link
            to="/collection"
            className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-full font-bold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 group animate-fadeInUp"
            style={{ animationDelay: "400ms" }}
          >
            <p className="text-sm md:text-base">SHOP NOW</p>
            <span className="transform transition-transform duration-300 group-hover:translate-x-2">→</span>
          </Link>
        </div>
      </div>

      {/* Hero Right */}
      <div className="w-full sm:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-sky-500/10 z-10"></div>
        <img
          src={assets.hero_img}
          alt="Hero Image"
          className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-110 animate-scaleIn"
          style={{ animationDelay: "200ms" }}
        />
      </div>
    </div>
  );
};

export default Hero;
