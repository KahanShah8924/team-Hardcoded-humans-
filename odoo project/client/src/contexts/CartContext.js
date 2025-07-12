import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadCart();
    } else {
      setCart([]);
    }
  }, [user]);

  const loadCart = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const response = await axios.get("/api/cart");
      setCart(response.data);
    } catch (error) {
      console.error("Error loading cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    if (!user) {
      toast.error("Please login to add items to cart");
      return false;
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/cart", { productId, quantity });
      setCart(response.data);
      toast.success("Added to cart!");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add to cart");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateCartItem = async (productId, quantity) => {
    if (!user) return false;

    try {
      setLoading(true);
      const response = await axios.put(`/api/cart/${productId}`, { quantity });
      setCart(response.data);
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update cart");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    if (!user) return false;

    try {
      setLoading(true);
      const response = await axios.delete(`/api/cart/${productId}`);
      setCart(response.data);
      toast.success("Item removed from cart");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove item");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    if (!user) return false;

    try {
      setLoading(true);
      await axios.delete("/api/cart");
      setCart([]);
      toast.success("Cart cleared");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to clear cart");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cart,
    loading,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
