import React from 'react';
import { HeroSkeleton, ProductGridSkeleton } from '../components/Skeleton';

const HomeSkeleton = () => {
  return (
    <div className="space-y-16">
      {/* Hero Skeleton */}
      <HeroSkeleton />
      
      {/* Latest Collection Skeleton */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <div className="h-8 bg-gray-200 rounded w-64 mx-auto animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
        </div>
        <ProductGridSkeleton count={8} />
      </div>
      
      {/* Best Sellers Skeleton */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <div className="h-8 bg-gray-200 rounded w-48 mx-auto animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-80 mx-auto animate-pulse"></div>
        </div>
        <ProductGridSkeleton count={4} />
      </div>
    </div>
  );
};

export default HomeSkeleton;