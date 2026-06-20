import ProductCard from "./ProductCard";

export default function ProductGrid({ products, onAddToCart, emptyMessage }) {
  if (!products.length) {
    return <div className="empty-box">{emptyMessage}</div>;
  }

  return (
    <div className="products-grid">
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
