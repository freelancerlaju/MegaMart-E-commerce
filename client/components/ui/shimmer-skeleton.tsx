import { cn } from "@/lib/utils";

// Modern Shimmer Skeleton Component with wave effect
export const ShimmerSkeleton = ({ 
  className, 
  delay = 0,
  variant = "light",
  ...props 
}: React.HTMLAttributes<HTMLDivElement> & { delay?: number; variant?: "light" | "dark" }) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md",
        variant === "dark" ? "skeleton-shimmer-dark" : "skeleton-shimmer",
        className
      )}
      style={{
        animationDelay: `${delay}ms`,
      }}
      {...props}
    >
      {/* Shimmer wave overlay - moves across the skeleton */}
      <div 
        className="absolute inset-0"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 50%, transparent 100%)",
          transform: "translateX(-100%)",
          animation: `shimmer-wave 2s ease-in-out infinite`,
          animationDelay: `${delay}ms`,
        }}
      />
    </div>
  );
};

