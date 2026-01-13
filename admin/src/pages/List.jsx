import axios from "axios";
import React, { useState, useEffect } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "sonner";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [expandedSizes, setExpandedSizes] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Calculate pagination
  const totalPages = Math.ceil(list.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = list.slice(startIndex, endIndex);

  const fetchList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleSizeExpansion = (productId) => {
    const newExpanded = new Set(expandedSizes);
    if (newExpanded.has(productId)) {
      newExpanded.delete(productId);
    } else {
      newExpanded.add(productId);
    }
    setExpandedSizes(newExpanded);
  };

  const deleteProduct = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    
    setDeleting(id);
    try {
      const response = await axios.post(
        backendUrl + "/api/product/delete",
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setDeleting(null);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Header Skeleton */}
        <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
          </div>
        </div>

        {/* Table Header Skeleton */}
        <div className="hidden lg:grid grid-cols-[80px_1fr_120px_100px_80px] gap-4 px-4 sm:px-6 py-3 bg-gray-50 border-b border-gray-200">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Skeleton Rows */}
        <div className="divide-y divide-gray-200">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="block lg:grid lg:grid-cols-[80px_1fr_120px_100px_80px] lg:gap-4 px-4 sm:px-6 py-4">
              {/* Mobile Skeleton */}
              <div className="lg:hidden space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse flex-shrink-0"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                    <div className="flex gap-1">
                      <div className="h-6 w-8 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-6 w-8 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-3">
                    <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="h-6 w-12 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>

              {/* Desktop Skeleton */}
              <div className="hidden lg:contents">
                <div className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="flex gap-1">
                    <div className="h-6 w-8 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-6 w-8 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="h-6 w-12 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-8 h-8 bg-gray-200 rounded animate-pulse mx-auto"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Products List</h2>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-500">
            <span className="hidden sm:inline">Showing {startIndex + 1}-{Math.min(endIndex, list.length)} of {list.length}</span>
            <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full font-medium text-center sm:text-left">
              {list.length} Products
            </span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {/* Table Header */}
        <div className="hidden lg:grid grid-cols-[80px_1fr_120px_100px_80px] gap-4 px-4 sm:px-6 py-3 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-700">
          <div>Image</div>
          <div>Product Details</div>
          <div>Category</div>
          <div>Price</div>
          <div className="text-center">Action</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-200">
          {currentItems.length === 0 ? (
            <div className="px-6 py-12 text-center text-gray-500">
              <div className="text-4xl mb-4">📦</div>
              <p className="text-lg font-medium">No products found</p>
              <p className="text-sm">Add your first product to get started</p>
            </div>
          ) : (
            currentItems.map((product, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-[80px_1fr_120px_100px_80px] gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                {/* Image */}
                <div className="flex justify-center md:justify-start">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                  />
                </div>

                {/* Product Details */}
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex flex-wrap gap-1 items-center">
                    {(expandedSizes.has(product._id) ? product.sizes : product.sizes?.slice(0, 3))?.map((size, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded font-medium"
                      >
                        {size}
                      </span>
                    ))}
                    {product.sizes?.length > 3 && (
                      <button
                        onClick={() => toggleSizeExpansion(product._id)}
                        className="inline-flex items-center text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                      >
                        {expandedSizes.has(product._id) 
                          ? 'Show less' 
                          : `+${product.sizes.length - 3} more`
                        }
                      </button>
                    )}
                  </div>
                </div>

                {/* Category */}
                <div className="flex items-center">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center">
                  <span className="text-lg font-semibold text-gray-900">
                    {currency}{product.price}
                  </span>
                </div>

                {/* Action */}
                <div className="flex items-center justify-center">
                  <button
                    onClick={() => deleteProduct(product._id)}
                    disabled={deleting === product._id}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Delete product"
                  >
                    {deleting === product._id ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-4 sm:px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-sm text-gray-500 order-2 sm:order-1">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex items-center gap-2 order-1 sm:order-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Prev
            </button>
            
            <div className="hidden sm:flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1 text-sm rounded-md ${
                      currentPage === pageNum
                        ? 'bg-indigo-600 text-white'
                        : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            
            <div className="sm:hidden text-sm text-gray-600">
              {currentPage} / {totalPages}
            </div>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
