import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "./components/Header/Header";
import BottomNavbar from "./components/BottomNavbar/BottomNavbar";
import Toast from "./components/Toast/Toast";

import useCart from "./hooks/useCart";

import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import PaymentVerify from "./pages/PaymentVerify/PaymentVerify";

export default function App () {
    const navigate = useNavigate();

    const [ toastMessage, setToastMessage ] = useState( "" );
    const [ products, setProducts ] = useState( [] );
    const [ loading, setLoading ] = useState( true );
    const [ error, setError ] = useState( null );

    /* =========================
       FETCH PRODUCTS
    ========================= */

    useEffect( () => {
        async function loadProducts () {
            try {
                setLoading( true );

                const response = await fetch(
                    "http://localhost:5000/api/products"
                );

                if ( !response.ok ) {
                    throw new Error( "خطا در دریافت محصولات" );
                }

                const data = await response.json();

                setProducts( data );
            } catch ( err ) {
                console.error( err );
                setError( err.message );
            } finally {
                setLoading( false );
            }
        }

        loadProducts();
    }, [] );

    /* =========================
       CART
    ========================= */

    const {
        cartItems,
        cartCount,
        cartTotal,
        addToCart,
        increment,
        decrement,
        removeFromCart,
        clearCart,
    } = useCart( products );

    /* =========================
       TOAST
    ========================= */

    function showToast ( message ) {
        setToastMessage( message );
    }

    useEffect( () => {
        if ( !toastMessage ) return;

        const timer = setTimeout( () => {
            setToastMessage( "" );
        }, 3000 );

        return () => clearTimeout( timer );
    }, [ toastMessage ] );

    /* =========================
       ADD TO CART
    ========================= */

    function handleAddToCart ( productId ) {
        const product = products.find(
            ( p ) => p._id === productId
        );

        if ( !product ) return;

        const cartItem =
            cartItems.find(
                ( item ) => item._id === productId
            ) ?? null;

        if (
            product.stock <= 0 ||
            cartItem?.quantity >= product.stock
        ) {
            showToast( "موجودی کافی نیست." );
            return;
        }

        addToCart( productId );

        showToast(
            `"${ product.name }" به سبد اضافه شد.`
        );
    }

    /* =========================
       CHECKOUT
    ========================= */

    function handleCheckout () {
        navigate( "/checkout", {
            state: {
                cartItems,
                cartTotal,
            },
        } );

        showToast( "✓ سفارش ثبت شد." );
    }

    /* =========================
       STATES
    ========================= */

    if ( loading ) {
        return (
            <div
                style={ {
                    textAlign: "center",
                    padding: "40px",
                } }
            >
                در حال بارگذاری محصولات...
            </div>
        );
    }

    if ( error ) {
        return (
            <div
                style={ {
                    textAlign: "center",
                    padding: "40px",
                } }
            >
                خطا: { error }
            </div>
        );
    }

    /* =========================
       UI
    ========================= */

    return (
        <>
            <Header
                cartCount={ cartCount }
                products={ products }
            />

            <Routes>
                <Route
                    path="/"
                    element={
                        <Home
                            products={ products }
                            onAddToCart={ handleAddToCart }
                        />
                    }
                />

                <Route
                    path="/products"
                    element={
                        <Products
                            onAddToCart={ handleAddToCart }
                        />
                    }
                />

                <Route
                    path="/products/:id"
                    element={
                        <ProductDetail
                            onAddToCart={ handleAddToCart }
                        />
                    }
                />

                <Route
                    path="/cart"
                    element={
                        <Cart
                            cartItems={ cartItems }
                            cartTotal={ cartTotal }
                            onIncrement={ increment }
                            onDecrement={ decrement }
                            onRemove={ removeFromCart }
                            onCheckout={ handleCheckout }
                        />
                    }
                />

                <Route
                    path="/about"
                    element={ <About /> }
                />

                <Route
                    path="/contact"
                    element={ <Contact /> }
                />

                <Route
                    path="/checkout"
                    element={ <Checkout /> }
                />

                <Route
                    path="/verify-payment"
                    element={ <PaymentVerify /> }
                />
            </Routes>

            <BottomNavbar
                cartCount={ cartCount }
            />

            <Toast message={ toastMessage } />
        </>
    );
}