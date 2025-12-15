import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Truck, Package, Check, Lock, Tag } from "lucide-react";
import toast from "react-hot-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { ShimmerSkeleton } from "@/components/ui/shimmer-skeleton";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, getTotalPrice } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">("delivery");
  const [discountCode, setDiscountCode] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    state: "",
    zipCode: "",
    agreeToTerms: false,
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const subtotal = getTotalPrice();
  const discountRate = 0.2;
  const discountAmount = cart.length ? Math.round(subtotal * discountRate) : 0;
  const shippingFee = cart.length ? 5 : 0;
  const total = subtotal - discountAmount + shippingFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleApplyDiscount = () => {
    if (discountCode.trim()) {
      toast.success(`Discount code "${discountCode}" applied! 🎉`, {
        duration: 3000,
      });
      setDiscountCode("");
    } else {
      toast.error("Please enter a discount code", {
        duration: 2000,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreeToTerms) {
      toast.error("Please agree to the Terms and Conditions", {
        duration: 2000,
      });
      return;
    }
    toast.success("Order placed successfully! 🎉", {
      duration: 3000,
    });
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-mm-text mb-4">Your cart is empty</h1>
            <button
              onClick={() => navigate("/cart")}
              className="px-6 py-3 bg-mm-blue text-white rounded-lg hover:bg-mm-blue/90 transition"
            >
              Go to Cart
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 bg-mm-light-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12">
          {isLoading ? (
            <div className="animate-in fade-in duration-300">
              {/* Checkout Progress Skeleton */}
              <div className="mb-8 sm:mb-10 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center justify-end gap-2 sm:gap-4">
                  <div className="flex items-center gap-2">
                    <ShimmerSkeleton className="h-8 w-8 rounded-full" delay={0} />
                    <ShimmerSkeleton className="h-5 w-16" delay={75} />
                  </div>
                  <ShimmerSkeleton className="h-0.5 w-8 sm:w-12" delay={150} />
                  <div className="flex items-center gap-2">
                    <ShimmerSkeleton className="h-8 w-8 rounded-full" delay={200} />
                    <ShimmerSkeleton className="h-5 w-20" delay={300} />
                  </div>
                  <ShimmerSkeleton className="h-0.5 w-8 sm:w-12" delay={400} />
                  <div className="flex items-center gap-2">
                    <ShimmerSkeleton className="h-8 w-8 rounded-full" delay={500} />
                    <ShimmerSkeleton className="h-5 w-24" delay={600} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 sm:gap-8 md:gap-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Left Column - Form Skeleton */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-mm-border animate-in fade-in slide-in-from-left-4 duration-500">
                  <div className="space-y-3 mb-6">
                    <ShimmerSkeleton className="h-9 sm:h-10 w-40" delay={0} />
                    <ShimmerSkeleton className="h-6 sm:h-7 w-56" delay={100} />
                  </div>

                  {/* Delivery Options Skeleton */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 rounded-xl border-2 border-mm-border bg-gradient-to-br from-mm-light-bg-2/50 to-white">
                      <div className="flex flex-col items-center gap-3">
                        <ShimmerSkeleton className="h-12 w-12 rounded-lg" delay={0} />
                        <ShimmerSkeleton className="h-4 w-20" delay={200} />
                      </div>
                    </div>
                    <div className="p-4 rounded-xl border-2 border-mm-border bg-gradient-to-br from-mm-light-bg-2/50 to-white">
                      <div className="flex flex-col items-center gap-3">
                        <ShimmerSkeleton className="h-12 w-12 rounded-lg" delay={100} />
                        <ShimmerSkeleton className="h-4 w-16" delay={300} />
                      </div>
                    </div>
                  </div>

                  {/* Form Fields Skeleton */}
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <ShimmerSkeleton className="h-4 w-24" delay={0} />
                      <ShimmerSkeleton className="h-12 w-full rounded-lg" delay={75} />
                    </div>
                    <div className="space-y-2">
                      <ShimmerSkeleton className="h-4 w-32" delay={100} />
                      <ShimmerSkeleton className="h-12 w-full rounded-lg" delay={150} />
                    </div>
                    <div className="space-y-2">
                      <ShimmerSkeleton className="h-4 w-28" delay={200} />
                      <div className="flex gap-2">
                        <ShimmerSkeleton className="h-12 w-28 rounded-lg" delay={250} />
                        <ShimmerSkeleton className="h-12 flex-1 rounded-lg" delay={300} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <ShimmerSkeleton className="h-4 w-20" delay={350} />
                      <ShimmerSkeleton className="h-12 w-full rounded-lg" delay={400} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <ShimmerSkeleton className="h-4 w-16" delay={450} />
                        <ShimmerSkeleton className="h-12 w-full rounded-lg" delay={500} />
                      </div>
                      <div className="space-y-2">
                        <ShimmerSkeleton className="h-4 w-16" delay={550} />
                        <ShimmerSkeleton className="h-12 w-full rounded-lg" delay={600} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <ShimmerSkeleton className="h-4 w-24" delay={650} />
                      <ShimmerSkeleton className="h-12 w-full rounded-lg" delay={700} />
                    </div>
                    <div className="flex items-start gap-3 pt-2">
                      <ShimmerSkeleton className="h-5 w-5 rounded border-2 border-mm-border mt-0.5" delay={750} />
                      <ShimmerSkeleton className="h-5 w-64" delay={800} />
                    </div>
                  </div>
                </div>

                {/* Right Column - Order Summary Skeleton */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-mm-border h-fit lg:sticky lg:top-[160px] animate-in fade-in slide-in-from-right-4 duration-500">
                  <ShimmerSkeleton className="h-7 sm:h-8 w-44 mb-6" delay={0} />

                  {/* Cart Items Skeleton */}
                  <div className="space-y-4 mb-6">
                    {[1, 2].map((key, index) => (
                      <div key={key} className="flex gap-4 animate-in fade-in slide-in-from-right-4" style={{ animationDelay: `${index * 100}ms` }}>
                        <ShimmerSkeleton className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg flex-shrink-0" delay={index * 100} />
                        <div className="flex-1 min-w-0 space-y-2.5 pt-1">
                          <ShimmerSkeleton className="h-4 w-full" delay={index * 100 + 50} />
                          <div className="flex items-center justify-between">
                            <ShimmerSkeleton className="h-3.5 w-12" delay={index * 100 + 100} />
                            <ShimmerSkeleton className="h-4 w-20" delay={index * 100 + 200} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Discount Code Skeleton */}
                  <div className="mb-6 pb-6 border-b border-mm-border">
                    <div className="flex items-center gap-2 mb-3">
                      <ShimmerSkeleton className="h-4 w-4 rounded" delay={0} />
                      <ShimmerSkeleton className="h-5 w-32" delay={100} />
                    </div>
                    <div className="flex gap-2">
                      <ShimmerSkeleton className="h-10 flex-1 rounded-lg" delay={200} />
                      <ShimmerSkeleton className="h-10 w-20 rounded-lg" delay={300} />
                    </div>
                  </div>

                  {/* Order Summary Skeleton */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between">
                      <ShimmerSkeleton className="h-4 w-20" delay={0} />
                      <ShimmerSkeleton className="h-4 w-24" delay={100} />
                    </div>
                    <div className="flex items-center justify-between">
                      <ShimmerSkeleton className="h-4 w-16" delay={200} />
                      <ShimmerSkeleton className="h-4 w-16" delay={300} />
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-mm-border">
                      <ShimmerSkeleton className="h-5 w-12" delay={400} />
                      <ShimmerSkeleton className="h-6 w-20" delay={500} />
                    </div>
                  </div>

                  {/* Pay Now Button Skeleton */}
                  <ShimmerSkeleton className="h-12 sm:h-14 w-full rounded-lg mb-4" delay={600} />

                  {/* Security Message Skeleton */}
                  <div className="text-center space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <ShimmerSkeleton className="h-4 w-4 rounded" delay={700} />
                      <ShimmerSkeleton className="h-5 w-48" delay={800} />
                    </div>
                    <ShimmerSkeleton className="h-3 w-full max-w-xs mx-auto" delay={900} />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Checkout Progress */}
              <div className="mb-8 sm:mb-10">
                <div className="flex items-center justify-end gap-2 sm:gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-mm-blue text-white flex items-center justify-center text-sm font-semibold">
                      <Check size={16} />
                    </div>
                    <span className="text-sm font-medium text-mm-text">Cart</span>
                  </div>
                  <div className="w-8 sm:w-12 h-0.5 bg-mm-blue"></div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-mm-blue text-white flex items-center justify-center text-sm font-semibold">
                      <Check size={16} />
                    </div>
                    <span className="text-sm font-medium text-mm-text">Review</span>
                  </div>
                  <div className="w-8 sm:w-12 h-0.5 bg-mm-blue"></div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-mm-blue text-white flex items-center justify-center text-sm font-semibold">
                      3
                    </div>
                    <span className="text-sm font-medium text-mm-text">Checkout</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 sm:gap-8 md:gap-10">
            {/* Left Column - Shipping Information */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-mm-border">
              <h1 className="text-2xl sm:text-3xl font-bold text-mm-text mb-2">Checkout</h1>
              <h2 className="text-lg sm:text-xl font-bold text-mm-text mb-6">Shipping Information</h2>

              {/* Delivery Options */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  type="button"
                  onClick={() => setDeliveryMethod("delivery")}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    deliveryMethod === "delivery"
                      ? "border-mm-blue bg-mm-blue/5"
                      : "border-mm-border hover:border-mm-blue/50"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className={`p-3 rounded-lg ${
                      deliveryMethod === "delivery" ? "bg-mm-blue" : "bg-mm-light-bg"
                    }`}>
                      <Truck size={24} className={deliveryMethod === "delivery" ? "text-white" : "text-mm-blue"} />
                    </div>
                    <span className={`text-sm font-semibold ${
                      deliveryMethod === "delivery" ? "text-mm-blue" : "text-mm-text"
                    }`}>
                      Delivery
                    </span>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setDeliveryMethod("pickup")}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    deliveryMethod === "pickup"
                      ? "border-mm-blue bg-mm-blue/5"
                      : "border-mm-border hover:border-mm-blue/50"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className={`p-3 rounded-lg ${
                      deliveryMethod === "pickup" ? "bg-mm-blue" : "bg-mm-light-bg"
                    }`}>
                      <Package size={24} className={deliveryMethod === "pickup" ? "text-white" : "text-mm-blue"} />
                    </div>
                    <span className={`text-sm font-semibold ${
                      deliveryMethod === "pickup" ? "text-mm-blue" : "text-mm-text"
                    }`}>
                      Pick up
                    </span>
                  </div>
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-mm-text mb-2">
                    Full name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    required
                    className="w-full px-4 py-3 border-2 border-mm-border rounded-lg focus:outline-none focus:border-mm-blue transition-colors text-mm-text placeholder-mm-text-secondary"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-mm-text mb-2">
                    Email address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    required
                    className="w-full px-4 py-3 border-2 border-mm-border rounded-lg focus:outline-none focus:border-mm-blue transition-colors text-mm-text placeholder-mm-text-secondary"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-mm-text mb-2">
                    Phone number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <select className="px-3 py-3 border-2 border-mm-border rounded-lg focus:outline-none focus:border-mm-blue transition-colors bg-white text-mm-text">
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+880">🇧🇩 +880</option>
                      <option value="+91">🇮🇳 +91</option>
                    </select>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter phone number"
                      required
                      className="flex-1 px-4 py-3 border-2 border-mm-border rounded-lg focus:outline-none focus:border-mm-blue transition-colors text-mm-text placeholder-mm-text-secondary"
                    />
                  </div>
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm font-semibold text-mm-text mb-2">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-mm-border rounded-lg focus:outline-none focus:border-mm-blue transition-colors bg-white text-mm-text"
                  >
                    <option value="">Choose country</option>
                    <option value="US">United States</option>
                    <option value="BD">Bangladesh</option>
                    <option value="IN">India</option>
                  </select>
                </div>

                {/* City and State */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-mm-text mb-2">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Enter city"
                      required
                      className="w-full px-4 py-3 border-2 border-mm-border rounded-lg focus:outline-none focus:border-mm-blue transition-colors text-mm-text placeholder-mm-text-secondary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-mm-text mb-2">
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="Enter state"
                      required
                      className="w-full px-4 py-3 border-2 border-mm-border rounded-lg focus:outline-none focus:border-mm-blue transition-colors text-mm-text placeholder-mm-text-secondary"
                    />
                  </div>
                </div>

                {/* ZIP Code */}
                <div>
                  <label className="block text-sm font-semibold text-mm-text mb-2">
                    ZIP Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="Enter ZIP code"
                    required
                    className="w-full px-4 py-3 border-2 border-mm-border rounded-lg focus:outline-none focus:border-mm-blue transition-colors text-mm-text placeholder-mm-text-secondary"
                  />
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start gap-3 pt-2">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    id="terms"
                    className="mt-1 w-5 h-5 border-2 border-mm-border rounded focus:ring-2 focus:ring-mm-blue text-mm-blue"
                  />
                  <label htmlFor="terms" className="text-sm text-mm-text-secondary cursor-pointer">
                    I have read and agree to the Terms and Conditions.
                  </label>
                </div>
              </form>
            </div>

            {/* Right Column - Order Summary */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-mm-border h-fit lg:sticky lg:top-[160px]">
              <h2 className="text-xl sm:text-2xl font-bold text-mm-text mb-6">Review your cart</h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cart.map((item) => {
                  const price = parseFloat(item.price.replace(/[BDT ,]/g, ""));
                  const itemTotal = price * item.quantity;

                  return (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-mm-light-bg-2 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-mm-text text-sm sm:text-base mb-1 line-clamp-2">
                          {item.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-xs sm:text-sm text-mm-text-secondary">
                            {item.quantity}x
                          </span>
                          <span className="text-sm sm:text-base font-bold text-mm-text">
                            BDT {itemTotal.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Discount Code */}
              <div className="mb-6 pb-6 border-b border-mm-border">
                <div className="flex items-center gap-3 mb-3">
                  <Tag size={18} className="text-mm-blue" />
                  <span className="text-sm font-semibold text-mm-text">Discount code</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-4 py-2.5 border-2 border-mm-border rounded-lg focus:outline-none focus:border-mm-blue transition-colors text-sm text-mm-text placeholder-mm-text-secondary"
                  />
                  <button
                    type="button"
                    onClick={handleApplyDiscount}
                    className="px-4 py-2.5 bg-mm-blue text-white rounded-lg hover:bg-mm-blue/90 transition-colors text-sm font-semibold"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm text-mm-text-secondary">
                  <span>Subtotal</span>
                  <span className="font-semibold text-mm-text">BDT {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-mm-text-secondary">
                  <span>Shipping</span>
                  <span className="font-semibold text-mm-text">BDT {shippingFee.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex items-center justify-between text-sm text-mm-text-secondary">
                    <span>Discount</span>
                    <span className="font-semibold text-red-500">-BDT {discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-base sm:text-lg font-bold text-mm-text pt-3 border-t border-mm-border">
                  <span>Total</span>
                  <span>BDT {total.toLocaleString()}</span>
                </div>
              </div>

              {/* Pay Now Button */}
              <button
                onClick={handleSubmit}
                className="w-full py-3 sm:py-4 bg-mm-blue text-white rounded-lg hover:bg-mm-blue/90 transition-all duration-300 font-semibold text-base sm:text-lg shadow-md hover:shadow-lg hover:shadow-mm-blue/25 mb-4"
              >
                Pay Now
              </button>

              {/* Security Message */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Lock size={18} className="text-mm-blue" />
                  <span className="text-sm font-bold text-mm-text">Secure Checkout - SSL Encrypted</span>
                </div>
                <p className="text-xs text-mm-text-secondary">
                  Ensuring your financial and personal details are secure during every transaction.
                </p>
              </div>
            </div>
          </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

