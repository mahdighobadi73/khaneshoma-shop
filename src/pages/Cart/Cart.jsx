import CartItem from "/src/components/CartItem/CartItem";
import { formatPrice, toPersianNumber } from "../../utils/format";
import styles from "./Cart.module.css";
import { useNavigate } from "react-router-dom";

export default function Cart ( {
  cartItems,
  cartTotal,
  onIncrement,
  onDecrement,
  onRemove,
  onCheckout,
} ) {

  const navigate = useNavigate();

  if ( !cartItems.length ) {
    return (
      <section className={ styles.section }>
        <div className={ styles.container }>
          <div className={ `${ styles.emptyBox } ${ styles.largeEmpty }` }>
            <h2>سبد خرید شما خالی است</h2>
            <p>هنوز هیچ محصولی به سبد اضافه نشده. از صفحه محصولات شروع کن.</p>
            <button
              className={ styles.primaryBtn }
              onClick={ () => navigate( "/products" ) }
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
    <section className={ styles.section }>
      <div className={ styles.cartLayout }>
        <div className={ styles.cartList }>
          <div className={ `${ styles.sectionHead } ${ styles.leftHlign }` }>
            <span className={ styles.eyebrow }>سبد خرید</span>
            <h2>اقلام انتخاب‌شده</h2>
            <p>{ toPersianNumber( cartItems.length ) } محصول در سبد شما قرار دارد.</p>
          </div>

          { cartItems.map( ( item ) => (
            <CartItem
              key={ item.id }
              item={ item }
              onIncrement={ onIncrement }
              onDecrement={ onDecrement }
              onRemove={ onRemove }
            />
          ) ) }
        </div>

        <aside className={ styles.cartSummary }>
          <h3>خلاصه سفارش</h3>

          <div className={ styles.summaryRow }>
            <span>جمع سفارش</span>
            <strong>{ formatPrice( cartTotal ) }</strong>
          </div>

          <div className={ styles.summaryRow }>
            <span>هزینه ارسال</span>
            <strong>{ formatPrice( shipping ) }</strong>
          </div>

          <div className={ `${ styles.summaryRow } ${ styles.total }` }>
            <span>مبلغ نهایی</span>
            <strong>{ formatPrice( finalTotal ) }</strong>
          </div>

          <button className={ `${ styles.primaryBtn } ${ styles.fullWidth }` } onClick={ onCheckout }>
            نهایی‌سازی سفارش
          </button>

          <button
            className={ `${ styles.secondaryBtn } ${ styles.fullWidth }` }
            onClick={ () => navigate( "/products" ) }
          >
            ادامه خرید
          </button>
        </aside>
      </div>
    </section >
  );
}
