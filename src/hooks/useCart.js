import { useEffect, useMemo, useState } from "react";
import { safeParseJSON, validateCart } from "../utils/format";

const STORAGE_KEY = "khaneshoma_cart_v1";

export default function useCart(products) {

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem(STORAGE_KEY);
    return safeParseJSON(savedCart, []);
  });

  useEffect(() => {
    if (!products || products.length === 0) return;

    setCart((prev) => validateCart(prev, products));
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (err) {
      console.error("Cart storage failed:", err);
    }
  }, [cart]);

  const cartItems = useMemo(() => {
    return cart
      .map((item) => {
        const product = products.find((p) => p.id === item.id);
        if (!product) return null;

        return {
          ...product,
          quantity: item.quantity,
          lineTotal: product.price * item.quantity,
        };
      })
      .filter(Boolean);
  }, [cart, products]);

  const cartCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const cartTotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.lineTotal, 0);
  }, [cartItems]);

  function addToCart(productId) {
    const product = products.find((item) => item.id === productId);
    if (!product || product.stock <= 0) return;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === productId);

      if (existing) {
        if (existing.quantity >= product.stock) return prev;

        return prev.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { id: productId, quantity: 1 }];
    });
  }

  function updateQuantity(productId, nextQuantity) {
    const product = products.find((item) => item.id === productId);
    if (!product) return;

    if (nextQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const safeQuantity = Math.min(nextQuantity, product.stock);

    setCart((prev) =>
      prev.map((item) =>
        item.id === productId
          ? { ...item, quantity: safeQuantity }
          : item
      )
    );
  }

  function increment(productId) {
    const target = cart.find((item) => item.id === productId);
    if (!target) return;

    updateQuantity(productId, target.quantity + 1);
  }

  function decrement(productId) {
    const target = cart.find((item) => item.id === productId);
    if (!target) return;

    updateQuantity(productId, target.quantity - 1);
  }

  function removeFromCart(productId) {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  }

  function clearCart() {
    setCart([]);
  }

  return {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    updateQuantity,
    increment,
    decrement,
    removeFromCart,
    clearCart,
  };
}
