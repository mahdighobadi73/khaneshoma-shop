import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/format";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product, onAddToCart }) {
  return (
    <article className={styles.card}>

      <Link
        to={`/products/${product.id}`}
        className={styles.imageLink}
      >
        <div className={styles.imageWrapper}>
          <img
            src={product.image}
            alt={product.name}
            className={styles.productImage}
          />
        </div>
      </Link>

      <div className={styles.cardBody}>

        <Link
          to={`/products/${product.id}`}
          className={styles.productName}
        >
          {product.name}
        </Link>

        <p className={styles.productDescription}>
          {product.description}
        </p>

        <div className={styles.cardFooter}>

          <strong className={styles.productPrice}>
            {formatPrice(product.price)}
          </strong>

          <button
            className={styles.addButton}
            onClick={() => onAddToCart(product.id)}
          >
            افزودن
          </button>

        </div>

      </div>

    </article>
  );
}
