import { Link } from "react-router-dom";
import { formatPrice } from "../utils/format";

export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`}>
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
      </Link>

      <p>{product.description}</p>
      <strong>{formatPrice(product.price)}</strong>

      <button onClick={() => onAddToCart(product.id)}>
        افزودن به سبد
      </button>
    </div>
  );
}
