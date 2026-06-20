import { Link } from "react-router-dom";
import { toPersianNumber } from "../utils/format";

export default function Header({ cartCount }) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand">
          🏠 خانه شما
        </Link>

        <nav className="desktop-nav">
          <Link to="/">خانه</Link>
          <Link to="/products">محصولات</Link>
          <Link to="/about">درباره ما</Link>
          <Link to="/contact">تماس</Link>
        </nav>

        <Link to="/cart" className="cart-btn">
          🛒 {toPersianNumber(cartCount)}
        </Link>
      </div>
    </header>
  );
}
