import React from "react";
import { Link } from "react-router-dom";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useQuery } from "react-query";
import axios from "axios";

const Cart = () => {
  const { cart, updateCartItem, removeFromCart, getCartTotal, loading } =
    useCart();

  // Fetch product details for cart items
  const { data: cartProducts } = useQuery(
    ["cartProducts", cart],
    async () => {
      if (!cart.length) return [];
      const productIds = cart.map((item) => item.productId);
      const response = await axios.get(
        `/api/products?ids=${productIds.join(",")}`
      );
      return response.data.products;
    },
    { enabled: cart.length > 0 }
  );

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity <= 0) {
      await removeFromCart(productId);
    } else {
      await updateCartItem(productId, newQuantity);
    }
  };

  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8" />
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg p-6">
                  <div className="flex space-x-4">
                    <div className="bg-gray-200 h-24 w-24 rounded" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                      <div className="h-4 bg-gray-200 rounded w-1/4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!cart.length) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Your cart is empty
            </h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link to="/products" className="btn btn-primary">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Cart Items ({cart.length})
                </h2>
              </div>

              <div className="divide-y divide-gray-200">
                {cart.map((item) => {
                  const product = cartProducts?.find(
                    (p) => p._id === item.productId
                  );
                  if (!product) return null;

                  return (
                    <div key={item.productId} className="p-6">
                      <div className="flex space-x-4">
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="w-24 h-24 object-cover rounded-lg"
                        />

                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">
                                {product.title}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {product.brand}
                              </p>
                              <p className="text-sm text-gray-500">
                                Size: {product.size} | Color: {product.color}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-semibold text-gray-900">
                                ${(product.price * item.quantity).toFixed(2)}
                              </p>
                              <p className="text-sm text-gray-500">
                                ${product.price} each
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    item.productId,
                                    item.quantity - 1
                                  )
                                }
                                className="p-1 rounded-full hover:bg-gray-100"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="w-12 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    item.productId,
                                    item.quantity + 1
                                  )
                                }
                                className="p-1 rounded-full hover:bg-gray-100"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.productId)}
                              className="text-red-600 hover:text-red-800 flex items-center space-x-1"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">
                      Total
                    </span>
                    <span className="text-lg font-semibold text-gray-900">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full btn btn-primary py-3 text-lg"
              >
                Proceed to Checkout
              </Link>

              <div className="mt-4 text-center">
                <Link
                  to="/products"
                  className="text-primary-600 hover:text-primary-700 text-sm"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
