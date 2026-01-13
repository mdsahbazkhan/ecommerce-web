import React from 'react';
import { ProductGridSkeleton, FilterSkeleton } from '../components/Skeleton';

const CollectionSkeleton = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-6 pt-10 border-t">
      {/* Filter Sidebar Skeleton */}
      <div className="min-w-60">
        <FilterSkeleton />
      </div>
      
      {/* Main Content Skeleton */}
      <div className="flex-1">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center mb-6">
          <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
          <div className="h-8 bg-gray-200 rounded w-24 animate-pulse"></div>
        </div>
        
        {/* Products Grid Skeleton */}
        <ProductGridSkeleton count={12} />
      </div>
    </div>
  );
};

export default CollectionSkeleton;