import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Filter, Grid, List, ChevronDown, Heart, Star } from "lucide-react";
import axios from "axios";
import ProductCard from "../components/products/ProductCard";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);

  // Get current filters from URL
  const currentFilters = {
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "",
    subcategory: searchParams.get("subcategory") || "",
    brand: searchParams.get("brand") || "",
    condition: searchParams.get("condition") || "",
    size: searchParams.get("size") || "",
    color: searchParams.get("color") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    sort: searchParams.get("sort") || "createdAt",
    order: searchParams.get("order") || "desc",
    page: searchParams.get("page") || "1",
  };

  // Fetch products
  const { data: productsData, isLoading } = useQuery(
    ["products", currentFilters],
    async () => {
      const params = new URLSearchParams();
      Object.entries(currentFilters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      const response = await axios.get(`/api/products?${params.toString()}`);
      return response.data;
    }
  );

  // Fetch filters data
  const { data: brands } = useQuery("brands", async () => {
    const response = await axios.get("/api/products/brands");
    return response.data;
  });

  const { data: categories } = useQuery("categories", async () => {
    const response = await axios.get("/api/products/categories");
    return response.data;
  });

  const updateFilters = (newFilters) => {
    const updatedFilters = { ...currentFilters, ...newFilters, page: "1" };
    setSearchParams(updatedFilters);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const conditions = ["Like New", "Excellent", "Good", "Fair"];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const colors = [
    "Black",
    "White",
    "Blue",
    "Red",
    "Green",
    "Yellow",
    "Pink",
    "Purple",
    "Brown",
    "Gray",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {currentFilters.search
              ? `Search: "${currentFilters.search}"`
              : "All Products"}
          </h1>
          {productsData && (
            <p className="text-gray-600">{productsData.total} items found</p>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  Clear All
                </button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <input
                  type="text"
                  value={currentFilters.search}
                  onChange={(e) => updateFilters({ search: e.target.value })}
                  placeholder="Search products..."
                  className="input"
                />
              </div>

              {/* Category */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={currentFilters.category}
                  onChange={(e) => updateFilters({ category: e.target.value })}
                  className="input"
                >
                  <option value="">All Categories</option>
                  {categories?.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Brand */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand
                </label>
                <select
                  value={currentFilters.brand}
                  onChange={(e) => updateFilters({ brand: e.target.value })}
                  className="input"
                >
                  <option value="">All Brands</option>
                  {brands?.slice(0, 20).map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>

              {/* Condition */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Condition
                </label>
                <select
                  value={currentFilters.condition}
                  onChange={(e) => updateFilters({ condition: e.target.value })}
                  className="input"
                >
                  <option value="">All Conditions</option>
                  {conditions.map((condition) => (
                    <option key={condition} value={condition}>
                      {condition}
                    </option>
                  ))}
                </select>
              </div>

              {/* Size */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Size
                </label>
                <select
                  value={currentFilters.size}
                  onChange={(e) => updateFilters({ size: e.target.value })}
                  className="input"
                >
                  <option value="">All Sizes</option>
                  {sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              {/* Color */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color
                </label>
                <select
                  value={currentFilters.color}
                  onChange={(e) => updateFilters({ color: e.target.value })}
                  className="input"
                >
                  <option value="">All Colors</option>
                  {colors.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={currentFilters.minPrice}
                    onChange={(e) =>
                      updateFilters({ minPrice: e.target.value })
                    }
                    className="input"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={currentFilters.maxPrice}
                    onChange={(e) =>
                      updateFilters({ maxPrice: e.target.value })
                    }
                    className="input"
                  />
                </div>
              </div>

              {/* Sort */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={`${currentFilters.sort}-${currentFilters.order}`}
                  onChange={(e) => {
                    const [sort, order] = e.target.value.split("-");
                    updateFilters({ sort, order });
                  }}
                  className="input"
                >
                  <option value="createdAt-desc">Newest First</option>
                  <option value="createdAt-asc">Oldest First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="views-desc">Most Popular</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${
                    viewMode === "grid"
                      ? "bg-primary-100 text-primary-600"
                      : "text-gray-400"
                  }`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${
                    viewMode === "list"
                      ? "bg-primary-100 text-primary-600"
                      : "text-gray-400"
                  }`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>

              <div className="text-sm text-gray-600">
                Showing {productsData?.products?.length || 0} of{" "}
                {productsData?.total || 0} items
              </div>
            </div>

            {/* Products */}
            {isLoading ? (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-1"
                }`}
              >
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="product-card animate-pulse">
                    <div className="bg-gray-200 h-64 rounded-t-lg" />
                    <div className="p-4">
                      <div className="h-4 bg-gray-200 rounded mb-2" />
                      <div className="h-3 bg-gray-200 rounded mb-2" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : productsData?.products?.length > 0 ? (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-1"
                }`}
              >
                {productsData.products.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Filter className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or search terms
                </p>
                <button onClick={clearFilters} className="btn btn-primary">
                  Clear Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {productsData && productsData.totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      updateFilters({
                        page: Math.max(1, parseInt(currentFilters.page) - 1),
                      })
                    }
                    disabled={parseInt(currentFilters.page) <= 1}
                    className="btn btn-outline disabled:opacity-50"
                  >
                    Previous
                  </button>

                  {[...Array(productsData.totalPages)].map((_, i) => {
                    const page = i + 1;
                    const isCurrent = page === parseInt(currentFilters.page);
                    return (
                      <button
                        key={page}
                        onClick={() => updateFilters({ page: page.toString() })}
                        className={`px-3 py-2 rounded-lg ${
                          isCurrent
                            ? "bg-primary-600 text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}

                  <button
                    onClick={() =>
                      updateFilters({
                        page: Math.min(
                          productsData.totalPages,
                          parseInt(currentFilters.page) + 1
                        ),
                      })
                    }
                    disabled={
                      parseInt(currentFilters.page) >= productsData.totalPages
                    }
                    className="btn btn-outline disabled:opacity-50"
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
