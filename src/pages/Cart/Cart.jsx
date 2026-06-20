import CartItem from "../components/CartItem";
import { formatPrice, toPersianNumber } from "../../utils/format";

export default function Cart({
  cartItems,
  cartTotal,
  onNavigate,
  onIncrement,
  onDecrement,
  onRemove,
  onCheckout,
}) {
  if (!cartItems.length) {
    return (
      <section className="section">
        <div className="container">
          <div className="empty-box large-empty">
            <h2>سبد خرید شما خالی است</h2>
            <p>هنوز هیچ محصولی به سبد اضافه نشده. از صفحه محصولات شروع کن.</p>
            <button
              className="primary-btn"
              onClick={() => onNavigate("products")}
            >
              رفتن به محصولات
            </button>
          </div>
        </div>
      </section>
    );
  }

  const shipping = 0;
  const finalTotal = cartTotal + shipping;

  return (
    <section className="section">
      <div className="container cart-layout">
        <div className="cart-list">
          <div className="section-head left-align">
            <span className="eyebrow">سبد خرید</span>
            <h2>اقلام انتخاب‌شده</h2>
            <p>{toPersianNumber(cartItems.length)} محصول در سبد شما قرار دارد.</p>
          </div>

          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
              onRemove={onRemove}
            />
          ))}
        </div>

        <aside className="cart-summary">
          <h3>خلاصه سفارش</h3>

          <div className="summary-row">
            <span>جمع سفارش</span>
            <strong>{formatPrice(cartTotal)}</strong>
          </div>

          <div className="summary-row">
            <span>هزینه ارسال</span>
            <strong>{formatPrice(shipping)}</strong>
          </div>

          <div className="summary-row total">
            <span>مبلغ نهایی</span>
            <strong>{formatPrice(finalTotal)}</strong>
          </div>

          <button className="primary-btn full-width" onClick={onCheckout}>
            نهایی‌سازی سفارش
          </button>

          <button
            className="secondary-btn full-width"
            onClick={() => onNavigate("products")}
          >
            ادامه خرید
          </button>
        </aside>
      </div>
    </section>
  );
}
