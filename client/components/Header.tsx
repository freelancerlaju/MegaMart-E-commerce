import React from "react";
import { Menu, Search, User, ShoppingCart, MapPin, Truck, Zap, X, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const { getWishlistCount } = useWishlist();
  const wishlistCount = getWishlistCount();

  // Prevent body scroll when mobile menu is open
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflowX = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflowX = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflowX = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="w-full bg-white sticky top-0 z-50 shadow-sm overflow-x-hidden">
      {/* Top announcement bar */}
      <div className="bg-mm-dark text-white px-3 sm:px-4 md:px-8 py-2.5 overflow-x-hidden">
        <div className="max-w-7xl mx-auto flex flex-col gap-2 md:flex-row md:items-center md:justify-between text-xs overflow-x-hidden">
          <div className="flex items-center justify-center gap-2 sm:gap-3 text-center md:justify-start overflow-x-hidden">
            <span className="inline-flex items-center rounded-full bg-mm-blue px-2 sm:px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg shrink-0">
              New
            </span>
            <span className="text-white/80 text-[10px] sm:text-xs truncate">Free shipping on orders over BDT 5000</span>
          </div>
          <div className="flex items-center justify-center md:justify-end gap-2 sm:gap-4 md:gap-6 text-xs overflow-x-auto hide-scrollbar">
            <button className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-lg hover:bg-white/10 transition-all duration-200 group shrink-0">
              <MapPin size={14} className="text-mm-blue group-hover:text-white shrink-0" />
              <span className="text-white/80 group-hover:text-white text-[10px] sm:text-xs whitespace-nowrap">
                Deliver to <strong className="text-white">423651</strong>
              </span>
            </button>
            <button className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/10 transition-all duration-200 group shrink-0">
              <Truck size={14} className="text-mm-blue group-hover:text-white shrink-0" />
              <span className="text-white/80 group-hover:text-white whitespace-nowrap">Track order</span>
            </button>
            <button className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/10 transition-all duration-200 group shrink-0">
              <Zap size={14} className="text-mm-yellow group-hover:text-white shrink-0" />
              <span className="text-white/80 group-hover:text-white whitespace-nowrap">Special Offers</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-white border-b border-mm-border px-3 sm:px-4 md:px-8 py-3 sm:py-4 overflow-x-hidden">
        <div className="max-w-7xl mx-auto flex flex-col gap-3 sm:gap-4 md:gap-6 md:flex-row md:items-center md:justify-between overflow-x-hidden">
          {/* Logo and Menu + Right actions (mobile) */}
          <div className="flex items-center justify-between gap-2 sm:gap-4 min-w-0 flex-1 md:flex-none">
            {/* Mobile Menu Button */}
            <button
              type="button"
              className="bg-mm-light-bg hover:bg-mm-light-bg-2 rounded-xl p-2.5 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center md:hidden transition-all duration-200 shadow-sm shrink-0"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X size={20} className="text-mm-text sm:w-[22px] sm:h-[22px]" />
              ) : (
                <Menu size={20} className="text-mm-text sm:w-[22px] sm:h-[22px]" />
              )}
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 sm:gap-3 cursor-pointer group min-w-0 flex-1 md:flex-none">
              <div className="h-9 w-9 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-xl bg-mm-blue flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 shrink-0">
                <img
                  src="/favicon.ico"
                  alt="MegaMart logo"
                  className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 object-contain"
                />
              </div>
              <div className="flex flex-col leading-tight min-w-0">
                <span className="text-lg sm:text-xl md:text-2xl font-bold text-mm-blue truncate">
                  MegaMart
                </span>
                <span className="hidden lg:inline text-[10px] font-medium text-mm-text-secondary">
                  Your trusted shopping partner
                </span>
              </div>
            </Link>

            {/* Right actions - mobile */}
            <div className="flex items-center gap-2 sm:gap-3 md:hidden shrink-0">
              <Link to="/wishlist" className="relative p-1.5 sm:p-2 rounded-lg hover:bg-mm-light-bg transition-colors">
                <Heart size={18} className="text-mm-text sm:w-5 sm:h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-0 right-0 bg-gradient-to-r from-pink-500 to-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center shadow-md text-[8px] sm:text-[10px]">
                    {wishlistCount > 9 ? "9+" : wishlistCount}
                  </span>
                )}
              </Link>
              <button className="p-1.5 sm:p-2 rounded-lg hover:bg-mm-light-bg transition-colors">
                <User size={18} className="text-mm-text sm:w-5 sm:h-5" />
              </button>
              <Link to="/cart" className="relative p-1.5 sm:p-2 rounded-lg hover:bg-mm-light-bg transition-colors">
                <ShoppingCart size={18} className="text-mm-text sm:w-5 sm:h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center shadow-md text-[8px] sm:text-[10px]">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          <div className="w-full md:flex-1 md:max-w-2xl lg:max-w-xl xl:max-w-2xl min-w-0">
            <div className="relative group">
              <div className="absolute inset-0 bg-mm-blue/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-mm-light-bg border-2 border-mm-border rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 flex items-center gap-2 sm:gap-3 shadow-sm hover:shadow-md hover:border-mm-blue transition-all duration-300">
                <Search size={18} className="text-mm-text-secondary shrink-0 group-hover:text-mm-blue transition-colors sm:w-5 sm:h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="bg-transparent outline-none text-xs sm:text-sm text-mm-text placeholder:text-mm-text-secondary flex-1 min-w-0"
                />
                <button className="hidden sm:flex items-center gap-1 px-3 sm:px-4 py-1.5 bg-mm-blue text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium hover:shadow-lg hover:scale-105 transition-all duration-200 shrink-0">
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Right Actions - desktop/tablet */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4 shrink-0">
            <Link 
              to="/wishlist" 
              className="flex flex-col items-center gap-1 px-3 lg:px-4 py-2 rounded-xl hover:bg-mm-light-bg transition-all duration-200 relative group"
            >
              <div className="relative">
                <Heart size={20} className="text-mm-text group-hover:text-pink-500 transition-colors lg:w-[22px] lg:h-[22px]" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                    {wishlistCount > 9 ? "9+" : wishlistCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium text-mm-text-secondary">Wishlist</span>
            </Link>

            <div className="h-8 w-px bg-mm-border"></div>

            <Link 
              to="/cart" 
              className="flex flex-col items-center gap-1 px-3 lg:px-4 py-2 rounded-xl hover:bg-mm-light-bg transition-all duration-200 relative group"
            >
              <div className="relative">
                <ShoppingCart size={20} className="text-mm-text group-hover:text-mm-blue transition-colors lg:w-[22px] lg:h-[22px]" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium text-mm-text-secondary">Cart</span>
            </Link>

            <div className="h-8 w-px bg-mm-border"></div>

            <button className="flex flex-col items-center gap-1 px-3 lg:px-4 py-2 rounded-xl hover:bg-mm-light-bg transition-all duration-200 group">
              <User size={20} className="text-mm-text group-hover:text-mm-blue transition-colors lg:w-[22px] lg:h-[22px]" />
              <span className="text-xs font-medium text-mm-text-secondary">Account</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="bg-white border-b border-mm-border px-3 sm:px-4 md:px-8 py-2 sm:py-3 overflow-x-hidden">
        {/* Desktop / tablet nav menu */}
        <div className="max-w-7xl mx-auto hidden md:flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar">
          <button className="px-4 lg:px-5 py-2 lg:py-2.5 bg-mm-blue text-white rounded-lg lg:rounded-xl font-semibold text-xs lg:text-sm whitespace-nowrap shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 shrink-0">
            All Categories
          </button>
          <button className="px-4 lg:px-5 py-2 lg:py-2.5 bg-mm-light-bg text-mm-text rounded-lg lg:rounded-xl font-medium text-xs lg:text-sm whitespace-nowrap hover:bg-mm-light-bg-2 hover:text-mm-blue transition-all duration-200 shrink-0">
            Groceries
          </button>
          <button className="px-4 lg:px-5 py-2 lg:py-2.5 bg-mm-light-bg text-mm-text rounded-lg lg:rounded-xl font-medium text-xs lg:text-sm whitespace-nowrap hover:bg-mm-light-bg-2 hover:text-mm-blue transition-all duration-200 shrink-0">
            Premium Fruits
          </button>
          <button className="px-4 lg:px-5 py-2 lg:py-2.5 bg-mm-light-bg text-mm-text rounded-lg lg:rounded-xl font-medium text-xs lg:text-sm whitespace-nowrap hover:bg-mm-light-bg-2 hover:text-mm-blue transition-all duration-200 shrink-0">
            Home & Kitchen
          </button>
          <button className="px-4 lg:px-5 py-2 lg:py-2.5 bg-mm-light-bg text-mm-text rounded-lg lg:rounded-xl font-medium text-xs lg:text-sm whitespace-nowrap hover:bg-mm-light-bg-2 hover:text-mm-blue transition-all duration-200 shrink-0">
            Fashion
          </button>
          <button className="px-4 lg:px-5 py-2 lg:py-2.5 bg-mm-light-bg text-mm-text rounded-lg lg:rounded-xl font-medium text-xs lg:text-sm whitespace-nowrap hover:bg-mm-light-bg-2 hover:text-mm-blue transition-all duration-200 shrink-0">
            Electronics
          </button>
          <button className="px-4 lg:px-5 py-2 lg:py-2.5 bg-mm-light-bg text-mm-text rounded-lg lg:rounded-xl font-medium text-xs lg:text-sm whitespace-nowrap hover:bg-mm-light-bg-2 hover:text-mm-blue transition-all duration-200 shrink-0">
            Beauty
          </button>
          <button className="px-4 lg:px-5 py-2 lg:py-2.5 bg-mm-light-bg text-mm-text rounded-lg lg:rounded-xl font-medium text-xs lg:text-sm whitespace-nowrap hover:bg-mm-light-bg-2 hover:text-mm-blue transition-all duration-200 shrink-0">
            Home Improvement
          </button>
          <button className="px-4 lg:px-5 py-2 lg:py-2.5 bg-mm-light-bg text-mm-text rounded-lg lg:rounded-xl font-medium text-xs lg:text-sm whitespace-nowrap hover:bg-mm-light-bg-2 hover:text-mm-blue transition-all duration-200 shrink-0">
            Sports & Toys
          </button>
        </div>

        {/* Mobile nav menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[60] md:hidden overflow-hidden" style={{ width: '100vw', maxWidth: '100vw' }}>
            {/* Backdrop */}
            <button
              type="button"
              aria-label="Close navigation menu"
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
            />

            {/* Drawer */}
            <div className="absolute inset-y-0 left-0 w-[85vw] max-w-[320px] bg-white shadow-2xl flex flex-col animate-in slide-in-from-left duration-300 overflow-hidden" style={{ maxWidth: 'min(85vw, 320px)' }}>
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-mm-border bg-mm-light-bg shrink-0 min-w-0">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <div className="h-8 w-8 rounded-lg bg-mm-blue flex items-center justify-center shrink-0">
                    <img src="/favicon.ico" alt="Logo" className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold text-mm-text truncate">Menu</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-mm-light-bg-2 transition-colors shrink-0 ml-2"
                >
                  <X size={20} className="text-mm-text" />
                </button>
              </div>

              {/* Links */}
              <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 min-h-0 w-full">
                <button
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-white bg-mm-blue mb-2 rounded-xl shadow-md mx-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ maxWidth: 'calc(100% - 1rem)' }}
                >
                  <span className="h-2 w-2 rounded-full bg-white shrink-0" />
                  <span className="truncate flex-1 min-w-0">All Categories</span>
                </button>
                {[
                  "Groceries",
                  "Premium Fruits",
                  "Home & Kitchen",
                  "Fashion",
                  "Electronics",
                  "Beauty",
                  "Home Improvement",
                  "Sports & Toys"
                ].map((category) => (
                  <button
                    key={category}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-mm-text hover:bg-mm-light-bg hover:text-mm-blue transition-all duration-200 min-w-0"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="h-1 w-1 rounded-full bg-mm-text-secondary shrink-0" />
                    <span className="truncate flex-1 min-w-0">{category}</span>
                  </button>
                ))}
              </nav>

              {/* Footer actions */}
              <div className="border-t border-mm-border px-4 py-3 bg-mm-light-bg shrink-0 w-full min-w-0">
                <div className="flex items-center justify-between gap-2 w-full">
                  <button
                    type="button"
                    className="flex-1 px-3 py-2 bg-mm-blue text-white rounded-lg text-xs font-semibold hover:shadow-lg transition-all duration-200 min-w-0"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </button>
                  <Link
                    to="/cart"
                    className="flex-1 px-3 py-2 bg-white border-2 border-mm-border text-mm-text rounded-lg text-xs font-semibold hover:border-mm-blue hover:text-mm-blue transition-all duration-200 text-center min-w-0"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    View Cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
