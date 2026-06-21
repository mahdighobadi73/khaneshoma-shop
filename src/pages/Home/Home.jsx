import ProductGrid from "/src/components/ProductGrid/ProductGrid";
import { toPersianNumber } from "../../utils/format";
import styles from "./Home.module.css";

const STATS = [
    { label: "محصول ویژه", value: 8 },
    { label: "سال تجربه در فروش", value: 15 },
    { label: "پشتیبانی مشتریان", value: "24 / 7" }
];

const FEATURES = [
    {
        title: "تضمین اصالت کالا",
        desc: "تمام محصولات با ضمانت اصالت و کیفیت از برندهای معتبر انتخاب شده‌اند تا با اطمینان کامل خرید کنید.",
        icon: (
            <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        )
    },
    {
        title: "ارسال سریع و مطمئن",
        desc: "سفارش شما در کوتاه‌ترین زمان ممکن با بسته‌بندی ایمن به دستتان می‌رسد.",
        icon: <path d="M13 10V3L4 14h7v7l9-11h-7z" />
    },
    {
        title: "پرداخت کاملاً امن",
        desc: "با استفاده از درگاه‌های بانکی معتبر، خریدی امن و بدون دغدغه را تجربه کنید.",
        icon: <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    },
    {
        title: "مشاوره قبل از خرید",
        desc: "کارشناسان ما آماده‌اند تا برای انتخاب بهترین محصول متناسب با نیاز شما راهنمایی‌تان کنند.",
        icon: (
            <path d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        )
    }
];

export default function Home({ products = [], onAddToCart, onNavigate }) {
    const featuredProducts = products.slice(0, 4);

    return (
        <main className={styles.homeWrapper}>
            {/* HERO */}
            <section className={styles.heroSection}>
                <div className={styles.heroContainer}>
                    <div className={styles.heroContent}>
                        <span className={styles.heroEyebrow}>
                            مجموعه‌ای از بهترین محصولات خانگی
                        </span>

                        <h1 className={styles.heroTitle}>
                            زیبایی و کیفیت را به <br />
                            <span className={styles.gradientText}>
                                خانه خود بیاورید
                            </span>
                        </h1>

                        <p className={styles.heroDescription}>
                            ما مجموعه‌ای از محصولات کاربردی و دکوراتیو خانه را
                            با دقت و وسواس انتخاب کرده‌ایم تا تجربه‌ای لذت‌بخش
                            از خرید آنلاین برای شما رقم بزنیم.
                        </p>
                        <div className={styles.heroButtons}>
                            <button
                                className={styles.primaryButton}
                                onClick={() => onNavigate("products")}
                            >
                                کشف محصولات
                            </button>

                            <button
                                className={styles.secondaryButton}
                                onClick={() => onNavigate("about")}
                            >
                                داستان برند ما
                            </button>
                        </div>

                        <div className={styles.statsGrid}>
                            {STATS.map((stat, i) => (
                                <div key={i} className={styles.statCard}>
                                    <strong className={styles.statNumber}>
                                        {toPersianNumber(stat.value)}+
                                    </strong>
                                    <span className={styles.statLabel}>
                                        {stat.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.heroVisual}>
                        <div className={styles.heroGlassCard}>
                            <div className={styles.glassHeader}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>

                            <div className={styles.glassBody}>
                                <h3>کیفیت، زیبایی و اعتماد</h3>
                                <p>
                                    ترکیبی از طراحی مدرن و تجربه خریدی ساده و
                                    لذت‌بخش
                                </p>

                                <ul>
                                    <li>محصولات اصل و باکیفیت</li>
                                    <li>ارسال سریع و بسته‌بندی ایمن</li>
                                    <li>ضمانت بازگشت وجه در صورت نارضایتی</li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.heroDecoration}></div>
                    </div>
                </div>
            </section>

            {/* FEATURES */}

            <section className={styles.featuresSection}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionEyebrow}>چرا ما؟</span>
                        <h2>ارزش‌هایی که به آن پایبندیم</h2>
                    </div>

                    <div className={styles.featuresGrid}>
                        {FEATURES.map((feature, i) => (
                            <div key={i} className={styles.featureCard}>
                                <div className={styles.featureHeader}>
                                    <div className={styles.featureIcon}>
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                        >
                                            {feature.icon}
                                        </svg>
                                    </div>

                                    <h3 className={styles.featureTitle}>
                                        {feature.title}
                                    </h3>
                                </div>

                                <p className={styles.featureDesc}>
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FEATURED PRODUCTS */}

            <section className={styles.productsSection}>
                <div className="container">
                    <div className={styles.productsHeader}>
                        <div>
                            <span className={styles.sectionEyebrow}>
                                Selection
                            </span>
                            <h2>محصولات منتخب امروز</h2>
                        </div>

                        <button
                            className={styles.catalogLink}
                            onClick={() => onNavigate("products")}
                        >
                            مشاهده کاتالوگ کامل →
                        </button>
                    </div>

                    <ProductGrid
                        products={featuredProducts}
                        onAddToCart={onAddToCart}
                        emptyMessage="در حال به‌روزرسانی محصولات..."
                    />
                </div>
            </section>
        </main>
    );
}
