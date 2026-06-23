import ProductGrid from "../../components/ProductGrid/ProductGrid";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";



export default function Home ( { products = [], onAddToCart } ) {
    const featuredProducts = products.slice( 0, 4 );
    const categories = [
        ...new Set( products.map( p => p.category ).filter( Boolean ) )
    ];
    const amazingOffers =
        products.filter( p => p.badge === "ویژه" );

    const newestProducts =
        products.filter( p => p.badge === "جدید" );

    const bestSellers =
        products.filter( p => p.badge === "پرفروش" );

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

                    </div>

                    <div className={ styles.heroVisual }>
                        <section className={ styles.heroBanner }>
                            <img
                                src="https://images.unsplash.com/photo-1484154218962-a197022b5858"
                                alt="دکوراسیون خانه و آشپزخانه"
                            />

                            <div className={ styles.heroOverlay }>
                                <h2>
                                    فروش ویژه محصولات خانه و دکوراسیون
                                </h2>

                                <p>
                                    بهترین محصولات با تضمین کیفیت و ارسال سریع
                                </p>

                                <Link to="/products" className={ styles.heroButton }>
                                    مشاهده محصولات
                                </Link>
                            </div>
                        </section>
                    </div>
                </div>
            </section>

            {/* CATEGORIES */ }
            <section className={ styles.categoriesSection }>

                <div className="container">

                    <h2>دسته‌بندی‌ها</h2>

                    <div className={ styles.categoriesGrid }>

                        { categories.map( category => (

                            <div
                                key={ category }
                                className={ styles.categoryCard }
                            >
                                { category }
                            </div>

                        ) ) }

                    </div>

                </div>

            </section>

            {/* PRODUCTS */ }
            <section className={ styles.productsSection }>
                <div className="container">

                    <div className={ styles.productsHeader }>
                        <h2>محصولات منتخب امروز</h2>

                        <Link to="/products" className={ styles.catalogLink }>
                            مشاهده همه →
                        </Link>
                    </div>

                    <ProductGrid
                        products={ featuredProducts }
                        onAddToCart={ onAddToCart }
                        emptyMessage="در حال به‌روزرسانی محصولات..."
                    />
                </div>
            </section>
            {/* AMAZING OFFERS */ }
            <section className={ styles.section }>

                <div className="container">

                    <div className={ styles.sectionHead }>
                        <h2>پیشنهاد شگفت‌انگیز</h2>
                    </div>

                    <ProductGrid
                        products={ amazingOffers }
                        onAddToCart={ onAddToCart }
                        emptyMessage="فعلا پیشنهاد شگفت‌انگیزی موجود نیست."
                    />

                </div>

            </section>
            {/* NEWEST PRODUCTS */ }
            <section className={ styles.section }>

                <div className="container">

                    <div className={ styles.sectionHead }>
                        <h2>محصولات جدید</h2>
                    </div>

                    <ProductGrid
                        products={ newestProducts }
                        onAddToCart={ onAddToCart }
                        emptyMessage="محصولات جدیدی موجود نیست."
                    />

                </div>

            </section>
            {/* BEST SELLERS */ }
            <section className={ styles.section }>

                <div className="container">

                    <div className={ styles.sectionHead }>
                        <h2>پرفروش‌ترین‌ها</h2>
                    </div>

                    <ProductGrid
                        products={ bestSellers }
                        onAddToCart={ onAddToCart }
                        emptyMessage="محصولات پرفروشی موجود نیست."
                    />

                </div>

            </section>
            {/* NEWSLETTER */ }
            <section className={ styles.newsletter }>

                <div className="container">

                    <h2>
                        عضویت در خبرنامه
                    </h2>

                    <p>
                        از تخفیف‌ها و محصولات جدید باخبر شوید
                    </p>

                    <form className={ styles.newsletterForm }>
                        <input
                            type="email"
                            placeholder="ایمیل شما"
                            aria-label="ایمیل شما"
                        />
                        <button type="submit">عضویت</button>
                    </form>

                </div>

            </section>


        </main>
    );
}
