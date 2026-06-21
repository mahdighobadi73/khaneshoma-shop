import { NavLink } from "react-router-dom";
import styles from "./BottomNavbar.module.css";

export default function BottomNavbar() {
    return (
        <nav className={styles.bottomNav}>

            <NavLink to="/" end>
                <span>🏠</span>
                خانه
            </NavLink>

            <NavLink to="/products">
                <span>📦</span>
                محصولات
            </NavLink>

            <NavLink to="/about">
                <span>ℹ️</span>
                درباره
            </NavLink>

            <NavLink to="/contact">
                <span>☎️</span>
                تماس
            </NavLink>

        </nav>
    );
}
