import React from 'react';
import { CartItemSkeleton } from '../components/Skeleton';

const CartSkeleton = () => {
  return (
    <div className="pt-14">
      <div className="h-8 bg-gray-200 rounded w-32 mb-6 animate-pulse"></div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items Skeleton */}
        <div className="flex-1">
          <div className="bg-white rounded-lg border border-gray-200">
            {Array.from({ length: 3 }, (_, i) => (
              <CartItemSkeleton key={i} />
            ))}
          </div>
        </div>
        
        {/* Order Summary Skeleton */}
        <div className="lg:w-80">
          <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-32"></div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-16"></div>
                <div className="h-4 bg-gray-200 rounded w-12"></div>
              </div>
              <div className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-20"></div>
                <div className="h-4 bg-gray-200 rounded w-12"></div>
              </div>
              <div className="flex justify-between border-t pt-3">
                <div className="h-5 bg-gray-200 rounded w-16"></div>
                <div className="h-5 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSkeleton;