import { useState } from "react";
import { sanitizeInput } from "../../utils/format";
import styles from "./Contact.module.css";

const INITIAL_FORM = {
  name: "",
  email: "",
  message: ""
};

export default function Contact() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      newErrors.name = "وارد کردن نام الزامی است.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "ایمیل الزامی است.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "فرمت ایمیل صحیح نیست.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "نوشتن پیام الزامی است.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    const maxLength = name === "message" ? 500 : 120;

    const sanitized = sanitizeInput(value, maxLength);

    setFormData(prev => ({
      ...prev,
      [name]: sanitized
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (loading) return;
    if (!validate()) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData(INITIAL_FORM);

      setTimeout(() => setSubmitted(false), 4000);
    }, 1500);
  };

  return (
    <section className={styles["contact-section"]}>
      <div className={`container ${styles["contact-layout"]}`}>

        {/* LEFT SIDE */}
        <div>
          <div className="section-head left-align">
            <span className="eyebrow">تماس با ما</span>
            <h2>ارتباط با تیم ما</h2>
            <p>
              اگر سوالی درباره خدمات یا همکاری دارید، از طریق فرم زیر با ما در ارتباط باشید.
            </p>
          </div>

          <div className={`content-card ${styles["contact-info"]}`}>
            <p><strong>آدرس:</strong> تهران، نیاوران، پلاک ۱۲۳</p>
            <p><strong>تلفن:</strong> 021-12345678</p>
            <p><strong>ایمیل:</strong> info@khaneshoma.ir</p>
            <p><strong>ساعات کاری:</strong> شنبه تا پنجشنبه، ۹ تا ۱۸</p>
          </div>
        </div>

        {/* FORM */}
        <form
          className={styles["contact-form"]}
          onSubmit={handleSubmit}
          noValidate
        >

          <div className={styles["form-group"]}>
            <label htmlFor="name">نام</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="نام خود را وارد کنید"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? styles["input-error"] : ""}
            />
            {errors.name && (
              <small className={styles["error-text"]}>{errors.name}</small>
            )}
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="email">ایمیل</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? styles["input-error"] : ""}
            />
            {errors.email && (
              <small className={styles["error-text"]}>{errors.email}</small>
            )}
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="message">پیام</label>

            <textarea
              id="message"
              name="message"
              rows="6"
              maxLength="500"
              placeholder="پیام خود را بنویسید..."
              value={formData.message}
              onChange={handleChange}
              className={errors.message ? styles["input-error"] : ""}
            />

            <div className={styles["textarea-footer"]}>
              {errors.message && (
                <small className={styles["error-text"]}>
                  {errors.message}
                </small>
              )}
              <span className={styles["char-count"]}>
                {formData.message.length}/500
              </span>
            </div>
          </div>

          <button
            type="submit"
            className={`primary-btn ${styles["full-width"]} ${
              loading ? styles["loading"] : ""
            }`}
            disabled={loading}
          >
            {loading ? "در حال ارسال..." : "ارسال پیام"}
          </button>

          {submitted && (
            <div className={`${styles["success-box"]} ${styles["fade-in"]}`}>
              پیام شما با موفقیت ارسال شد 🌱
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
