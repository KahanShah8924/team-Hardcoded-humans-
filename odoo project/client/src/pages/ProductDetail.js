import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import {
  Heart,
  Share2,
  Star,
  Eye,
  Truck,
  Shield,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import toast from "react-hot-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const {
    data: product,
    isLoading,
    error,
  } = useQuery(["product", id], async () => {
    const response = await axios.get(`/api/products/${id}`);
    return response.data;
  });

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please login to add items to cart");
      return;
    }

    const success = await addToCart(product._id, quantity);
    if (success) {
      toast.success("Added to cart!");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gray-200 h-96 rounded-lg" />
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Product not found
          </h1>
          <Link to="/products" className="btn btn-primary">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link
            to="/products"
            className="text-primary-600 hover:text-primary-700"
          >
            ← Back to Products
          </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <div className="mb-4">
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`border-2 rounded-lg overflow-hidden ${
                      selectedImage === index
                        ? "border-primary-600"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div>
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.title}
              </h1>
              <p className="text-lg text-gray-600 mb-4">{product.brand}</p>

              <div className="flex items-center space-x-4 mb-4">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {product.condition}
                </span>
                <div className="flex items-center text-sm text-gray-500">
                  <Eye className="h-4 w-4 mr-1" />
                  {product.views} views
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              {product.originalPrice && (
                <p className="text-sm text-green-600 mt-1">
                  {Math.round(
                    ((product.originalPrice - product.price) /
                      product.originalPrice) *
                      100
                  )}
                  % off
                </p>
              )}
            </div>

            {/* Product Details */}
            <div className="mb-6 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Size:</span>
                <span className="font-medium">{product.size}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Color:</span>
                <span className="font-medium">{product.color}</span>
              </div>
              {product.material && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Material:</span>
                  <span className="font-medium">{product.material}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Seller:</span>
                <span className="font-medium">
                  {product.seller?.name || "Anonymous"}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Add to Cart */}
            <div className="mb-6">
              <div className="flex items-center space-x-4 mb-4">
                <label className="text-sm font-medium text-gray-700">
                  Quantity:
                </label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full btn btn-primary py-3 text-lg"
              >
                Add to Cart - ${(product.price * quantity).toFixed(2)}
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4 mb-6">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors">
                <Heart className="h-5 w-5" />
                <span>Add to Wishlist</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors">
                <Share2 className="h-5 w-5" />
                <span>Share</span>
              </button>
            </div>

            {/* Shipping Info */}
            <div className="border-t border-gray-200 pt-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Truck className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-600">
                    Free shipping on orders over $50
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-600">
                    30-day return policy
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            You might also like
          </h2>
          {/* Add related products component here */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
