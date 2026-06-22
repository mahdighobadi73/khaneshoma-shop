import { useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Checkout.module.css";

export default function Checkout() {

  const location = useLocation();
  const { cartItems, cartTotal } = location.state || {};

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    postalCode: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handlePayment = async () => {

    const res = await fetch("http://localhost:5000/api/payment/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: cartTotal,
        description: "خرید از سایت",
        customer: form
      })
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    }
  };

  return (
    <div className={styles.container}>

      <h2>اطلاعات ارسال</h2>

      <input
        name="name"
        placeholder="نام و نام خانوادگی"
        onChange={handleChange}
      />

      <input
        name="phone"
        placeholder="شماره موبایل"
        onChange={handleChange}
      />

      <textarea
        name="address"
        placeholder="آدرس کامل"
        onChange={handleChange}
      />

      <input
        name="postalCode"
        placeholder="کد پستی"
        onChange={handleChange}
      />

      <button
        className={styles.payBtn}
        onClick={handlePayment}
      >
        پرداخت {cartTotal.toLocaleString()} تومان
      </button>

    </div>
  );
}
