import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import {
  ChevronLeft,
  ShoppingCart,
  Heart,
  Share2,
  LayoutGrid,
  HelpCircle,
  Truck,
  RotateCcw,
  Star,
} from "lucide-react";
import toast from "react-hot-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { ShimmerSkeleton } from "@/components/ui/shimmer-skeleton";

// Product database - in real app, this would come from an API
const productsDatabase = {
  1: {
    id: 1,
    name: "Galaxy S22 Ultra",
    price: 32999,
    originalPrice: 74999,
    discount: "56%",
    image: "/Assets/Galaxy-S22-Ultra.png",
    rating: 4.5,
    reviews: 1243,
    inStock: true,
    description: "Experience the ultimate flagship smartphone with stunning display and powerful performance.",
    specifications: {
      display: "6.8 inch AMOLED, 120Hz, 2K Resolution",
      processor: "Snapdragon 8 Gen 1",
      ram: "12GB",
      storage: "256GB",
      camera: "200MP Main, 50MP Ultra Wide",
      battery: "5000mAh",
      OS: "Android 13",
    },
  },
  2: {
    id: 2,
    name: "Galaxy M13 (4GB | 64 GB)",
    price: 10499,
    originalPrice: 14999,
    discount: "56%",
    image: "https://images.samsung.com/is/image/samsung/p6pim/bd/2206/gallery/bd-galaxy-m13-m135-sm-m135fzkebd-thumb-533369199",
    rating: 4.2,
    reviews: 856,
    inStock: true,
    description: "Reliable mid-range smartphone with excellent battery life and decent performance.",
    specifications: {
      display: "6.5 inch IPS LCD, 90Hz",
      processor: "MediaTek Helio G88",
      ram: "4GB",
      storage: "64GB",
      camera: "50MP Main, 5MP Ultra Wide",
      battery: "5000mAh",
      OS: "Android 12",
    },
  },
  3: {
    id: 3,
    name: "Galaxy M33 (4GB | 64 GB)",
    price: 16999,
    originalPrice: 24999,
    discount: "56%",
    image: "https://images.samsung.com/is/image/samsung/p6pim/bd/2203/gallery/bd-galaxy-m33-5g-m336-sm-m336bzadebw-thumb-530606517",
    rating: 4.3,
    reviews: 642,
    inStock: true,
    description: "Great value smartphone with solid build quality and reliable performance.",
    specifications: {
      display: "6.5 inch IPS LCD, 90Hz",
      processor: "MediaTek Helio G99",
      ram: "4GB",
      storage: "64GB",
      camera: "50MP Main, 8MP Ultra Wide",
      battery: "5000mAh",
      OS: "Android 12",
    },
  },
  4: {
    id: 4,
    name: "Galaxy M53 (4GB | 64 GB)",
    price: 31999,
    originalPrice: 40999,
    discount: "56%",
    image: "https://images.samsung.com/is/image/samsung/p6pim/bd/2204/gallery/bd-galaxy-m53-5g-m536-sm-m536bzadebw-thumb-530606518",
    rating: 4.4,
    reviews: 1102,
    inStock: true,
    description: "Powerful mid-range device with excellent refresh rate and smooth performance.",
    specifications: {
      display: "6.55 inch AMOLED, 120Hz",
      processor: "MediaTek Helio G96",
      ram: "4GB",
      storage: "64GB",
      camera: "108MP Main, 8MP Ultra Wide",
      battery: "5000mAh",
      OS: "Android 12",
    },
  },
  5: {
    id: 5,
    name: "Galaxy S22 Ultra",
    price: 67999,
    originalPrice: 85999,
    discount: "56%",
    image: "/Assets/Galaxy-S22-Ultra.png",
    rating: 4.6,
    reviews: 2156,
    inStock: true,
    description: "Premium flagship with cutting-edge technology and exceptional camera system.",
    specifications: {
      display: "6.7 inch AMOLED, 120Hz, QHD+",
      processor: "Snapdragon 8 Gen 1+",
      ram: "12GB",
      storage: "512GB",
      camera: "200MP Main, 50MP Ultra Wide, Periscope Zoom",
      battery: "5000mAh",
      OS: "Android 13",
    },
  },
};

export default function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [isLoading, setIsLoading] = useState(true);

  const parsedId = parseInt(productId || "1");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [productId]);

  // Accept product data passed from product cards; fall back to local db
  const routedProduct = location.state?.product as
    | {
        id: number;
        name: string;
        price: string | number;
        originalPrice?: string | number;
        discount?: string;
        image: string;
        rating?: number;
        reviews?: number;
        inStock?: boolean | number;
        description?: string;
        specifications?: Record<string, string>;
      }
    | undefined;

  // Normalize price fields to numbers for display
  const normalizePrice = (value: string | number | undefined) => {
    if (typeof value === "number") return value;
    if (!value) return 0;
    const numeric = parseInt(value.toString().replace(/[^\d]/g, ""));
    return Number.isNaN(numeric) ? 0 : numeric;
  };

  const productFromDb = productsDatabase[parsedId as keyof typeof productsDatabase];
  const product = routedProduct
    ? {
        ...routedProduct,
        price: normalizePrice(routedProduct.price),
        originalPrice: normalizePrice(routedProduct.originalPrice),
        rating: routedProduct.rating ?? 4.5,
        reviews: routedProduct.reviews ?? 120,
        inStock: routedProduct.inStock ?? true,
        description:
          routedProduct.description ||
          "Advanced fitness tracking smartwatch with heart rate monitor and GPS.",
        specifications:
          routedProduct.specifications || productFromDb?.specifications || {},
        discount:
          routedProduct.discount ||
          (routedProduct.originalPrice
            ? `${Math.round(
                ((normalizePrice(routedProduct.originalPrice) -
                  normalizePrice(routedProduct.price)) /
                  normalizePrice(routedProduct.originalPrice)) *
                  100
              )}%`
            : productFromDb?.discount),
      }
    : productFromDb;

  const isFavorite = useMemo(
    () => (product ? isInWishlist(product.id) : false),
    [product, isInWishlist]
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10">
            <ShimmerSkeleton className="h-6 w-32 mb-6 sm:mb-8" delay={0} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 mb-10 sm:mb-12">
              {/* Image Section Skeleton */}
              <div className="space-y-4">
                <div className="relative bg-gradient-to-b from-mm-light-bg-2 to-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 flex items-center justify-center min-h-[300px] sm:min-h-[380px] md:min-h-[450px] lg:min-h-[500px] border-2 border-mm-border">
                  <ShimmerSkeleton className="h-64 sm:h-80 md:h-96 w-full rounded-xl" delay={0} />
                </div>
                <div className="flex gap-3">
                  {[1, 2, 3].map((_, idx) => (
                    <ShimmerSkeleton key={idx} className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl" delay={idx * 100} />
                  ))}
                </div>
              </div>

              {/* Product Info Section Skeleton */}
              <div className="flex flex-col gap-6 sm:gap-7 md:gap-8">
                <ShimmerSkeleton className="h-6 w-24 rounded-full" delay={100} />
                <div>
                  <ShimmerSkeleton className="h-8 sm:h-10 md:h-12 w-3/4 mb-3 sm:mb-4" delay={150} />
                  <ShimmerSkeleton className="h-4 w-full mb-2" delay={200} />
                  <ShimmerSkeleton className="h-4 w-5/6" delay={250} />
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((_, idx) => (
                      <ShimmerSkeleton key={idx} className="h-5 w-5 rounded" delay={idx * 50} />
                    ))}
                  </div>
                  <ShimmerSkeleton className="h-4 w-32" delay={300} />
                </div>
                <div className="flex items-baseline gap-3 sm:gap-4">
                  <ShimmerSkeleton className="h-10 sm:h-12 md:h-14 w-48" delay={350} />
                  <ShimmerSkeleton className="h-6 sm:h-7 md:h-8 w-32" delay={400} />
                </div>
                <ShimmerSkeleton className="h-10 w-32 rounded-full" delay={450} />
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
                  <ShimmerSkeleton className="h-12 sm:h-14 w-full rounded-xl" delay={500} />
                  <ShimmerSkeleton className="h-12 sm:h-14 w-16 rounded-xl" delay={550} />
                </div>
                <ShimmerSkeleton className="h-16 w-full rounded-xl" delay={600} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2">
                  {[1, 2, 3, 4].map((_, idx) => (
                    <ShimmerSkeleton key={idx} className="h-12 w-full rounded-xl" delay={idx * 100 + 650} />
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-8 sm:mt-10">
              {[1, 2].map((_, idx) => (
                <div key={idx} className="border-2 border-mm-border rounded-xl sm:rounded-2xl p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <ShimmerSkeleton className="h-12 w-12 rounded-xl" delay={idx * 100} />
                    <div className="flex-1 space-y-2">
                      <ShimmerSkeleton className="h-6 w-32" delay={idx * 100 + 50} />
                      <ShimmerSkeleton className="h-4 w-full" delay={idx * 100 + 100} />
                      <ShimmerSkeleton className="h-4 w-3/4" delay={idx * 100 + 150} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product not found</h1>
            <Button onClick={() => navigate("/")}>Back to Home</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Generate star rating display
  const fullStars = Math.floor(product.rating);
  const hasHalfStar = product.rating % 1 !== 0;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10">
          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className="group flex items-center gap-2 text-mm-text-secondary hover:text-mm-blue mb-6 sm:mb-8 transition-colors duration-300"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Products</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 mb-10 sm:mb-12">
            {/* Image Section */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative bg-gradient-to-b from-mm-light-bg-2 to-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 flex items-center justify-center min-h-[300px] sm:min-h-[380px] md:min-h-[450px] lg:min-h-[500px] border-2 border-mm-border shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-mm-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="relative z-10 max-h-[280px] sm:max-h-[360px] md:max-h-[420px] lg:max-h-[460px] w-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              {/* Thumbnail gallery */}
              <div className="flex gap-3">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-xl p-2 border-2 border-mm-blue shadow-sm cursor-pointer hover:border-mm-blue/70 transition-all duration-300">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Product Info Section */}
            <div className="flex flex-col gap-6 sm:gap-7 md:gap-8">
              {/* Discount Badge */}
              {product.discount && (
                <div className="inline-flex items-center gap-2 w-fit">
                  <span className="px-3 py-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs sm:text-sm font-bold rounded-full shadow-sm">
                    {product.discount} OFF
                  </span>
                </div>
              )}

              {/* Product Name */}
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-mm-text mb-3 sm:mb-4 leading-tight">
                  {product.name}
                </h1>
                <p className="text-mm-text-secondary text-sm sm:text-base leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={`${
                        i < fullStars
                          ? "fill-yellow-400 text-yellow-400"
                          : i === fullStars && hasHalfStar
                            ? "fill-yellow-400/50 text-yellow-400"
                            : "text-mm-border"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-mm-text-secondary text-sm font-medium">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 sm:gap-4">
                <span className="text-3xl sm:text-4xl md:text-5xl font-black text-mm-text">
                  BDT {product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-lg sm:text-xl md:text-2xl text-mm-text-secondary line-through">
                    BDT {product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              {/* In Stock Badge */}
              {product.inStock && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-mm-light-bg rounded-full w-fit border border-mm-blue/20">
                  <div className="w-2 h-2 bg-mm-blue rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-mm-blue">
                    In Stock
                  </span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
                <Button
                  className="flex-1 bg-mm-blue hover:bg-mm-blue/90 text-white h-12 sm:h-14 text-base font-semibold rounded-xl shadow-md hover:shadow-lg hover:shadow-mm-blue/25 transition-all duration-300"
                  onClick={() => {
                    addToCart({
                      id: product.id,
                      name: product.name,
                      price: `BDT ${product.price.toLocaleString()}`,
                      originalPrice: `BDT ${product.originalPrice.toLocaleString()}`,
                      image: product.image,
                    });
                  }}
                >
                  <ShoppingCart size={20} className="mr-2" />
                  Add to Cart
                </Button>
                <button
                  onClick={() => {
                    if (isFavorite) {
                      removeFromWishlist(product.id);
                    } else {
                      addToWishlist({
                        id: product.id,
                        name: product.name,
                        price: `BDT ${product.price.toLocaleString()}`,
                        originalPrice: `BDT ${product.originalPrice.toLocaleString()}`,
                        image: product.image,
                      });
                    }
                  }}
                  className={`px-4 sm:px-5 h-12 sm:h-14 border-2 rounded-xl transition-all duration-300 flex items-center justify-center shadow-sm hover:shadow-md ${
                    isFavorite
                      ? "border-red-500/10 bg-red-500/10  text-mm-blue"
                      : "border-mm-border text-mm-text-secondary hover:border-mm-blue hover:text-mm-blue"
                  }`}
                >
                  <Heart
                    size={20}
                    fill={isFavorite ? "currentColor" : "none"}
                    className={isFavorite ? "text-red-500" : ""}
                  />
                </button>
              </div>

              {/* Characteristics Accordion */}
              <div className="border-2 border-mm-border rounded-xl sm:rounded-2xl overflow-hidden bg-white shadow-sm">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="characteristics" className="border-none">
                    <AccordionTrigger className="text-left py-4 px-4 sm:px-6 hover:no-underline bg-mm-light-bg">
                      <span className="font-bold text-mm-text text-base sm:text-lg">
                        Specifications
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                        {Object.entries(product.specifications).map(
                          ([key, value]) => (
                            <div
                              key={key}
                              className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-4 py-2 border-b border-mm-border last:border-0"
                            >
                              <span className="text-mm-text-secondary font-semibold capitalize text-sm sm:text-base">
                                {key}:
                              </span>
                              <span className="text-mm-text font-bold text-sm sm:text-base text-right sm:text-left">
                                {value}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* Action Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2">
                <button 
                  onClick={() => {
                    const toastId = "compare-color";
                    toast.dismiss(toastId);
                    toast("Compare colors feature coming soon!", { 
                      id: toastId,
                      duration: 2000,
                      icon: "ℹ️",
                    });
                  }}
                  className="group flex items-center gap-3 px-4 py-3 bg-mm-light-bg hover:bg-mm-light-bg-2 rounded-xl text-mm-text-secondary hover:text-mm-blue text-sm font-medium transition-all duration-300 border border-mm-border hover:border-mm-blue/30"
                >
                  <LayoutGrid size={18} className="text-mm-blue" />
                  <span>Compare color</span>
                </button>
                <button 
                  onClick={() => {
                    const toastId = "ask-question";
                    toast.dismiss(toastId);
                    toast("Question submitted! We'll get back to you soon.", { 
                      id: toastId,
                      duration: 3000,
                      icon: "ℹ️",
                    });
                  }}
                  className="group flex items-center gap-3 px-4 py-3 bg-mm-light-bg hover:bg-mm-light-bg-2 rounded-xl text-mm-text-secondary hover:text-mm-blue text-sm font-medium transition-all duration-300 border border-mm-border hover:border-mm-blue/30"
                >
                  <HelpCircle size={18} className="text-mm-blue" />
                  <span>Ask a question</span>
                </button>
                <button 
                  onClick={() => {
                    const toastId = "delivery-info";
                    toast.dismiss(toastId);
                    toast("Free delivery available! Check delivery & return policy.", { 
                      id: toastId,
                      duration: 3000,
                      icon: "ℹ️",
                    });
                  }}
                  className="group flex items-center gap-3 px-4 py-3 bg-mm-light-bg hover:bg-mm-light-bg-2 rounded-xl text-mm-text-secondary hover:text-mm-blue text-sm font-medium transition-all duration-300 border border-mm-border hover:border-mm-blue/30"
                >
                  <Truck size={18} className="text-mm-blue" />
                  <span>Delivery & Return</span>
                </button>
                <button 
                  onClick={() => {
                    const toastId = "share-product";
                    toast.dismiss(toastId);
                    if (navigator.share) {
                      navigator.share({
                        title: product.name,
                        text: `Check out ${product.name} on MegaMart!`,
                        url: window.location.href,
                      }).catch(() => {
                        navigator.clipboard.writeText(window.location.href);
                        toast.success("Product link copied to clipboard!", { 
                          id: toastId,
                          duration: 2000,
                        });
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      toast.success("Product link copied to clipboard!", { 
                        id: toastId,
                        duration: 2000,
                      });
                    }
                  }}
                  className="group flex items-center gap-3 px-4 py-3 bg-mm-light-bg hover:bg-mm-light-bg-2 rounded-xl text-mm-text-secondary hover:text-mm-blue text-sm font-medium transition-all duration-300 border border-mm-border hover:border-mm-blue/30"
                >
                  <Share2 size={18} className="text-mm-blue" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>

          {/* Delivery and Return Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-8 sm:mt-10">
            {/* Free Delivery */}
            <div className="border-2 border-mm-border rounded-xl sm:rounded-2xl p-5 sm:p-6 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-mm-light-bg rounded-xl">
                  <Truck size={24} className="text-mm-blue" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-mm-text mb-2 text-lg">
                    Free Delivery
                  </h3>
                  <p className="text-mm-text-secondary text-sm mb-3">
                    Enter your Postal code for Delivery Availability.
                  </p>
                  <button
                    onClick={() => {
                      const toastId = "delivery-check";
                      toast.dismiss(toastId);
                      toast.success("Free delivery available to your area!", { 
                        id: toastId,
                        duration: 3000,
                      });
                    }}
                    className="text-sm text-mm-blue hover:text-mm-blue/80 font-semibold transition-colors duration-300"
                  >
                    Check Availability →
                  </button>
                </div>
              </div>
            </div>

            {/* Return Delivery */}
            <div className="border-2 border-mm-border rounded-xl sm:rounded-2xl p-5 sm:p-6 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-mm-light-bg rounded-xl">
                  <RotateCcw size={24} className="text-mm-blue" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-mm-text mb-2 text-lg">
                    Return Delivery
                  </h3>
                  <p className="text-mm-text-secondary text-sm mb-3">
                    Free 30days Delivery Returns. Details
                  </p>
                  <button
                    onClick={() => {
                      const toastId = "return-policy";
                      toast.dismiss(toastId);
                      toast("30-day free return policy applies!", { 
                        id: toastId,
                        duration: 3000,
                        icon: "ℹ️",
                      });
                    }}
                    className="text-sm text-mm-blue hover:text-mm-blue/80 font-semibold transition-colors duration-300"
                  >
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
