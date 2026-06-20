import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Toast from "./components/Toast";
import { PRODUCTS } from "./data/products";
import useCart from "./hooks/useCart";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";

import { useEffect, useState } from "react";

export default function App() {
  const [toastMessage, setToastMessage] = useState("");

  const {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    increment,
    decrement,
    removeFromCart,
    clearCart,
  } = useCart(PRODUCTS);

  function showToast(message) {
    setToastMessage(message);
  }

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(""), 3000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  function handleAddToCart(productId) {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;

    const added = addToCart(productId);

    if (added) {
      showToast(`"${product.name}" به سبد اضافه شد.`);
    } else {
      showToast("موجودی کافی نیست.");
    }
  }

  function handleCheckout() {
    clearCart();
    showToast("✓ سفارش ثبت شد.");
  }

  return (
    <>
      <Header cartCount={cartCount} />

      <Routes>
        <Route
          path="/"
          element={<Home products={PRODUCTS} onAddToCart={handleAddToCart} />}
        />

        <Route
          path="/products"
          element={
            <Products products={PRODUCTS} onAddToCart={handleAddToCart} />
          }
        />

        <Route
          path="/products/:id"
          element={
            <ProductDetail
              products={PRODUCTS}
              onAddToCart={handleAddToCart}
            />
          }
        />

        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              cartTotal={cartTotal}
              onIncrement={increment}
              onDecrement={decrement}
              onRemove={removeFromCart}
              onCheckout={handleCheckout}
            />
          }
        />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Toast message={toastMessage} />
    </>
  );
}
