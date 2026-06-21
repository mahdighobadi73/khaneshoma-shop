import { useParams, Link } from "react-router-dom";
import { formatPrice, toPersianNumber } from "../../utils/format";
import styles from "./ProductDetail.module.css";

export default function ProductDetail({ products, onAddToCart }) {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <section className={styles.notFoundSection}>
        <div className={styles.container}>
          <div className={styles.notFoundBox}>
            <span className={styles.notFoundIcon}>!</span>
            <h2>محصول یافت نشد</h2>
            <p>محصولی که به دنبال آن هستید وجود ندارد یا حذف شده است.</p>

            <Link to="/products" className={styles.backLink}>
              بازگشت به محصولات
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.productDetailSection}>
      <div className={styles.container}>
        <div className={styles.productDetail}>

          <div className={styles.imagePanel}>
            <div className={styles.imageWrapper}>
              <img
                className={styles.productImage}
                src={product.image}
                alt={product.name}
              />
            </div>
          </div>

          <div className={styles.infoPanel}>

            {product.badge && (
              <span className={styles.badge}>
                {product.badge}
              </span>
            )}

            <h1 className={styles.productTitle}>
              {product.name}
            </h1>

            <p className={styles.productDescription}>
              {product.description}
            </p>

            <div className={styles.metaGrid}>

              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>دسته‌بندی</span>
                <strong className={styles.metaValue}>
                  {product.category}
                </strong>
              </div>

              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>امتیاز</span>
                <strong className={styles.metaValue}>
                  ⭐ {toPersianNumber(product.rating)}
                </strong>
              </div>

              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>موجودی</span>
                <strong className={styles.metaValue}>
                  {toPersianNumber(product.stock)}
                </strong>
              </div>

            </div>

            <div className={styles.purchaseBox}>

              <div>
                <span className={styles.priceLabel}>قیمت محصول</span>
                <h2 className={styles.productPrice}>
                  {formatPrice(product.price)}
                </h2>
              </div>

              <button
                className={styles.addToCartButton}
                onClick={() => onAddToCart(product.id)}
              >
                افزودن به سبد خرید
              </button>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
