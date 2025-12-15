import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Plus, Minus, Trash2, ChevronLeft, Tag, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { ShimmerSkeleton } from "@/components/ui/shimmer-skeleton";

export default function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const subtotal = getTotalPrice();
  const discountRate = 0.2;
  const discountAmount = cart.length ? Math.round(subtotal * discountRate) : 0;
  const deliveryFee = cart.length ? 15 : 0;
  const total = subtotal - discountAmount + deliveryFee;

  return (
    <div className="min-h-screen flex flex-col bg-mm-light-bg text-mm-text">
      <Header />
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6 sm:space-y-8">
          {/* Breadcrumb */}
          <div className="flex flex-wrap items-center gap-2 text-sm text-mm-text-secondary">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1 hover:text-mm-blue transition"
              aria-label="Go back"
            >
              <ChevronLeft size={18} />
              <span>Back</span>
            </button>
            <span className="text-mm-text-secondary/60">/</span>
            <span className="font-semibold text-mm-text">Cart</span>
          </div>

          {/* Title */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-mm-text">Your Cart</h1>
            {cart.length > 0 && (
              <span className="text-sm text-mm-text-secondary">{cart.length} {cart.length === 1 ? "item" : "items"}</span>
            )}
          </div>

          {isLoading ? (
            <div className="grid gap-6 lg:gap-8 lg:grid-cols-[2fr_1fr]">
              <div className="space-y-4">
                {[1, 2, 3].map((key) => (
                  <div
                    key={key}
                    className="bg-white border border-mm-border rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row gap-4 shadow-sm group"
                  >
                    <ShimmerSkeleton className="w-full sm:w-28 h-28 rounded-lg" delay={key * 100} />
                    <div className="flex-1 min-w-0 space-y-3">
                      <ShimmerSkeleton className="h-5 w-40" delay={key * 100 + 50} />
                      <ShimmerSkeleton className="h-4 w-28" delay={key * 100 + 100} />
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <ShimmerSkeleton className="h-6 w-20" delay={key * 100 + 150} />
                        <div className="flex items-center gap-3">
                          <ShimmerSkeleton className="h-10 w-28 rounded-full" delay={key * 100 + 200} />
                          <ShimmerSkeleton className="h-4 w-24" delay={key * 100 + 250} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <div className="bg-white border border-mm-border rounded-2xl p-6 shadow-sm">
                  <ShimmerSkeleton className="h-6 w-32 mb-4" delay={0} />
                  <div className="space-y-3">
                    <ShimmerSkeleton className="h-4 w-full" delay={50} />
                    <ShimmerSkeleton className="h-4 w-full" delay={100} />
                    <ShimmerSkeleton className="h-4 w-3/4" delay={150} />
                    <ShimmerSkeleton className="h-5 w-1/2" delay={200} />
                  </div>
                  <ShimmerSkeleton className="h-12 w-full rounded-full mt-6" delay={250} />
                  <ShimmerSkeleton className="h-12 w-full rounded-full mt-3" delay={300} />
                </div>
              </div>
            </div>
          ) : cart.length === 0 ? (
            <div className="bg-white border border-mm-border rounded-2xl p-10 sm:p-12 text-center shadow-sm">
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-mm-light-bg-2 flex items-center justify-center">
                <ShoppingCart size={28} className="text-mm-text-secondary" />
              </div>
              <h2 className="text-xl font-semibold text-mm-text mb-2">Your cart is empty</h2>
              <p className="text-mm-text-secondary mb-6">Add some products to get started!</p>
              <button
                onClick={() => navigate("/")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-mm-blue text-white rounded-full hover:bg-mm-blue/90 transition shadow-sm"
              >
                Continue Shopping
                <ArrowRight size={18} />
              </button>
            </div>
          ) : (
            <div className="grid gap-6 lg:gap-8 lg:grid-cols-[2fr_1fr]">
              {/* Cart Items */}
              <div className="space-y-4">
                {cart.map((item) => {
                  const price = parseFloat(item.price.replace(/[BDT ,]/g, ""));
                  const itemTotal = price * item.quantity;

                  return (
                    <div
                      key={item.id}
                      className="bg-white border border-mm-border rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row gap-4 shadow-sm"
                    >
                      <div className="w-full sm:w-28 h-28 bg-mm-light-bg-2 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                          <div className="min-w-0">
                            <h3 className="text-lg font-semibold text-mm-text">{item.name}</h3>
                            <div className="text-xs text-mm-text-secondary space-x-2 mt-1">
                              <span>Size: Large</span>
                              <span>Color: Classic</span>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="inline-flex items-center gap-1.5 text-red-500 hover:text-red-600 text-sm"
                            aria-label="Remove item"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div className="text-xl font-semibold text-mm-text">{item.price}</div>
                          <div className="flex flex-wrap items-center gap-3">
                            <div className="flex items-center gap-1.5 bg-mm-light-bg rounded-full px-2 py-1 border border-mm-border">
                          <button
                            onClick={() => {
                              const newQuantity = item.quantity - 1;
                              const toastId = `quantity-${item.id}`;
                              toast.dismiss(toastId);
                              updateQuantity(item.id, newQuantity);
                              toast(`Quantity updated: ${newQuantity}`, { 
                                id: toastId,
                                duration: 1500,
                                icon: "ℹ️",
                              });
                            }}
                            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white transition"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="min-w-[2ch] text-center text-base font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => {
                              const newQuantity = item.quantity + 1;
                              const toastId = `quantity-${item.id}`;
                              toast.dismiss(toastId);
                              updateQuantity(item.id, newQuantity);
                              toast(`Quantity updated: ${newQuantity}`, { 
                                id: toastId,
                                duration: 1500,
                                icon: "ℹ️",
                              });
                            }}
                            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white transition"
                            aria-label="Increase quantity"
                          >
                            <Plus size={16} />
                          </button>
                            </div>
                            <div className="text-sm text-mm-text-secondary">
                              Total: <span className="font-semibold text-mm-text">BDT {itemTotal.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order Summary */}
              <div className="space-y-4">
                <div className="bg-white border border-mm-border rounded-2xl p-6 shadow-sm sticky top-24">
                  <h2 className="text-xl font-semibold text-mm-text mb-4">Order Summary</h2>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between text-mm-text-secondary">
                      <span>Subtotal</span>
                      <span className="font-semibold text-mm-text">BDT {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-mm-text-secondary">
                      <span>Discount (-20%)</span>
                      <span className="font-semibold text-red-500">-BDT {discountAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-mm-text-secondary">
                      <span>Delivery Fee</span>
                      <span className="font-semibold text-mm-text">BDT {deliveryFee.toLocaleString()}</span>
                    </div>
                    <div className="border-t border-mm-border pt-3 flex items-center justify-between text-base font-semibold text-mm-text">
                      <span>Total</span>
                      <span>BDT {total.toLocaleString()}</span>
                    </div>
                  </div>

                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      const input = e.currentTarget.querySelector('input') as HTMLInputElement;
                      const promoCode = input.value.trim();
                      const toastId = "promo-code";
                      toast.dismiss(toastId);
                      if (promoCode) {
                        toast.success(`Promo code "${promoCode}" applied! 🎉`, { 
                          id: toastId,
                          duration: 3000,
                        });
                        input.value = "";
                      } else {
                        toast.error("Please enter a promo code", { 
                          id: toastId,
                          duration: 2000,
                        });
                      }
                    }}
                    className="mt-5 flex flex-col sm:flex-row gap-3 sm:items-center sm:flex-nowrap"
                  >
                    <div className="flex items-center gap-3 flex-1 rounded-full bg-white px-4 h-12 shadow-[0_10px_30px_-22px_rgba(0,0,0,0.45)] border border-mm-border">
                      <Tag size={18} className="text-mm-text-secondary" />
                      <input
                        type="text"
                        placeholder="Add promo code"
                        className="flex-1 bg-transparent outline-none text-base text-mm-text placeholder:text-mm-text-secondary/70"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="px-6 h-12 rounded-full bg-mm-dark text-white text-base font-semibold hover:bg-mm-dark/90 transition shadow-[0_10px_30px_-22px_rgba(0,0,0,0.45)] w-full sm:w-auto min-w-[120px] whitespace-nowrap flex items-center justify-center flex-shrink-0"
                    >
                      Apply
                    </button>
                  </form>

                  <button
                    onClick={() => navigate("/checkout")}
                    className="mt-5 w-full py-3 rounded-full bg-mm-dark text-white font-semibold hover:bg-mm-dark/90 transition shadow-sm flex items-center justify-center gap-2"
                  >
                    Go to Checkout
                    <ArrowRight size={18} />
                  </button>
                  <button
                    onClick={() => navigate("/")}
                    className="mt-3 w-full py-3 rounded-full border border-mm-border text-mm-text font-semibold hover:bg-mm-light-bg transition"
                  >
                    Continue Shopping
                  </button>
                  <button
                    onClick={() => {
                      if (confirm("Are you sure you want to clear your cart?")) {
                        const toastId = "clear-cart";
                        toast.dismiss(toastId);
                        clearCart();
                        toast.success("Cart cleared successfully", { 
                          id: toastId,
                          duration: 2000,
                        });
                      }
                    }}
                    className="mt-3 w-full py-2 text-red-500 hover:bg-red-50 rounded-full text-sm font-medium transition"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

