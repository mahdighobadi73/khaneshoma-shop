import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import BottomNavbar from "./components/BottomNavbar/BottomNavbar";
import Toast from "./components/Toast/Toast";

import { PRODUCTS } from "./data/products";
import useCart from "./hooks/useCart";

import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import PaymentVerify from "./pages/PaymentVerify/PaymentVerify";

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
        clearCart
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
        const product = PRODUCTS.find(p => p.id === productId);
        if (!product) return;

        const cartItem = cartItems.find(item => item.id === productId) ?? null;
        console.log(cartItem);
        if (product.stock <= 0 || cartItem?.quantity >= product.stock) {
            showToast("موجودی کافی نیست.");
            return;
        }

        addToCart(productId);
        showToast(`"${product.name}" به سبد اضافه شد.`);
    }

    function handleCheckout() {
        navigate("/Checkout", {
  state: { cartItems, cartTotal },
});
        showToast("✓ سفارش ثبت شد.");
    }

    return (
        <>
            {/* HEADER */}

            <Header cartCount={cartCount} products={PRODUCTS} />

            {/* ROUTES */}

            <Routes>
                <Route
                    path="/"
                    element={
                        <Home
                            products={PRODUCTS}
                            onAddToCart={handleAddToCart}
                        />
                    }
                />

                <Route
                    path="/products"
                    element={
                        <Products
                            products={PRODUCTS}
                            onAddToCart={handleAddToCart}
                        />
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
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/verify-payment" element={<PaymentVerify />} />
            </Routes>

            {/* MOBILE NAVBAR */}

            <BottomNavbar />

            {/* TOAST */}

            <Toast message={toastMessage} />
        </>
    );
}
