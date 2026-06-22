import ProductGrid from "/src/components/ProductGrid/ProductGrid";
import { toPersianNumber } from "../../utils/format";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";

const STATS = [
    { label: "محصول ویژه", value: 8, suffix: "+" },
    { label: "سال تجربه در فروش", value: 15, suffix: "+" },
    { label: "پشتیبانی مشتریان", value: "24 / 7", suffix: "" }
];

const FEATURES = [
    {
        title: "تضمین اصالت کالا",
        desc: "تمام محصولات با ضمانت اصالت و کیفیت از برندهای معتبر انتخاب شده‌اند."
    },
    {
        title: "ارسال سریع و مطمئن",
        desc: "سفارش شما در کوتاه‌ترین زمان ممکن با بسته‌بندی ایمن ارسال می‌شود."
    },
    {
        title: "پرداخت کاملاً امن",
        desc: "پرداخت از طریق درگاه‌های بانکی معتبر انجام می‌شود."
    },
    {
        title: "مشاوره قبل از خرید",
        desc: "کارشناسان ما آماده‌اند تا بهترین انتخاب را به شما پیشنهاد دهند."
    }
];

export default function Home ( { products = [], onAddToCart } ) {
    const navigate = useNavigate();
    const featuredProducts = products.slice( 0, 4 );

    return (
        <main className={ styles.homeWrapper }>

            {/* HERO */ }
            <section className={ styles.heroSection }>
                <div className={ `container ${ styles.heroContainer }` }>

                    <div className={ styles.heroContent }>
                        <span className={ styles.heroEyebrow }>
                            مجموعه‌ای از بهترین محصولات خانگی
                        </span>

                        <h1 className={ styles.heroTitle }>
                            زیبایی و کیفیت را به <br />
                            <span className={ styles.gradientText }>خانه خود بیاورید</span>
                        </h1>

                        <p className={ styles.heroDescription }>
                            مجموعه‌ای از محصولات کاربردی و دکوراتیو برای تجربه خریدی
                            ساده، سریع و مطمئن.
                        </p>

                        <div className={ styles.statsGrid }>
                            { STATS.map( ( stat, i ) => (
                                <div key={ i } className={ styles.statCard }>
                                    <strong className={ styles.statNumber }>
                                        { toPersianNumber( stat.value ) }
                                        { stat.suffix }
                                    </strong>
                                    <span className={ styles.statLabel }>{ stat.label }</span>
                                </div>
                            ) ) }
                        </div>
                    </div>

                    <div className={ styles.heroVisual }>
                        <div className={ styles.heroGlassCard }>
                            <h3>کیفیت، زیبایی و اعتماد</h3>
                            <p>تجربه خریدی مدرن و مطمئن</p>

                            <ul>
                                <li>محصولات اصل و باکیفیت</li>
                                <li>ارسال سریع و بسته‌بندی ایمن</li>
                                <li>ضمانت بازگشت وجه</li>
                            </ul>
                        </div>

                        <div className={ styles.heroDecoration }></div>
                    </div>
                </div>
            </section>

            {/* PRODUCTS */ }
            <section className={ styles.productsSection }>
                <div className="container">

                    <div className={ styles.productsHeader }>
                        <h2>محصولات منتخب امروز</h2>

                        <button
                            className={ styles.catalogLink }
                            onClick={ () => navigate( "/Products" ) }
                        >
                            مشاهده همه →
                        </button>
                    </div>

                    <ProductGrid
                        products={ featuredProducts }
                        onAddToCart={ onAddToCart }
                        emptyMessage="در حال به‌روزرسانی محصولات..."
                    />
                </div>
            </section>

            {/* FEATURES */ }
            <section className={ styles.featuresSection }>
                <div className="container">

                    <div className={ styles.sectionHeader }>
                        <span className={ styles.sectionEyebrow }>چرا ما</span>
                        <h2>ارزش‌هایی که به آن پایبندیم</h2>
                    </div>

                    <div className={ styles.featuresGrid }>
                        { FEATURES.map( ( feature, i ) => (
                            <div key={ i } className={ styles.featureCard }>
                                <h3 className={ styles.featureTitle }>{ feature.title }</h3>
                                <p className={ styles.featureDesc }>{ feature.desc }</p>
                            </div>
                        ) ) }
                    </div>

                </div>
            </section>

        </main>
    );
}
