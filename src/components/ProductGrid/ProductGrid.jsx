import ProductCard from "/src/components/ProductCard/ProductCard";
import styles from "./ProductGrid.module.css";

export default function ProductGrid({ products, onAddToCart, emptyMessage }) {

  if (!products.length) {
    return (
      <div className={styles.emptyBox}>
        <p className={styles.emptyText}>
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className={styles.productsGrid}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
