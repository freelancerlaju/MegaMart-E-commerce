import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    id: 1,
    title: "SMART WEARABLE",
    subtitle: "Best Deal Online",
    description: "UP TO 80% OFF",
    badge: "Limited Time",
    image: "/Assets/hero-smart-watch.png",
    gradient: "from-blue-600 via-purple-600 to-indigo-700",
  },
  {
    id: 2,
    title: "DAILY ESSENTIALS",
    subtitle: "Stock Up Now",
    description: "STARTING AT JUST $1.99",
    badge: "New Arrivals",
    image: "/Assets/hero-groceries.png",
    gradient: "from-green-600 via-emerald-600 to-teal-700",
  },
  {
    id: 3,
    title: "TRENDING ELECTRONICS",
    subtitle: "Latest Gadgets",
    description: "SAVE UP TO 60%",
    badge: "Hot Deal",
    image: "/Assets/hero-headphone.png",
    gradient: "from-orange-600 via-red-600 to-pink-700",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!slides.length) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrent(index);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full bg-gradient-to-b from-mm-light-bg to-white px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-mm-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="relative bg-gradient-to-br from-mm-dark via-mm-dark to-gray-900 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl min-h-[380px] sm:min-h-[420px] md:min-h-[360px] lg:min-h-[400px]">
          {/* Animated gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${slides[current].gradient} opacity-20 transition-opacity duration-1000`}></div>
          
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>

          {/* Main content */}
          <div className="relative z-10 h-full flex flex-col md:flex-row items-center px-8 sm:px-10 md:px-14 lg:px-16 py-4 sm:py-6 md:py-8 gap-4 md:gap-8">
            {/* Image - Show first on mobile */}
            <div className="flex-1 flex justify-center items-center relative w-full md:w-auto min-w-0 order-1 md:order-2">
              <div className="relative max-w-full">
                {/* Glow effect behind image */}
                <div className="absolute inset-0 bg-mm-blue/30 rounded-full blur-3xl scale-150"></div>
                
                {/* Image container */}
                <div className="relative z-10 animate-float">
                  <img
                    src={slides[current].image}
                    alt={slides[current].title}
                    className="h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72 object-contain drop-shadow-2xl transition-all duration-700 transform scale-100 max-w-full"
                  />
                </div>

                {/* Floating elements */}
                <div className="absolute -top-2 -right-2 w-12 h-12 bg-mm-blue/20 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute -bottom-2 -left-2 w-10 h-10 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-300"></div>
              </div>
            </div>

            {/* Content - Show second on mobile */}
            <div className="flex-1 text-white z-10 text-center md:text-left space-y-2 sm:space-y-3 md:space-y-4 min-w-0 order-2 md:order-1">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <Sparkles size={12} className="text-mm-blue" />
                <span className="text-xs font-semibold text-white">
                  {slides[current].badge}
                </span>
              </div>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm md:text-base font-medium text-white/80 uppercase tracking-wider">
                {slides[current].subtitle}
              </p>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl  font-bold leading-tight">
                <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                  {slides[current].title}
                </span>
              </h1>

              {/* Description */}
              <div className="flex flex-col sm:flex-row items-center md:items-start gap-2 sm:gap-3">
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-mm-blue">
                  {slides[current].description}
                </p>
              </div>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-1 pb-8 sm:pb-0 justify-center md:justify-start">
                <button
                  onClick={() => navigate("/products")}
                  className="group inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 bg-mm-blue text-white rounded-lg font-semibold text-xs sm:text-sm hover:bg-mm-blue/90 hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Shop Now
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => navigate("/products")}
                  className="group inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 bg-white/10 backdrop-blur-md border-2 border-white/20 text-white rounded-lg font-semibold text-xs sm:text-sm hover:bg-white/20 hover:border-white/30 transition-all duration-300"
                >
                  Explore More
                </button>
              </div>

              {/* Carousel indicators - Show inside content on mobile, absolute on desktop */}
              <div className="flex items-center justify-center gap-2 pt-2 md:hidden">
                {slides.map((slide, index) => (
                  <button
                    key={slide.id}
                    onClick={() => goToSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === current
                        ? "w-6 bg-mm-blue shadow-lg shadow-mm-blue/50"
                        : "w-2 bg-white/40 hover:bg-white/60"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Carousel indicators - Positioned absolutely at bottom center for desktop */}
          {slides.length > 1 && (
            <div className="hidden md:flex absolute bottom-10 lg:bottom-12 left-1/2 -translate-x-1/2 z-20 items-center justify-center gap-2">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === current
                      ? "w-8 bg-mm-blue shadow-lg shadow-mm-blue/50"
                      : "w-2 bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Navigation buttons */}
          {slides.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-white/95 backdrop-blur-md rounded-full p-1.5 sm:p-2 md:p-2.5 hover:bg-white hover:shadow-xl hover:scale-110 transition-all duration-300 group shadow-lg"
                aria-label="Previous slide"
              >
                <ChevronLeft className="text-mm-blue group-hover:text-mm-blue/80" size={16} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2  top-1/2 -translate-y-1/2 z-30 bg-white/95 backdrop-blur-md rounded-full p-1.5 sm:p-2 md:p-2.5 hover:bg-white hover:shadow-xl hover:scale-110 transition-all duration-300 group shadow-lg"
                aria-label="Next slide"
              >
                <ChevronRight className="text-mm-blue group-hover:text-mm-blue/80" size={16} />
              </button>
            </>
          )}

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
            <div 
              className="h-full bg-mm-blue transition-all duration-5000 ease-linear"
              style={{ width: `${((current + 1) / slides.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .delay-300 {
          animation-delay: 1.5s;
        }
      `}</style>
    </div>
  );
}
