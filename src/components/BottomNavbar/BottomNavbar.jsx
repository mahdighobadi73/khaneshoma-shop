import { NavLink } from "react-router-dom";
import styles from "./BottomNavbar.module.css";
import {
    HiOutlineHome,
    HiOutlineShoppingBag,
    HiOutlineShoppingCart,
    HiOutlinePhone,
    HiOutlineUser
} from "react-icons/hi";

export default function BottomNavbar ( { cartCount = 0 } ) {
    return (
        <nav className={ styles.bottomNav }>

            <NavLink to="/" end>
                <HiOutlineHome className={ styles.icon } />
                <small>خانه</small>
            </NavLink>

            <NavLink to="/products">
                <HiOutlineShoppingBag className={ styles.icon } />
                <small>محصولات</small>
            </NavLink>

            <NavLink to="/cart" className={ styles.cartLink }>
                <HiOutlineShoppingCart className={ styles.icon } />

                { cartCount > 0 && (
                    <div className={ styles.badge }>
                        { cartCount }
                    </div>
                ) }

                <small>سبد خرید</small>
            </NavLink>

            <NavLink to="/contact">
                <HiOutlinePhone className={ styles.icon } />
                <small>تماس</small>
            </NavLink>

            <NavLink to="/about">
                <HiOutlineUser className={ styles.icon } />
                <small>حساب من</small>
            </NavLink>

        </nav>
    );
}