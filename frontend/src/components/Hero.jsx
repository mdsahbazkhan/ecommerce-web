
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center bg-slate-50">
      {/* Hero Left */}
      <div className="w-full sm:w-1/2 flex items-center justify-center px-6 sm:px-12 py-16">
        <div className="text-[#414141] max-w-md">
          {/* Small Heading */}
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-[2px] bg-indigo-800"></span>
            <p className="font-medium text-sm uppercase tracking-wide text-indigo-800">
              Our Bestsellers
            </p>
          </div>

          {/* Main Heading */}
          <h1 className="prata-regular text-4xl lg:text-5xl leading-tight mb-6">
            New Season Picks
          </h1>

          {/* CTA */}
          <div className="flex items-center gap-4 cursor-pointer group">
            <p className="text-sm md:text-base font-medium text-indigo-800">
              SHOP NOW
            </p>
            <span className="w-10 h-[2px] bg-indigo-800 transition-all duration-300 group-hover:w-16"></span>
          </div>
        </div>
      </div>

      {/* Hero Right */}
      <div className="w-full sm:w-1/2">
        <img
          src={assets.hero_img}
          alt="Hero Image"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Hero;
