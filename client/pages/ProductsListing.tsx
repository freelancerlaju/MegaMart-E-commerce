import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Heart, ShoppingCart, Star, Flame, ChevronLeft, Plus, Minus } from "lucide-react";
import toast from "react-hot-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ShimmerSkeleton } from "@/components/ui/shimmer-skeleton";
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
  brand?: string;
  rating?: number;
  reviews?: number;
  inStock?: number;
  featured?: boolean;
}

// Sample products data - in real app, this would come from API or props
const allProducts: Product[] = [
  {
    id: 1,
    name: "Galaxy S22 Ultra",
    price: "BDT 32999",
    originalPrice: "BDT 74999",
    save: "BDT 32999",
    discount: "56%",
    image: "/Assets/oppo-a6-back-side-image.webp",
    category: "Electronics",
    brand: "Samsung",
    rating: 4.5,
    reviews: 1243,
    inStock: 50,
  },
  {
    id: 2,
    name: "Galaxy M13 (4GB | 64 GB )",
    price: "BDT 10499",
    originalPrice: "BDT 14999",
    save: "BDT 4500",
    discount: "56%",
    image: "/Assets/Galaxy-M13.webp",
    category: "Electronics",
    brand: "Samsung",
    rating: 4.2,
    reviews: 856,
    inStock: 30,
    featured: true,
  },
  {
    id: 3,
    name: "Galaxy M33 (4GB | 64 GB )",
    price: "BDT 16999",
    originalPrice: "BDT 24999",
    save: "BDT 8000",
    discount: "56%",
    image: "/Assets/samsung-galaxy-m33.webp",
    category: "Electronics",
    brand: "Samsung",
    rating: 4.3,
    reviews: 642,
    inStock: 25,
  },
  {
    id: 4,
    name: "Galaxy M53 (4GB | 64 GB )",
    price: "BDT 31999",
    originalPrice: "BDT 40999",
    save: "BDT 9000",
    discount: "56%",
    image: "/Assets/Galaxy-M53.png",
    category: "Electronics",
    brand: "Samsung",
    rating: 4.4,
    reviews: 923,
    inStock: 40,
  },
  {
    id: 5,
    name: "Galaxy S22 Ultra",
    price: "BDT 67999",
    originalPrice: "BDT 85999",
    save: "BDT 18000",
    discount: "56%",
    image: "/Assets/Galaxy-S22-Ultra.png",
    category: "Electronics",
    brand: "Samsung",
    rating: 4.6,
    reviews: 1523,
    inStock: 20,
  },
  {
    id: 6,
    name: "Galaxy A54 (8GB | 128 GB )",
    price: "BDT 28999",
    originalPrice: "BDT 34999",
    save: "BDT 6000",
    discount: "17%",
    image: "/Assets/Galaxy-A54.png",
    category: "Electronics",
    brand: "Samsung",
    rating: 4.3,
    reviews: 789,
    inStock: 35,
  },
  {
    id: 7,
    name: "Galaxy A34 (6GB | 128 GB )",
    price: "BDT 22999",
    originalPrice: "BDT 27999",
    save: "BDT 5000",
    discount: "18%",
    image: "/Assets/Galaxy-A34.png",
    category: "Electronics",
    brand: "Samsung",
    rating: 4.1,
    reviews: 567,
    inStock: 45,
  },
  {
    id: 8,
    name: "Galaxy S23 (8GB | 256 GB )",
    price: "BDT 54999",
    originalPrice: "BDT 69999",
    save: "BDT 15000",
    discount: "21%",
    image: "/Assets/Galaxy-S23.png",
    category: "Electronics",
    brand: "Samsung",
    rating: 4.7,
    reviews: 1892,
    inStock: 15,
  },
  {
    id: 9,
    name: "Galaxy Note 20 Ultra",
    price: "BDT 59999",
    originalPrice: "BDT 79999",
    save: "BDT 20000",
    discount: "25%",
    image: "/Assets/GalaxyNote20Ultra.png",
    category: "Electronics",
    brand: "Samsung",
    rating: 4.5,
    reviews: 1124,
    inStock: 10,
  },
  {
    id: 10,
    name: "Galaxy Z Fold 4",
    price: "BDT 124999",
    originalPrice: "BDT 149999",
    save: "BDT 25000",
    discount: "17%",
    image: "/Assets/Galaxy-Z-Fold.png",
    category: "Electronics",
    brand: "Samsung",
    rating: 4.8,
    reviews: 456,
    inStock: 8,
  },
  {
    id: 11,
    name: "Galaxy A14 (4GB | 64 GB )",
    price: "BDT 11999",
    originalPrice: "BDT 15999",
    save: "BDT 4000",
    discount: "25%",
    image: "/Assets/Galaxy-A14.png",
    category: "Electronics",
    brand: "Samsung",
    rating: 4.0,
    reviews: 1234,
    inStock: 60,
  },
  {
    id: 12,
    name: "Galaxy A24 (6GB | 128 GB )",
    price: "BDT 18999",
    originalPrice: "BDT 22999",
    save: "BDT 4000",
    discount: "17%",
    image: "/Assets/Galaxy-A24.png",
    category: "Electronics",
    brand: "Samsung",
    rating: 4.2,
    reviews: 987,
    inStock: 50,
  },
  {
    id: 13,
    name: "Galaxy S21 FE (8GB | 128 GB )",
    price: "BDT 39999",
    originalPrice: "BDT 49999",
    save: "BDT 10000",
    discount: "20%",
    image: "/Assets/Galaxy-S21FE.png",
    category: "Electronics",
    brand: "Samsung",
    rating: 4.4,
    reviews: 1456,
    inStock: 30,
  },
  {
    id: 14,
    name: "Galaxy M14 (4GB | 64 GB )",
    price: "BDT 12999",
    originalPrice: "BDT 17999",
    save: "BDT 5000",
    discount: "28%",
    image: "/Assets/Galaxy-M14.png",
    category: "Electronics",
    brand: "Samsung",
    rating: 4.1,
    reviews: 678,
    inStock: 55,
  },
  {
    id: 15,
    name: "Galaxy A73 (8GB | 128 GB )",
    price: "BDT 34999",
    originalPrice: "BDT 42999",
    save: "BDT 8000",
    discount: "19%",
    image: "/Assets/Galaxy-A73.png",
    category: "Electronics",
    brand: "Samsung",
    rating: 4.3,
    reviews: 890,
    inStock: 40,
  },
  {
    id: 16,
    name: "Galaxy S23 Ultra (12GB | 256 GB )",
    price: "BDT 94999",
    originalPrice: "BDT 119999",
    save: "BDT 25000",
    discount: "21%",
    image: "/Assets/Galaxy-S23.png",
    category: "Electronics",
    brand: "Samsung",
    rating: 4.9,
    reviews: 2341,
    inStock: 12,
  },
  {
    id: 17,
    name: "Galaxy M54 (8GB | 128 GB )",
    price: "BDT 26999",
    originalPrice: "BDT 32999",
    save: "BDT 6000",
    discount: "18%",
    image: "/Assets/Galaxy-M54.png",
    category: "Electronics",
    brand: "Samsung",
    rating: 4.2,
    reviews: 756,
    inStock: 48,
  },
  {
    id: 18,
    name: "Galaxy A52s (8GB | 128 GB )",
    price: "BDT 24999",
    originalPrice: "BDT 29999",
    save: "BDT 5000",
    discount: "17%",
    image: "/Assets/Galaxy-A52s.png",
    category: "Electronics",
    brand: "Samsung",
    rating: 4.3,
    reviews: 1023,
    inStock: 42,
  },
  {
    id: 19,
    name: "Galaxy Z Flip 4",
    price: "BDT 79999",
    originalPrice: "BDT 99999",
    save: "BDT 20000",
    discount: "20%",
    image: "/Assets/Galaxy-Z-Flip-4.png",
    category: "Electronics",
    brand: "Samsung",
    rating: 4.6,
    reviews: 567,
    inStock: 18,
  },
  {
    id: 20,
    name: "Galaxy A04 (3GB | 32 GB )",
    price: "BDT 7999",
    originalPrice: "BDT 9999",
    save: "BDT 2000",
    discount: "20%",
    image: "/Assets/Galaxy-A04.png",
    category: "Electronics",
    brand: "Samsung",
    rating: 3.9,
    reviews: 2341,
    inStock: 70,
  },
];

const categories = ["Electronics", "Fashion", "Sports", "Home & Living", "Books", "Toys & Games"];
const brands = ["Samsung", "Apple", "Xiaomi", "OnePlus", "Realme", "Oppo"];

export default function ProductsListing() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart, cart, updateQuantity, removeFromCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [selectedCategory, setSelectedCategory] = useState<string>(location.state?.selectedCategory || "");
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Simulate loading when navigating from "View All" button
  useEffect(() => {
    // Show loading state for 1.5-2 seconds to simulate data fetching
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [location.state]);

  // Update selectedCategory when location.state changes
  useEffect(() => {
    if (location.state?.selectedCategory) {
      setSelectedCategory(location.state.selectedCategory);
    }
  }, [location.state]);

  // Get products from location state or use default
  const rawProducts = (location.state?.products as Product[]) || allProducts;
  
  // Enrich products with default category and brand if missing
  const products = rawProducts.map((product) => ({
    ...product,
    category: product.category || "Electronics",
    brand: product.brand || "Samsung",
    rating: product.rating || 4.5,
    reviews: product.reviews || Math.floor(Math.random() * 2000) + 100,
    inStock: product.inStock || Math.floor(Math.random() * 50) + 10,
  }));

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    if (selectedCategory && product.category !== selectedCategory) return false;
    if (selectedBrand && product.brand !== selectedBrand) return false;
    if (selectedPriceRange) {
      const price = parseInt(product.price.replace(/[BDT ,]/g, ""));
      switch (selectedPriceRange) {
        case "under-10000":
          if (price >= 10000) return false;
          break;
        case "10000-20000":
          if (price < 10000 || price >= 20000) return false;
          break;
        case "20000-30000":
          if (price < 20000 || price >= 30000) return false;
          break;
        case "30000-50000":
          if (price < 30000 || price >= 50000) return false;
          break;
        case "above-50000":
          if (price < 50000) return false;
          break;
      }
    }
    return true;
  });

  const toggleFavorite = (product: Product) => {
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
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-mm-blue hover:text-mm-blue/80 transition mb-6"
          >
            <ChevronLeft size={20} />
            <span className="font-medium">Back</span>
          </button>

          {/* Page Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-mm-text-secondary mb-8">
            GET THE PRODUCTS AS YOUR NEEDS
          </h1>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar - Filters */}
            <aside className="w-full lg:w-64 flex-shrink-0">
              <div className="bg-white border border-mm-border rounded-lg p-6 space-y-8 sticky top-24">
                {/* Product Categories */}
                <div>
                  <h3 className="text-lg font-semibold text-mm-text-secondary mb-4">Product Categories</h3>
                  <RadioGroup 
                    value={selectedCategory} 
                    onValueChange={(value) => {
                      setSelectedCategory(value);
                      const toastId = "filter-category";
                      toast.dismiss(toastId);
                      toast(`Filtering by category: ${value}`, { 
                        id: toastId,
                        duration: 2000,
                        icon: "ℹ️",
                      });
                    }}
                  >
                    <div className="space-y-3">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <RadioGroupItem value={category} id={`category-${category}`} />
                          <Label htmlFor={`category-${category}`} className="cursor-pointer text-mm-text-secondary">
                            {category}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                {/* Brands */}
                <div>
                  <h3 className="text-lg font-semibold text-mm-text-secondary mb-4">Brands</h3>
                  <RadioGroup 
                    value={selectedBrand} 
                    onValueChange={(value) => {
                      setSelectedBrand(value);
                      const toastId = "filter-brand";
                      toast.dismiss(toastId);
                      toast(`Filtering by brand: ${value}`, { 
                        id: toastId,
                        duration: 2000,
                        icon: "ℹ️",
                      });
                    }}
                  >
                    <div className="space-y-3">
                      {brands.map((brand) => (
                        <div key={brand} className="flex items-center space-x-2">
                          <RadioGroupItem value={brand} id={`brand-${brand}`} />
                          <Label htmlFor={`brand-${brand}`} className="cursor-pointer text-mm-text-secondary">
                            {brand}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="text-lg font-semibold text-mm-text-secondary mb-4">Price</h3>
                  <RadioGroup 
                    value={selectedPriceRange} 
                    onValueChange={(value) => {
                      setSelectedPriceRange(value);
                      const rangeLabels: Record<string, string> = {
                        "under-10000": "Under BDT 10,000",
                        "10000-20000": "BDT 10,000 - BDT 20,000",
                        "20000-30000": "BDT 20,000 - BDT 30,000",
                        "30000-50000": "BDT 30,000 - BDT 50,000",
                        "above-50000": "Above BDT 50,000",
                      };
                      const toastId = "filter-price";
                      toast.dismiss(toastId);
                      toast(`Filtering by price: ${rangeLabels[value]}`, { 
                        id: toastId,
                        duration: 2000,
                        icon: "ℹ️",
                      });
                    }}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="under-10000" id="price-under-10000" />
                        <Label htmlFor="price-under-10000" className="cursor-pointer text-mm-text-secondary">
                          Under BDT 10,000
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="10000-20000" id="price-10000-20000" />
                        <Label htmlFor="price-10000-20000" className="cursor-pointer text-mm-text-secondary">
                          BDT 10,000 - BDT 20,000
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="20000-30000" id="price-20000-30000" />
                        <Label htmlFor="price-20000-30000" className="cursor-pointer text-mm-text-secondary">
                          BDT 20,000 - BDT 30,000
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="30000-50000" id="price-30000-50000" />
                        <Label htmlFor="price-30000-50000" className="cursor-pointer text-mm-text-secondary">
                          BDT 30,000 - BDT 50,000
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="above-50000" id="price-above-50000" />
                        <Label htmlFor="price-above-50000" className="cursor-pointer text-mm-text-secondary">
                          Above BDT 50,000
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {/* Clear Filters Button */}
                {(selectedCategory || selectedBrand || selectedPriceRange) && (
                  <button
                    onClick={() => {
                      setSelectedCategory("");
                      setSelectedBrand("");
                      setSelectedPriceRange("");
                      const toastId = "clear-filters";
                      toast.dismiss(toastId);
                      toast("Filters cleared", { 
                        id: toastId,
                        duration: 2000,
                        icon: "ℹ️",
                      });
                    }}
                    className="w-full py-2 px-4 bg-mm-blue text-white rounded-lg hover:bg-mm-blue/90 transition"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </aside>

            {/* Main Content - Product Grid */}
            <div className="flex-1">
              <div className="mb-6 text-sm text-mm-text-secondary">
                {isLoading ? (
                  <ShimmerSkeleton className="h-5 w-48" delay={0} />
                ) : (
                  `Showing ${filteredProducts.length} products`
                )}
              </div>

              {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 items-stretch">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-full flex flex-col bg-white border-2 border-mm-border rounded-xl sm:rounded-2xl overflow-hidden shadow-md group"
                    >
                      {/* Image Skeleton */}
                      <div className="bg-gradient-to-b from-mm-light-bg-2 to-white h-36 sm:h-40 md:h-44 flex items-center justify-center p-3 sm:p-4 relative overflow-hidden">
                        <ShimmerSkeleton className="h-full w-full rounded-lg" delay={index * 100} />
                        {/* Shimmer overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/30 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>

                      {/* Product Info Skeleton */}
                      <div className="p-3 sm:p-4 flex flex-col gap-2 flex-1 bg-white/50 backdrop-blur-sm">
                        <ShimmerSkeleton className="h-3 w-20" delay={index * 100 + 50} />
                        <ShimmerSkeleton className="h-4 w-full" delay={index * 100 + 100} />
                        <ShimmerSkeleton className="h-4 w-3/4" delay={index * 100 + 150} />
                        <ShimmerSkeleton className="h-3 w-24" delay={index * 100 + 200} />
                        <div className="flex items-center gap-1.5 mt-auto">
                          <ShimmerSkeleton className="h-4 w-16" delay={index * 100 + 250} />
                          <ShimmerSkeleton className="h-4 w-12" delay={index * 100 + 300} />
                        </div>
                        <ShimmerSkeleton className="h-10 w-full mt-2 rounded-lg" delay={index * 100 + 350} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 items-stretch">
                  {filteredProducts.map((product) => {
                  const isFavorite = isInWishlist(product.id);
                  const isOnSale = parseInt(product.discount.replace("%", "")) > 20;

                  return (
                    <div
                      key={product.id}
                      className="h-full flex flex-col bg-white border-2 rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:shadow-mm-blue/5 transition-all duration-500 ease-in-out relative group border-mm-border hover:border-mm-blue/50"
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
                          onClick={() => toggleFavorite(product)}
                          className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-white/95 backdrop-blur-sm border-2 border-mm-border flex items-center justify-center shadow-sm hover:scale-110 hover:border-mm-blue transition-all duration-300"
                          aria-label="Toggle wishlist"
                        >
                          <Heart
                            size={16}
                            className={isFavorite ? "text-red-500 fill-red-500" : "text-mm-text-secondary"}
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
                                addToCart({
                                  id: product.id,
                                  name: product.name,
                                  price: product.price,
                                  originalPrice: product.originalPrice,
                                  image: product.image,
                                });
                                // Toast notification is handled in CartContext
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
              )}

              {!isLoading && filteredProducts.length === 0 && (
                <div className="text-center py-12 text-mm-text-secondary">
                  <p className="text-lg">No products found matching your filters.</p>
                  <button
                    onClick={() => {
                      setSelectedCategory("");
                      setSelectedBrand("");
                      setSelectedPriceRange("");
                      const toastId = "clear-filters";
                      toast.dismiss(toastId);
                      toast("Filters cleared", { 
                        id: toastId,
                        duration: 2000,
                        icon: "ℹ️",
                      });
                    }}
                    className="mt-4 text-mm-blue hover:underline"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

