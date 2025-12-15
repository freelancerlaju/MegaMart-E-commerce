import React from "react";
import { ChevronRight, Star, ShoppingCart, Heart, Smartphone, Plus, Minus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";

interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice: string;
  save: string;
  discount: string;
  image: string;
  category?: string;
  rating?: number;
  reviews?: number;
  inStock?: number;
  featured?: boolean;
}

interface Props {
  title: string;
  highlight: string;
  products: Product[];
}

export default function ProductSection({ title, highlight, products }: Props) {
  const navigate = useNavigate();
  const { addToCart, cart, updateQuantity, removeFromCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  
  // Show first 12 products initially
  const visibleProducts = products.slice(0, 12);

  const handleViewAll = () => {
    // Navigate to ProductsListing page with products data
    navigate("/products", { state: { products, category: highlight } });
  };

  const handleAddToCart = (product: Product) => {
    // Add product to cart using context (toast notification is handled in CartContext)
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
    });
  };

  const handleToggleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      // Toast notification is handled in WishlistContext
      return;
    }

    addToWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
    });
    // Toast notification is handled in WishlistContext
  };

  const renderStars = (rating: number = 5) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={10}
        className={i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
      />
    ));
  };

  return (
    <div className="py-8 sm:py-12 md:py-16 lg:py-20 border-b border-mm-border bg-gradient-to-b from-white to-mm-light-bg/20 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section title - Professional header */}
        <div className="flex flex-row items-start justify-between mb-6 sm:mb-8 md:mb-10 gap-3 sm:gap-4">
          <div className="flex-1 min-w-0 space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Icon with badge background */}
              <div className="relative">
                <div className="absolute inset-0 bg-mm-blue/10 rounded-xl blur-md"></div>
                <div className="relative bg-gradient-to-br from-mm-blue/20 to-mm-blue/5 p-2.5 rounded-xl border border-mm-blue/20">
                  <Smartphone size={24} className="text-mm-blue" strokeWidth={2.5} />
                </div>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-mm-text leading-tight">
                {title} <span className="text-mm-blue">{highlight}</span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm md:text-base text-mm-text-secondary max-w-2xl leading-relaxed">
              Discover the latest smartphones with cutting-edge technology and unbeatable prices
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
          <div className="h-2 w-24 bg-mm-blue rounded-full shadow-sm shadow-mm-blue/30"></div>
          <div className="absolute top-0 left-28 h-2 w-40 bg-mm-blue/25 rounded-full"></div>
        </div>

        {/* Products grid - Enhanced modern design */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {visibleProducts.map((product) => {
            const isOnSale = parseInt(product.discount.replace("%", "")) > 20;
            
            return (
              <div
                key={product.id}
                className={`h-full flex flex-col bg-white border-2 rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:shadow-mm-blue/5 transition-all duration-500 ease-in-out relative group ${
                  product.featured ? "border-mm-blue/50 shadow-md shadow-mm-blue/5" : "border-mm-border hover:border-mm-blue/50"
                }`}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-mm-blue/5 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Badges */}
                {isOnSale && (
                  <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm z-20">
                    Sale!
                  </div>
                )}
                <div className="absolute top-2 right-2 z-20 flex flex-col items-end gap-2">
                  <div className="bg-mm-blue text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
                    {product.discount} OFF
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleToggleWishlist(product);
                    }}
                    className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-white/95 backdrop-blur-sm border-2 border-mm-border flex items-center justify-center shadow-sm hover:scale-110 hover:border-mm-blue transition-all duration-300"
                    aria-label="Toggle wishlist"
                  >
                    <Heart
                      size={16}
                      className={isInWishlist(product.id) ? "text-red-500 fill-red-500" : "text-mm-text-secondary"}
                    />
                  </button>
                </div>

                {/* Product Image */}
                <Link 
                  to={`/product/${product.id}`} 
                  state={{ product }} 
                  className="block overflow-hidden"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    document.documentElement.scrollTop = 0;
                    document.body.scrollTop = 0;
                  }}
                >
                  <div className="bg-gradient-to-b from-mm-light-bg-2 to-white h-36 sm:h-40 md:h-44 flex items-center justify-center p-3 sm:p-4 group-hover:from-mm-light-bg group-hover:to-mm-light-bg-2 transition-all duration-500 relative">
                    {/* Image glow effect */}
                    <div className="absolute inset-0 bg-mm-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="relative z-10 max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500 ease-in-out" 
                    />
                  </div>
                </Link>

                {/* Product Info */}
                <div className="p-3 sm:p-4 flex flex-col gap-2 flex-1 bg-white/50 backdrop-blur-sm">
                  {/* Category */}
                  {product.category && (
                    <div className="text-[10px] sm:text-xs font-bold text-mm-blue uppercase tracking-wider">
                      {product.category}
                    </div>
                  )}

                  {/* Product Name */}
                  <Link 
                    to={`/product/${product.id}`} 
                    state={{ product }}
                    onClick={() => {
                      window.scrollTo(0, 0);
                      document.documentElement.scrollTop = 0;
                      document.body.scrollTop = 0;
                    }}
                  >
                    <h3 className="font-bold text-xs sm:text-sm text-mm-text hover:text-mm-blue transition-colors duration-300 line-clamp-2 leading-tight mb-1">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Rating */}
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center">{renderStars(product.rating || 5)}</div>
                    <span className="text-[10px] text-mm-text-secondary">
                      {product.rating || 5} ({product.reviews || 5})
                    </span>
                  </div>

                  {/* Stock Status */}
                  {product.inStock !== undefined && (
                    <div className="text-[10px] text-mm-success font-semibold">
                      In Stock ({product.inStock})
                    </div>
                  )}

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mt-auto">
                    <span className="text-base sm:text-lg font-bold text-mm-text">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs sm:text-sm text-mm-text-secondary line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Add to Cart Button or Quantity Controls */}
                  {(() => {
                    const cartItem = cart.find(item => item.id === product.id);
                    const quantity = cartItem?.quantity || 0;
                    const priceValue = parseFloat(product.price.replace(/[BDT ,]/g, ""));
                    const subtotal = priceValue * quantity;

                    if (cartItem && quantity > 0) {
                      return (
                        <div className="mt-2 min-h-[40px] sm:min-h-[44px] flex flex-col justify-center">
                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between gap-2 bg-mm-light-bg rounded-lg p-1.5 sm:p-2 border border-mm-border">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (quantity > 1) {
                                  updateQuantity(product.id, quantity - 1);
                                } else {
                                  removeFromCart(product.id);
                                }
                              }}
                              className="p-1 sm:p-1.5 bg-white rounded-lg border border-mm-border hover:border-mm-blue hover:bg-mm-blue hover:text-white transition-all duration-300 flex items-center justify-center flex-shrink-0"
                            >
                              <Minus size={12} className="sm:w-3.5 sm:h-3.5" />
                            </button>
                            <div className="flex-1 flex flex-col items-center justify-center min-w-0">
                              <span className="text-xs sm:text-sm font-bold text-mm-text">
                                {quantity}
                              </span>
                              <span className="text-[10px] text-mm-text-secondary font-medium leading-tight">
                                BDT {subtotal.toLocaleString()}
                              </span>
                            </div>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                updateQuantity(product.id, quantity + 1);
                              }}
                              className="p-1 sm:p-1.5 bg-white rounded-lg border border-mm-border hover:border-mm-blue hover:bg-mm-blue hover:text-white transition-all duration-300 flex items-center justify-center flex-shrink-0"
                            >
                              <Plus size={12} className="sm:w-3.5 sm:h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                        className="mt-2 w-full py-2 sm:py-2.5 px-3 bg-mm-blue text-white rounded-lg hover:bg-mm-blue/90 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold shadow-sm hover:shadow-md hover:shadow-mm-blue/10 min-h-[40px] sm:min-h-[44px]"
                      >
                        <ShoppingCart size={16} />
                        Add to Cart
                      </button>
                    );
                  })()}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
