import React, { useRef } from "react";
import { ChevronRight, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Essential {
  name: string;
  discount: string;
  image: string;
}

interface Props {
  items: Essential[];
}

export default function EssentialsSection({ items }: Props) {
  const gridRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate("/products", {
      state: {
        category: "Groceries",
        selectedCategory: "Groceries",
      },
    });
  };

  const handleItemClick = (itemName: string) => {
    navigate("/products", {
      state: {
        category: itemName,
        selectedCategory: itemName,
      },
    });
  };

  return (
    <div className="py-8 sm:py-12 md:py-16 lg:py-20 border-b border-mm-border bg-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section title - Button always on right */}
        <div className="flex flex-row items-start justify-between mb-6 sm:mb-8 md:mb-10 gap-3 sm:gap-4">
          <div className="flex-1 min-w-0 space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <ShoppingBag size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6 text-mm-blue flex-shrink-0" />
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-mm-text leading-tight">
                Daily <span className="text-mm-blue">Essentials</span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm md:text-base text-mm-text-secondary max-w-2xl leading-relaxed">
              Fresh groceries and daily essentials delivered to your doorstep
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

        {/* Decorative underline */}
        <div className="relative mb-8 sm:mb-10 md:mb-12">
          <div className="h-1 sm:h-1.5 w-16 sm:w-20 md:w-24 bg-mm-blue rounded-full"></div>
          <div className="absolute top-0 left-20 sm:left-24 md:left-28 h-1 sm:h-1.5 w-24 sm:w-32 md:w-40 bg-mm-blue/30 rounded-full"></div>
        </div>

        {/* Essentials grid - Responsive columns */}
        <div ref={gridRef} className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              onClick={() => handleItemClick(item.name)}
              className="group relative flex flex-col cursor-pointer"
            >
              {/* Card container */}
              <div className={`relative rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 ${
                index === 0 
                  ? "bg-gradient-to-br from-mm-light-bg via-white to-mm-light-bg-2 border-2 border-mm-blue/30 shadow-lg group-hover:shadow-xl group-hover:border-mm-blue/50" 
                  : "bg-white border-2 border-mm-border shadow-sm group-hover:shadow-xl group-hover:border-mm-blue/30 group-hover:bg-mm-light-bg"
              }`}>
                {/* Featured badge */}
                {index === 0 && (
                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-20 bg-mm-blue text-white text-[9px] sm:text-[10px] font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-md">
                    Featured
                  </div>
                )}

                {/* Image container */}
                <div className="relative bg-gradient-to-b from-mm-light-bg-2 to-white h-32 sm:h-36 md:h-40 lg:h-44 xl:h-48 flex items-center justify-center overflow-hidden p-3 sm:p-4">
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-mm-blue/10 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Image */}
                  <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  {/* Decorative corner element */}
                  <div className="absolute top-0 right-0 w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-mm-blue/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Info section */}
                <div className="p-3 sm:p-4 md:p-5 text-center space-y-1.5 sm:space-y-2 bg-white/50 backdrop-blur-sm">
                  <h3 className={`font-semibold text-xs sm:text-sm md:text-base transition-colors duration-300 truncate ${
                    index === 0 
                      ? "text-mm-blue" 
                      : "text-mm-text group-hover:text-mm-blue"
                  }`}>
                    {item.name}
                  </h3>
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                    <span className="inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] sm:text-xs font-bold rounded-full shadow-sm">
                      {item.discount}
                    </span>
                  </div>
                </div>

                {/* Hover indicator bar */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-mm-blue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
