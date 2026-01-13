import React from 'react';
import { OrderSkeleton } from '../components/Skeleton';

const OrdersSkeleton = () => {
  return (
    <div className="pt-16">
      <div className="h-8 bg-gray-200 rounded w-32 mb-6 animate-pulse"></div>
      
      <div className="space-y-4">
        {Array.from({ length: 4 }, (_, i) => (
          <OrderSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

export default OrdersSkeleton;