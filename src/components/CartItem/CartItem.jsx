import { formatPrice, toPersianNumber } from "../../utils/format";
import style from "./CartItem.module.css";

export default function CartItem ( {
  item,
  onIncrement,
  onDecrement,
  onRemove,
} ) {
  return (
    <div className={ style.cartItem }>
      <div className={ style.imageWrapper }>
        <img
          className={ style.cartItemImage }
          src={ item.images?.[ 0 ] || "/placeholder.jpg" }
          alt={ item.name }
        />
      </div>

      <div className={ style.cartItemInfo }>
        <h3 className={ style.productName }>
          { item.name }
        </h3>

        <p className={ style.productCategory }>
          { item.category }
        </p>

        <strong className={ style.productPrice }>
          { formatPrice( item.price ) }
        </strong>
      </div>

      <div className={ style.cartItemActions }>
        <div className={ style.quantityBox }>
          <button
            className={ style.quantityBtn }
            onClick={ () => onIncrement( item.id ) }
          >
            +
          </button>

          <span className={ style.quantityValue }>
            { toPersianNumber( item.quantity ) }
          </span>

          <button
            className={ style.quantityBtn }
            onClick={ () => onDecrement( item.id ) }
          >
            -
          </button>
        </div>

        <div className={ style.lineTotal }>
          { formatPrice( item.lineTotal ) }
        </div>

        <button
          className={ style.removeButton }
          onClick={ () => onRemove( item.id ) }
        >
          حذف
        </button>
      </div>
    </div>
  );
}