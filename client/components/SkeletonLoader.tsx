import { ShimmerSkeleton } from "@/components/ui/shimmer-skeleton";

export default function SkeletonLoader() {
  return (
    <div className="min-h-screen bg-white w-full overflow-hidden">
      {/* Header Skeleton */}
      <div className="w-full bg-white sticky top-0 z-50 shadow-sm">
        {/* Top announcement bar skeleton */}
        <div className="bg-mm-dark px-3 sm:px-4 md:px-8 py-2.5">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <ShimmerSkeleton className="h-5 w-48" variant="dark" delay={0} />
            <div className="flex gap-4">
              <ShimmerSkeleton className="h-5 w-32" variant="dark" delay={50} />
              <ShimmerSkeleton className="h-5 w-24 hidden sm:block" variant="dark" delay={100} />
            </div>
          </div>
        </div>

        {/* Main header skeleton */}
        <div className="bg-white border-b border-mm-border px-3 sm:px-4 md:px-8 py-3 sm:py-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-4 md:justify-between">
            {/* Logo and menu */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <ShimmerSkeleton className="h-10 w-10 md:h-12 md:w-12 rounded-xl" delay={0} />
              <ShimmerSkeleton className="h-6 w-32" delay={75} />
            </div>

            {/* Search bar skeleton */}
            <div className="w-full md:flex-1 md:max-w-2xl">
              <ShimmerSkeleton className="h-12 w-full rounded-xl" delay={150} />
            </div>

            {/* Right actions skeleton */}
            <div className="hidden md:flex items-center gap-4">
              <ShimmerSkeleton className="h-10 w-20 rounded-xl" delay={200} />
              <ShimmerSkeleton className="h-10 w-20 rounded-xl" delay={250} />
              <ShimmerSkeleton className="h-10 w-20 rounded-xl" delay={300} />
            </div>
          </div>
        </div>

        {/* Category navigation skeleton */}
        <div className="bg-white border-b border-mm-border px-3 sm:px-4 md:px-8 py-2 sm:py-3">
          <div className="max-w-7xl mx-auto hidden md:flex items-center gap-2">
            {Array.from({ length: 6 }).map((_, idx) => (
              <ShimmerSkeleton 
                key={idx} 
                className="h-9 w-24 rounded-lg" 
                delay={idx * 50} 
              />
            ))}
          </div>
        </div>
      </div>

      {/* Hero Carousel Skeleton */}
      <div className="w-full bg-gradient-to-b from-mm-light-bg to-white px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl min-h-[380px] sm:min-h-[420px] md:min-h-[360px] lg:min-h-[400px]">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200/30 via-gray-100/50 to-gray-200/30 skeleton-shimmer" />
            
            <div className="relative z-10 h-full flex flex-col md:flex-row items-center px-8 sm:px-10 md:px-14 lg:px-16 py-8 gap-8">
              {/* Image skeleton */}
              <div className="flex-1 flex justify-center items-center w-full md:w-auto">
                <div className="relative">
                  <ShimmerSkeleton 
                    className="h-48 sm:h-56 md:h-64 lg:h-72 w-48 sm:w-56 md:w-64 lg:w-72 rounded-xl shadow-lg" 
                    delay={0}
                  />
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-200/20 via-purple-200/20 to-blue-200/20 rounded-xl blur-xl animate-pulse" />
                </div>
              </div>

              {/* Content skeleton */}
              <div className="flex-1 space-y-4 text-center md:text-left">
                <ShimmerSkeleton className="h-6 w-32 rounded-full mx-auto md:mx-0" delay={100} />
                <ShimmerSkeleton className="h-4 w-40 mx-auto md:mx-0" delay={150} />
                <ShimmerSkeleton className="h-8 w-64 mx-auto md:mx-0" delay={200} />
                <ShimmerSkeleton className="h-6 w-48 mx-auto md:mx-0" delay={250} />
                <div className="flex gap-3 justify-center md:justify-start pt-2">
                  <ShimmerSkeleton className="h-10 w-28 rounded-lg" delay={300} />
                  <ShimmerSkeleton className="h-10 w-32 rounded-lg" delay={350} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-16 space-y-16">
        {/* Product Section Skeleton */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <ShimmerSkeleton className="h-8 w-48" delay={0} />
            <ShimmerSkeleton className="h-8 w-32" delay={50} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div 
                key={idx} 
                className="group p-4 border border-mm-border rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300 space-y-3"
              >
                <div className="relative overflow-hidden rounded-lg">
                  <ShimmerSkeleton 
                    className="h-48 w-full rounded-lg" 
                    delay={idx * 100} 
                  />
                  {/* Product image shimmer overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </div>
                <ShimmerSkeleton className="h-4 w-3/4" delay={idx * 100 + 50} />
                <ShimmerSkeleton className="h-4 w-1/2" delay={idx * 100 + 100} />
                <div className="flex items-center gap-2">
                  <ShimmerSkeleton className="h-5 w-20 rounded" delay={idx * 100 + 150} />
                  <ShimmerSkeleton className="h-4 w-16 rounded" delay={idx * 100 + 200} />
                </div>
                <ShimmerSkeleton className="h-10 w-full rounded-lg" delay={idx * 100 + 250} />
              </div>
            ))}
          </div>
        </div>

        {/* Categories Grid Skeleton */}
        <div className="space-y-6">
          <ShimmerSkeleton className="h-8 w-48" delay={0} />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {Array.from({ length: 7 }).map((_, idx) => (
              <div key={idx} className="space-y-2 group">
                <div className="relative overflow-hidden rounded-xl">
                  <ShimmerSkeleton 
                    className="h-32 w-full rounded-xl" 
                    delay={idx * 75} 
                  />
                  {/* Category shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/30 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <ShimmerSkeleton className="h-4 w-full" delay={idx * 75 + 50} />
              </div>
            ))}
          </div>
        </div>

        {/* Brands Carousel Skeleton */}
        <div className="space-y-6">
          <ShimmerSkeleton className="h-8 w-40" delay={0} />
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div 
                key={idx} 
                className="flex-shrink-0 w-64 p-6 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 shadow-sm space-y-3 group"
              >
                <ShimmerSkeleton className="h-6 w-32 rounded" delay={idx * 100} />
                <ShimmerSkeleton className="h-4 w-24 rounded" delay={idx * 100 + 50} />
                <div className="relative overflow-hidden rounded-lg">
                  <ShimmerSkeleton className="h-32 w-full rounded-lg" delay={idx * 100 + 100} />
                  {/* Brand shimmer overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Essentials Section Skeleton */}
        <div className="space-y-6">
          <ShimmerSkeleton className="h-8 w-48" delay={0} />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="space-y-2 group">
                <div className="relative overflow-hidden rounded-xl">
                  <ShimmerSkeleton 
                    className="h-40 w-full rounded-xl" 
                    delay={idx * 80} 
                  />
                  {/* Essentials shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-100/20 via-transparent to-green-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <ShimmerSkeleton className="h-4 w-full" delay={idx * 80 + 50} />
                <ShimmerSkeleton className="h-3 w-2/3" delay={idx * 80 + 100} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Skeleton */}
      <div className="bg-mm-light-bg border-t border-mm-border mt-16">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="space-y-4">
                <ShimmerSkeleton className="h-6 w-32" delay={idx * 50} />
                <div className="space-y-2">
                  <ShimmerSkeleton className="h-4 w-24" delay={idx * 50 + 25} />
                  <ShimmerSkeleton className="h-4 w-24" delay={idx * 50 + 50} />
                  <ShimmerSkeleton className="h-4 w-24" delay={idx * 50 + 75} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-8 border-t border-mm-border">
            <ShimmerSkeleton className="h-4 w-full" delay={0} />
          </div>
        </div>
      </div>

    </div>
  );
}

