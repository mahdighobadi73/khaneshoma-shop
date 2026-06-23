import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatPrice, toPersianNumber } from "../../utils/format";
import styles from "./ProductDetail.module.css";

export default function ProductDetail({ onAddToCart }) {

  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* =========================
     FETCH SINGLE PRODUCT
  ========================= */
  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);

        const res = await fetch(`http://localhost:5000/api/products/${id}`);

        if (!res.ok) {
          throw new Error("Product not found");
        }

        const data = await res.json();

        setProduct(data);
        setSelectedImage(data?.images?.[0] || "");

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  /* =========================
     STATES
  ========================= */

  if (loading) {
    return (
      <p className={styles.loading}>
        در حال بارگذاری محصول...
      </p>
    );
  }

  if (error || !product) {
    return (
      <section className={styles.notFoundSection}>
        <div className={styles.container}>
          <div className={styles.notFoundBox}>
            <span className={styles.notFoundIcon}>!</span>
            <h2>محصول یافت نشد</h2>
            <p>{error || "این محصول وجود ندارد یا حذف شده است"}</p>

            <Link to="/products" className={styles.backLink}>
              بازگشت به محصولات
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const isOutOfStock = product.stock <= 0;

  return (
    <section className={styles.productDetailSection}>
      <div className={styles.container}>
        <div className={styles.productDetail}>

          {/* IMAGE */}
          <div className={styles.imagePanel}>
            <div className={styles.gallery}>

              <div className={styles.thumbnails}>
                {product.images?.map((img, index) => (
                  <button
                    key={index}
                    className={`${styles.thumb} ${
                      selectedImage === img ? styles.activeThumb : ""
                    }`}
                    onClick={() => setSelectedImage(img)}
                  >
                    <img src={img} alt={`${product.name}-${index}`} />
                  </button>
                ))}
              </div>

              <div className={styles.imageWrapper}>
                <img
                  src={selectedImage}
                  alt={product.name}
                  className={styles.productImage}
                />
              </div>

            </div>
          </div>

          {/* INFO */}
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

            {/* META */}
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
            </div>

            {/* PURCHASE */}
            <div className={styles.purchaseBox}>

              <span className={styles.stockStatus}>
                {isOutOfStock
                  ? "ناموجود"
                  : `✓ ${toPersianNumber(product.stock)} عدد موجود`}
              </span>

              <div>
                <span className={styles.priceLabel}>قیمت محصول</span>
                <h2 className={styles.productPrice}>
                  {formatPrice(product.price)}
                </h2>
              </div>

              <button
                className={styles.addToCartButton}
                onClick={() => onAddToCart(product._id || product.id)}
                disabled={isOutOfStock}
              >
                {isOutOfStock ? "ناموجود" : "افزودن به سبد خرید"}
              </button>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}