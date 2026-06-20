import { formatPrice, toPersianNumber } from "../../utils/format";

export default function CartItem({
  item,
  onIncrement,
  onDecrement,
  onRemove,
}) {
  return (
    <div className="cart-item">
      <img className="cart-item-image" src={item.image} alt={item.name} />

      <div className="cart-item-info">
        <h3>{item.name}</h3>
        <p>{item.category}</p>
        <strong>{formatPrice(item.price)}</strong>
      </div>

      <div className="cart-item-actions">
        <div className="quantity-box">
          <button onClick={() => onIncrement(item.id)}>+</button>
          <span>{toPersianNumber(item.quantity)}</span>
          <button onClick={() => onDecrement(item.id)}>-</button>
        </div>

        <div className="line-total">{formatPrice(item.lineTotal)}</div>

        <button className="danger-btn" onClick={() => onRemove(item.id)}>
          حذف
        </button>
      </div>
    </div>
  );
}
