import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/format";
import styles from "./ProductCard.module.css";

export default function ProductCard ( { product, onAddToCart } ) {
  if ( !product ) return null;

  const {
    _id,
    name = "بدون نام",
    description = "",
    price = 0,
    images = [],
    stock = 0,
    badge,
    rating,
  } = product;

  const imageSrc = images?.[ 0 ] || "/placeholder.jpg";
  const isOutOfStock = stock <= 0;

  return (
    <article className={ styles.card }>
      <Link
        to={ `/products/${ _id }` }
        className={ styles.imageLink }
        aria-label={ `مشاهده ${ name }` }
      >
        <div className={ styles.imageWrapper }>
          { badge && (
            <span className={ styles.badge }>
              { badge }
            </span>
          ) }

          <img
            src={ imageSrc }
            alt={ name }
            className={ styles.productImage }
            loading="lazy"
          />
        </div>
      </Link>

      <div className={ styles.cardBody }>
        <Link
          to={ `/products/${ _id }` }
          className={ styles.productName }
        >
          { name }
        </Link>

        <p className={ styles.productDescription }>
          { description }
        </p>

        <div className={ styles.meta }>
          { rating !== undefined && (
            <span className={ styles.rating }>
              ⭐ { rating }
            </span>
          ) }

          <span
            className={ `${ styles.stock } ${ isOutOfStock ? styles.outOfStock : ""
              }` }
          >
            { isOutOfStock
              ? "ناموجود"
              : `موجودی: ${ stock }` }
          </span>
        </div>

        <div className={ styles.cardFooter }>
          <strong className={ styles.productPrice }>
            { formatPrice( price ) }
          </strong>

          <button
            className={ styles.addButton }
            onClick={ () => {
              if ( !isOutOfStock ) {
                onAddToCart( _id );
              }
            } }
            disabled={ isOutOfStock }
            aria-disabled={ isOutOfStock }
          >
            { isOutOfStock ? "ناموجود" : "افزودن" }
          </button>
        </div>
      </div>
    </article>
  );
}