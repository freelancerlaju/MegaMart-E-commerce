import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import toast from "react-hot-toast";

interface WishlistItem {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
}

interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (productId: number) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: number) => boolean;
  getWishlistCount: () => number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const STORAGE_KEY = "megamart_wishlist";

// Helper function to load wishlist from localStorage
const loadWishlistFromStorage = (): WishlistItem[] => {
  try {
    const storedWishlist = localStorage.getItem(STORAGE_KEY);
    if (storedWishlist) {
      return JSON.parse(storedWishlist);
    }
  } catch (error) {
    console.error("Error loading wishlist from localStorage:", error);
  }
  return [];
};

// Helper function to save wishlist to localStorage
const saveWishlistToStorage = (wishlist: WishlistItem[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
  } catch (error) {
    console.error("Error saving wishlist to localStorage:", error);
  }
};

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => loadWishlistFromStorage());

  // Save wishlist to localStorage whenever wishlist changes
  useEffect(() => {
    saveWishlistToStorage(wishlist);
  }, [wishlist]);

  const addToWishlist = (item: WishlistItem) => {
    setWishlist((prev) => {
      const toastId = `wishlist-${item.id}`;
      toast.dismiss(toastId);
      if (prev.some((p) => p.id === item.id)) {
        toast.error(`${item.name} is already in your wishlist!`, {
          id: toastId,
          duration: 3000,
        });
        return prev;
      }
      toast.success(`${item.name} added to wishlist!`, {
        id: toastId,
        duration: 3000,
      });
      return [...prev, item];
    });
  };

  const removeFromWishlist = (productId: number) => {
    setWishlist((prev) => {
      const product = prev.find((item) => item.id === productId);
      const toastId = `wishlist-remove-${productId}`;
      toast.dismiss(toastId);
      if (product) {
        toast(`${product.name} removed from wishlist`, {
          id: toastId,
          duration: 3000,
          icon: "ℹ️",
        });
      }
      return prev.filter((item) => item.id !== productId);
    });
  };

  const clearWishlist = () => setWishlist([]);

  const isInWishlist = (productId: number) => wishlist.some((item) => item.id === productId);

  const getWishlistCount = () => wishlist.length;

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, clearWishlist, isInWishlist, getWishlistCount }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}

