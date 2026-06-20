import { useState } from "react";
import { sanitizeInput } from "../utils/format";

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

        setFormData(prev => ({
            ...prev,
            [name]: sanitizeInput(value, maxLength)
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

        if (!validate()) return;

        setLoading(true);

        // شبیه‌سازی ارسال به سرور
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
            setFormData(INITIAL_FORM);

            setTimeout(() => setSubmitted(false), 4000);
        }, 1500);
    };

    return (
        <section className="section">
            <div className="container contact-layout">
                <div>
                    <div className="section-head left-align">
                        <span className="eyebrow">تماس با ما</span>
                        <h2>ارتباط با تیم ما</h2>
                        <p>
                            اگر سوالی درباره خدمات یا همکاری دارید، از طریق فرم
                            زیر با ما در ارتباط باشید.
                        </p>
                    </div>

                    <div className="content-card contact-info">
                        <p>
                            <strong>آدرس:</strong> تهران، نیاوران، پلاک ۱۲۳
                        </p>
                        <p>
                            <strong>تلفن:</strong> 021-12345678
                        </p>
                        <p>
                            <strong>ایمیل:</strong> info@khaneshoma.ir
                        </p>
                        <p>
                            <strong>ساعات کاری:</strong> شنبه تا پنجشنبه، ۹ تا
                            ۱۸
                        </p>
                    </div>
                </div>

                <form
                    className="contact-form"
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <div className="form-group">
                        <label htmlFor="name">نام</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="نام خود را وارد کنید"
                            value={formData.name}
                            onChange={handleChange}
                            className={errors.name ? "input-error" : ""}
                        />
                        {errors.name && (
                            <small className="error-text">{errors.name}</small>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">ایمیل</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="example@email.com"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? "input-error" : ""}
                        />
                        {errors.email && (
                            <small className="error-text">{errors.email}</small>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">پیام</label>
                        <textarea
                            id="message"
                            name="message"
                            rows="6"
                            placeholder="پیام خود را بنویسید..."
                            value={formData.message}
                            onChange={handleChange}
                            className={errors.message ? "input-error" : ""}
                        />
                        {errors.message && (
                            <small className="error-text">
                                {errors.message}
                            </small>
                        )}
                    </div>

                    <button
                        type="submit"
                        className={`primary-btn full-width ${loading ? "loading" : ""}`}
                        disabled={loading}
                    >
                        {loading ? "در حال ارسال..." : "ارسال پیام"}
                    </button>

                    {submitted && (
                        <div className="success-box fade-in">
                            پیام شما با موفقیت ارسال شد 🌱
                        </div>
                    )}
                </form>
            </div>
        </section>
    );
}
