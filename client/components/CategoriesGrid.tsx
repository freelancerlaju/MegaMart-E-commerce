import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Sparkles } from "lucide-react";

interface Category {
  name: string;
  image: string;
}

interface Props {
  categories: Category[];
  allProducts?: any[];
}

export default function CategoriesGrid({ categories, allProducts = [] }: Props) {
  const gridRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate("/products");
  };

  const handleCategoryClick = (categoryName: string) => {
    // Filter products by category
    const categoryProducts = allProducts.filter(
      (product) => product.category === categoryName
    );
    
    // Navigate to ProductsListing with filtered products and category
    navigate("/products", {
      state: {
        products: categoryProducts,
        category: categoryName,
        selectedCategory: categoryName,
      },
    });
  };

  return (
    <div className="py-8 sm:py-12 md:py-16 lg:py-20 border-b border-mm-border bg-gradient-to-b from-white to-mm-light-bg/30 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section title - Button always on right */}
        <div className="flex flex-row items-start justify-between mb-6 sm:mb-8 md:mb-10 gap-3 sm:gap-4">
          <div className="flex-1 min-w-0 space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <Sparkles size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6 text-mm-blue flex-shrink-0" />
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-mm-text leading-tight">
                Shop From <span className="text-mm-blue">Top Categories</span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm md:text-base text-mm-text-secondary max-w-2xl leading-relaxed">
              Explore our wide range of products across different categories
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

        {/* Categories grid - Responsive columns */}
        <div ref={gridRef} className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => handleCategoryClick(category.name)}
              className="group relative flex flex-col items-center gap-2 sm:gap-3 md:gap-4 cursor-pointer"
            >
              {/* Category card with modern design */}
              <div className="relative w-full aspect-square max-w-[140px] sm:max-w-[120px] md:max-w-[140px] lg:max-w-[150px] mx-auto">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-mm-blue/20 rounded-2xl sm:rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Main circle container */}
                <div className={`relative w-full h-full rounded-2xl sm:rounded-3xl flex items-center justify-center transition-all duration-300 ${
                  index === 1 
                    ? "bg-gradient-to-br from-mm-light-bg via-white to-mm-light-bg-2 border-2 border-mm-blue/30 shadow-lg group-hover:shadow-xl group-hover:border-mm-blue/50" 
                    : "bg-white border-2 border-mm-border shadow-sm group-hover:shadow-lg group-hover:border-mm-blue/30 group-hover:bg-mm-light-bg"
                }`}>
                  {/* Image container */}
                  <div className="relative z-10 p-4 sm:p-4 md:p-5 w-full h-full flex items-center justify-center">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  {/* Badge for featured category */}
                  {index === 1 && (
                    <div className="absolute -top-2 sm:-top-2 -right-2 sm:-right-2 bg-mm-blue text-white text-[10px] sm:text-[10px] font-bold px-2 sm:px-2 py-1 sm:py-1 rounded-full shadow-md">
                      Popular
                    </div>
                  )}
                </div>

                {/* Hover indicator */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-1 bg-mm-blue rounded-full group-hover:w-10 sm:group-hover:w-10 md:group-hover:w-12 transition-all duration-300"></div>
              </div>

              {/* Category name */}
              <div className="text-center space-y-1 sm:space-y-1 w-full mt-1 sm:mt-0">
                <span className={`block text-sm sm:text-sm md:text-base font-semibold transition-colors duration-300 truncate ${
                  index === 1 
                    ? "text-mm-blue" 
                    : "text-mm-text group-hover:text-mm-blue"
                }`}>
                  {category.name}
                </span>
                {index === 1 && (
                  <span className="block text-xs sm:text-xs text-mm-text-secondary">
                    Most Popular
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
