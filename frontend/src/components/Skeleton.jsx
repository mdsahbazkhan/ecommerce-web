import React from 'react';

// Product Card Skeleton
export const ProductCardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
    <div className="h-64 bg-gray-200"></div>
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      <div className="h-5 bg-gray-200 rounded w-1/3"></div>
    </div>
  </div>
);

// Product Grid Skeleton
export const ProductGridSkeleton = ({ count = 8 }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
    {Array.from({ length: count }, (_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);

// Hero Section Skeleton
export const HeroSkeleton = () => (
  <div className="relative h-96 bg-gray-200 rounded-lg animate-pulse">
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="h-8 bg-gray-300 rounded w-64 mx-auto"></div>
        <div className="h-4 bg-gray-300 rounded w-48 mx-auto"></div>
        <div className="h-10 bg-gray-300 rounded w-32 mx-auto"></div>
      </div>
    </div>
  </div>
);

// Cart Item Skeleton
export const CartItemSkeleton = () => (
  <div className="flex items-center gap-4 p-4 border-b border-gray-200 animate-pulse">
    <div className="w-16 h-16 bg-gray-200 rounded"></div>
    <div className="flex-1 space-y-2">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
    </div>
    <div className="w-8 h-8 bg-gray-200 rounded"></div>
  </div>
);

// Order Item Skeleton
export const OrderSkeleton = () => (
  <div className="border border-gray-200 rounded-lg p-4 space-y-3 animate-pulse">
    <div className="flex justify-between items-start">
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-32"></div>
        <div className="h-3 bg-gray-200 rounded w-24"></div>
      </div>
      <div className="h-6 bg-gray-200 rounded w-16"></div>
    </div>
    <div className="flex gap-3">
      <div className="w-12 h-12 bg-gray-200 rounded"></div>
      <div className="w-12 h-12 bg-gray-200 rounded"></div>
      <div className="w-12 h-12 bg-gray-200 rounded"></div>
    </div>
  </div>
);

// Collection Filter Skeleton
export const FilterSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    <div className="space-y-3">
      <div className="h-5 bg-gray-200 rounded w-20"></div>
      <div className="space-y-2">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="h-4 bg-gray-200 rounded w-24"></div>
        ))}
      </div>
    </div>
    <div className="space-y-3">
      <div className="h-5 bg-gray-200 rounded w-16"></div>
      <div className="space-y-2">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="h-4 bg-gray-200 rounded w-20"></div>
        ))}
      </div>
    </div>
  </div>
);

// Related Products Skeleton
export const RelatedProductsSkeleton = () => (
  <div className="mt-16">
    <div className="h-6 bg-gray-200 rounded w-48 mb-6 animate-pulse"></div>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {Array.from({ length: 4 }, (_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  </div>
);