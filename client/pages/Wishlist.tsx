import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Trash2, ChevronLeft } from "lucide-react";
import toast from "react-hot-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { ShimmerSkeleton } from "@/components/ui/shimmer-skeleton";

export default function Wishlist() {
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-mm-light-bg text-mm-text">
      <Header />
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-9 space-y-7">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-mm-text-secondary">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1 hover:text-mm-blue transition"
              aria-label="Go back"
            >
              <ChevronLeft size={18} />
              <span>Back</span>
            </button>
            <span className="text-mm-text-secondary/60">/</span>
            <span className="font-semibold text-mm-text">Wishlist</span>
          </div>

          {/* Hero heading */}
          <div className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white border border-mm-border flex items-center justify-center">
              <Heart size={24} className="text-mm-text sm:size-[28px]" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-mm-text">My Wishlist</h1>
          </div>

          {wishlist.length > 0 && (
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-mm-text-secondary">
              <span>{wishlist.length} {wishlist.length === 1 ? "item" : "items"}</span>
              <button
                onClick={() => {
                  if (confirm("Are you sure you want to clear your wishlist?")) {
                    const toastId = "clear-wishlist";
                    toast.dismiss(toastId);
                    clearWishlist();
                    toast.success("Wishlist cleared successfully", { 
                      id: toastId,
                      duration: 2000,
                    });
                  }
                }}
                className="text-red-500 hover:text-red-600 font-medium"
              >
                Clear All
              </button>
            </div>
          )}

          {isLoading ? (
            <div className="bg-white border border-mm-border rounded-2xl shadow-sm overflow-hidden">
              <div className="hidden md:grid grid-cols-[1.8fr_1fr_1fr_0.9fr] px-6 py-3 text-sm font-semibold text-mm-text-secondary border-b border-mm-border">
                <ShimmerSkeleton className="h-4 w-24" delay={0} />
                <ShimmerSkeleton className="h-4 w-16" delay={50} />
                <ShimmerSkeleton className="h-4 w-20" delay={100} />
                <ShimmerSkeleton className="h-4 w-16 justify-self-end" delay={150} />
              </div>
              <div className="divide-y divide-mm-border">
                {[1, 2, 3].map((key) => (
                  <div
                    key={key}
                    className="grid grid-cols-1 md:grid-cols-[1.8fr_1fr_1fr_0.9fr] gap-4 px-4 sm:px-6 py-5 items-center"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <ShimmerSkeleton className="hidden sm:block h-5 w-5 rounded" delay={key * 100} />
                      <ShimmerSkeleton className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg" delay={key * 100 + 50} />
                      <div className="min-w-0 space-y-2 flex-1">
                        <ShimmerSkeleton className="h-4 w-40" delay={key * 100 + 100} />
                        <ShimmerSkeleton className="h-3 w-24" delay={key * 100 + 150} />
                        <ShimmerSkeleton className="sm:hidden h-3 w-16" delay={key * 100 + 200} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <ShimmerSkeleton className="h-4 w-20" delay={key * 100 + 250} />
                      <ShimmerSkeleton className="h-3 w-16" delay={key * 100 + 300} />
                    </div>
                    <ShimmerSkeleton className="h-4 w-20" delay={key * 100 + 350} />
                    <ShimmerSkeleton className="h-9 w-full md:w-32 rounded-full" delay={key * 100 + 400} />
                  </div>
                ))}
              </div>
            </div>
          ) : wishlist.length === 0 ? (
            <div className="bg-white border border-mm-border rounded-2xl p-10 sm:p-12 text-center shadow-sm">
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-mm-light-bg-2 flex items-center justify-center">
                <Heart size={28} className="text-mm-text-secondary" />
              </div>
              <h2 className="text-xl font-semibold text-mm-text mb-2">Your wishlist is empty</h2>
              <p className="text-mm-text-secondary mb-6">Save items you love to see them here.</p>
              <button
                onClick={() => navigate("/")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-mm-blue text-white rounded-full hover:bg-mm-blue/90 transition shadow-sm"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="bg-white border border-mm-border rounded-2xl shadow-sm overflow-hidden">
              {/* Table header */}
              <div className="hidden md:grid grid-cols-[1.8fr_1fr_1fr_0.9fr] px-6 py-3 text-sm font-semibold text-mm-text-secondary border-b border-mm-border">
                <span>Product name</span>
                <span>Unit price</span>
                <span>Stock status</span>
                <span className="text-right">Action</span>
              </div>

              <div className="divide-y divide-mm-border">
                {wishlist.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-1 md:grid-cols-[1.8fr_1fr_1fr_0.9fr] gap-4 px-4 sm:px-6 py-5 items-center"
                  >
                    {/* Product */}
                    <div className="flex items-center gap-4 min-w-0">
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="hidden sm:inline-flex text-mm-text-secondary hover:text-red-500 transition"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 size={18} />
                      </button>
                      <div className="w-20 h-20 bg-mm-light-bg-2 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0 sm:w-24 sm:h-24">
                        <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-base sm:text-lg font-semibold text-mm-text line-clamp-2">{item.name}</div>
                        <button
                          onClick={() => removeFromWishlist(item.id)}
                          className="sm:hidden mt-2 inline-flex items-center gap-1.5 text-red-500 hover:text-red-600 text-sm font-medium"
                        >
                          <Trash2 size={16} />
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-base sm:text-lg font-semibold text-mm-text">
                      {item.price}
                      {item.originalPrice && (
                        <div className="text-sm text-mm-text-secondary line-through">{item.originalPrice}</div>
                      )}
                    </div>

                    {/* Stock */}
                    <div className="text-sm sm:text-base text-mm-text-secondary font-medium">In Stock</div>

                    {/* Action */}
                    <div className="flex justify-stretch md:justify-end">
                      <button
                        onClick={() =>
                          addToCart({ ...item, originalPrice: item.originalPrice || item.price })
                        }
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-mm-blue text-white text-sm font-semibold hover:bg-mm-blue/90 transition shadow-sm w-full md:w-auto"
                      >
                        <ShoppingCart size={16} />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

