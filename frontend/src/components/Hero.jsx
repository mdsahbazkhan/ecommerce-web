import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const slides = [
  {
    image: assets.hero_img,
    title: "New Season Picks",
    subtitle: "Our Bestsellers",
    description: "Discover the latest trends and styles for the new season.",
  },
  {
    image: assets.p_img2_1,
    title: "Summer Collection",
    subtitle: "New Arrivals",
    description: "Explore our fresh summer styles perfect for any occasion.",
  },
  {
    image: assets.p_img3,
    title: "Premium Quality",
    subtitle: "Top Rated",
    description: "Handpicked designs that combine comfort and elegance.",
  },
  {
    image: assets.p_img4,
    title: "Fashion Forward",
    subtitle: "Trending Now",
    description: "Stay ahead with our curated fashion selections.",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-50 mt-10 overflow-hidden relative">
      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float z-0"></div>
      <div
        className="absolute bottom-10 left-10 w-72 h-72 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float z-0"
        style={{ animationDelay: "2s" }}
      ></div>

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
              {slides[currentSlide].subtitle}
            </p>
          </div>

          {/* Main Heading */}
          <h1
            className="prata-regular text-5xl lg:text-6xl leading-tight mb-4 text-slate-900 animate-fadeInUp"
            style={{ animationDelay: "300ms" }}
          >
            {slides[currentSlide].title}
          </h1>

          {/* Description */}
          <p
            className="text-slate-600 mb-6 animate-fadeInUp"
            style={{ animationDelay: "350ms" }}
          >
            {slides[currentSlide].description}
          </p>

          {/* CTA */}
          <Link
            to="/collection"
            className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-full font-bold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 group animate-fadeInUp"
            style={{ animationDelay: "400ms" }}
          >
            <p className="text-sm md:text-base">SHOP NOW</p>
            <span className="transform transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </Link>

          {/* Slider Dots */}
          <div className="flex gap-2 mt-8">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "bg-cyan-500 w-8"
                    : "bg-cyan-300 hover:bg-cyan-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Hero Right - Slider */}
      <div className="w-full sm:w-1/2 relative overflow-hidden h-[400px] sm:h-[500px]">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-sky-500/10 z-10"></div>

        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-110"
            />
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 z-20"
          aria-label="Previous slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 text-slate-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 z-20"
          aria-label="Next slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 text-slate-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>

        {/* Slide Counter */}
        <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-slate-700 z-20">
          {currentSlide + 1} / {slides.length}
        </div>
      </div>
    </div>
  );
};

export default Hero;
