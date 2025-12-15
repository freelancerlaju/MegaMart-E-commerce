import React, { useState, useRef, useEffect } from "react";
import { ChevronRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Brand {
  name: string;
  label: string;
  discount: string;
  bgColor: string;
  labelBg: string;
  textColor?: string;
  image: string;
}

interface Props {
  brands: Brand[];
}

export default function BrandsCarousel({ brands }: Props) {
  const [current, setCurrent] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  // Responsive card width calculation
  const getCardWidth = () => {
    if (typeof window === 'undefined') return 240;
    const width = window.innerWidth;
    if (width < 640) return 240; // Mobile
    if (width < 768) return 260; // Small tablet
    if (width < 1024) return 280; // Tablet
    return 280; // Desktop
  };

  const getCardsPerView = () => {
    if (typeof window === 'undefined') return 1;
    const width = window.innerWidth;
    if (width < 640) return 1; // Mobile: 1 card
    if (width < 768) return 1.5; // Small tablet: 1.5 cards
    if (width < 1024) return 2; // Tablet: 2 cards
    return 3; // Desktop: 3 cards
  };

  const [cardsPerView, setCardsPerView] = useState(getCardsPerView());

  // Update cardsPerView on resize
  useEffect(() => {
    const handleResize = () => {
      setCardsPerView(getCardsPerView());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-play carousel
  useEffect(() => {
    const maxIndex = Math.max(0, Math.floor(brands.length - cardsPerView));
    if (maxIndex <= 0) return; // Don't auto-play if all cards fit on screen

    const interval = setInterval(() => {
      setCurrent((prev) => {
        const next = prev + 1;
        // If we've reached the end, loop back to start
        if (next > maxIndex) {
          return 0;
        }
        return next;
      });
    }, 3000); // Auto-play every 3 seconds

    return () => clearInterval(interval);
  }, [brands.length, cardsPerView]);

  // Scroll carousel when current changes
  useEffect(() => {
    if (carouselRef.current) {
      const cardWidth = getCardWidth();
      const gap = window.innerWidth < 640 ? 16 : window.innerWidth < 768 ? 24 : 32;
      const scrollPosition = current * (cardWidth + gap);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [current]);

  const handleViewAll = () => {
    navigate("/products", {
      state: {
        category: "Electronics",
        selectedCategory: "Electronics",
      },
    });
  };

  const handleBrandClick = (brandName: string) => {
    navigate("/products", {
      state: {
        category: brandName,
        selectedCategory: brandName,
      },
    });
  };

  const handleIndicatorClick = (index: number) => {
    setCurrent(index);
  };

  return (
    <div className="py-6 sm:py-8 md:py-10 lg:py-12 border-b border-mm-border bg-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section title - Responsive header */}
        <div className="flex flex-row items-start justify-between mb-4 sm:mb-5 md:mb-6 gap-3 sm:gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
              <div className="w-1 h-5 sm:h-6 md:h-7 bg-mm-blue rounded-full flex-shrink-0"></div>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-mm-text leading-tight">
                Top <span className="text-mm-blue">Electronics Brands</span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-mm-text-secondary ml-3 sm:ml-4 max-w-xl">
              Premium electronics from trusted brands
            </p>
          </div>
          <button
            onClick={handleViewAll}
            className="group inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-mm-light-bg hover:bg-mm-blue text-mm-text hover:text-white rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 whitespace-nowrap flex-shrink-0 border-2 border-mm-border hover:border-mm-blue"
          >
            <span>View All</span>
            <ChevronRight size={14} className="sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
          </button>
        </div>

        {/* Brands carousel - Smaller responsive card style */}
        <div 
          ref={carouselRef} 
          className="flex gap-3 sm:gap-4 md:gap-5 overflow-x-hidden pb-4 -mx-2 px-2 scroll-smooth snap-x snap-mandatory hide-scrollbar"
        >
          {brands.map((brand, index) => (
            <div
              key={brand.name}
              onClick={() => handleBrandClick(brand.name)}
              className="group flex-shrink-0 w-[240px] sm:w-[260px] md:w-[280px] relative cursor-pointer snap-start"
            >
              {/* Card container - Matching ProductSection style */}
              <div className="relative bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:shadow-mm-blue/5 transition-all duration-500 ease-in-out border-2 border-mm-border hover:border-mm-blue/50 h-full min-h-[240px] sm:min-h-[260px] md:min-h-[280px]">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-mm-blue/5 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Colored accent bar */}
                <div 
                  className="h-1 sm:h-1.5 w-full"
                  style={{ backgroundColor: brand.bgColor }}
                ></div>

                {/* Card content */}
                <div className="p-3 sm:p-4 md:p-5 flex flex-col h-[calc(100%-4px)] sm:h-[calc(100%-6px)]">
                  {/* Top section - Brand label */}
                  <div className="flex items-start justify-between mb-2 sm:mb-3">
                    <div
                      className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full font-bold text-[9px] sm:text-[10px] tracking-wider uppercase shadow-sm"
                      style={{ backgroundColor: brand.labelBg, color: brand.textColor || "#222" }}
                    >
                      {brand.label}
                    </div>
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/95 backdrop-blur-sm border-2 border-mm-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0 shadow-sm hover:scale-110 hover:border-mm-blue">
                      <ChevronRight size={12} className="sm:w-3.5 sm:h-3.5 text-mm-blue" />
                    </div>
                  </div>

                  {/* Image section */}
                  <div 
                    className="flex-1 rounded-lg sm:rounded-xl overflow-hidden mb-2 sm:mb-3 relative flex items-center justify-center min-h-[100px] sm:min-h-[120px] md:min-h-[140px]"
                    style={{ backgroundColor: brand.bgColor }}
                  >
                    {/* Pattern overlay */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, ${brand.textColor || '#222'} 1px, transparent 0)`,
                        backgroundSize: '18px 18px'
                      }}></div>
                    </div>
                    
                    {/* Image glow effect */}
                    <div className="absolute inset-0 bg-mm-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="relative z-10 h-24 sm:h-28 md:h-32 object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Bottom section - Discount */}
                  <div className="space-y-1 sm:space-y-1.5">
                    <div className="flex items-baseline gap-2">
                      <p
                        className="text-xl sm:text-2xl md:text-3xl font-black leading-none"
                        style={{ color: brand.textColor || "#222" }}
                      >
                        {brand.discount}
                      </p>
                    </div>
                    <div className="h-0.5 w-8 sm:w-10 bg-mm-blue rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute top-1.5 right-1.5 w-10 h-10 sm:w-12 sm:h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div 
                    className="w-full h-full rounded-full blur-xl"
                    style={{ backgroundColor: brand.bgColor, opacity: 0.3 }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel indicators - Responsive minimalist dots */}
        {brands.length > Math.floor(cardsPerView) && (
          <div className="flex gap-1.5 sm:gap-2 mt-4 sm:mt-5 justify-center items-center">
            {Array.from({ length: Math.max(1, Math.floor(brands.length - cardsPerView) + 1) }).map((_, i) => (
              <button
                key={i}
                onClick={() => handleIndicatorClick(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current 
                    ? "w-2 h-2 sm:w-2.5 sm:h-2.5 bg-mm-blue ring-2 ring-mm-blue/20" 
                    : "w-1.5 h-1.5 sm:w-2 sm:h-2 bg-mm-border hover:bg-mm-blue/60 hover:scale-125"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              ></button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
