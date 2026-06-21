import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { toPersianNumber } from "../../utils/format";
import styles from "./Header.module.css";

export default function Header({ cartCount }) {
    const [menuOpen, setMenuOpen] = useState(false);

    // close menu with ESC
    useEffect(() => {
        const handler = e => {
            if (e.key === "Escape") setMenuOpen(false);
        };

        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);

    const closeMenu = () => setMenuOpen(false);

    return (
        <>
            <header className={styles.header}>
                <div className={`container ${styles.inner}`}>
                    <Link to="/" className={styles.logo}>
                        🏠 خانه شما
                    </Link>

                    {/* hamburger */}
                    <button
                        className={`${styles.hamburger} ${menuOpen ? styles.active : ""}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    {/* navigation */}
                    <nav
                        className={`${styles.nav} ${menuOpen ? styles.open : ""}`}
                    >
                        <NavLink to="/" onClick={closeMenu}>
                            خانه
                        </NavLink>

                        <NavLink to="/products" onClick={closeMenu}>
                            محصولات
                        </NavLink>

                        <NavLink to="/about" onClick={closeMenu}>
                            درباره ما
                        </NavLink>

                        <NavLink to="/contact" onClick={closeMenu}>
                            تماس
                        </NavLink>
                    </nav>

                    <Link to="/cart" className={styles.cart}>
                        🛒 {toPersianNumber(cartCount)}
                    </Link>
                </div>
            </header>

            {/* overlay */}
            {menuOpen && (
                <div className={styles.overlay} onClick={closeMenu}></div>
            )}
        </>
    );
}
