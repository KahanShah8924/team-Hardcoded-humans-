import React from "react";
import { Link } from "react-router-dom";
import { Heart, Star, Eye } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";

const ProductCard = ({ product, viewMode = "grid" }) => {
  const { user } = useAuth();
  const { addToCart } = useCart();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (user) {
      await addToCart(product._id, 1);
    }
  };

  if (viewMode === "list") {
    return (
      <Link to={`/products/${product._id}`} className="block">
        <div className="product-card group">
          <div className="flex">
            <div className="flex-shrink-0 w-48 h-48">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover rounded-l-lg group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex-1 p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <span>Size: {product.size}</span>
                    <span>Color: {product.color}</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      {product.condition}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-900">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handleAddToCart}
                        className="btn btn-primary text-sm"
                      >
                        Add to Cart
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                        <Heart className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/products/${product._id}`} className="block">
      <div className="product-card group">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Badges */}
          <div className="absolute top-2 left-2">
            <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">
              {product.condition}
            </span>
          </div>

          <div className="absolute top-2 right-2">
            <button className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
              <Heart className="h-4 w-4 text-gray-600" />
            </button>
          </div>

          {/* Quick Add to Cart */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleAddToCart}
              className="w-full btn btn-primary text-sm"
            >
              Add to Cart
            </button>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-1 truncate group-hover:text-primary-600 transition-colors">
            {product.title}
          </h3>
          <p className="text-sm text-gray-500 mb-2">{product.brand}</p>

          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-1">
              <span className="font-semibold text-gray-900">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <Eye className="h-4 w-4" />
              <span>{product.views}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{product.size}</span>
            <span>{product.color}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
