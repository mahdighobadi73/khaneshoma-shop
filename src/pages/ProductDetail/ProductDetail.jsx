import { useParams, Link } from "react-router-dom";
import { formatPrice, toPersianNumber } from "../../utils/format";

export default function ProductDetail({ products, onAddToCart }) {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="container section">
        <h2>محصول یافت نشد</h2>
        <Link to="/products">بازگشت به محصولات</Link>
      </div>
    );
  }

  return (
    <section className="section">
      <div className="container product-detail">
        <img src={product.image} alt={product.name} />

        <div>
          <span className="badge">{product.badge}</span>
          <h1>{product.name}</h1>

          <p>{product.description}</p>

          <p>دسته‌بندی: {product.category}</p>
          <p>امتیاز: ⭐ {toPersianNumber(product.rating)}</p>
          <p>موجودی: {toPersianNumber(product.stock)}</p>

          <h2>{formatPrice(product.price)}</h2>

          <button
            className="primary-btn"
            onClick={() => onAddToCart(product.id)}
          >
            افزودن به سبد خرید
          </button>
        </div>
      </div>
    </section>
  );
}
