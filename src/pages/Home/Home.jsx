import ProductGrid from "../components/ProductGrid";
import { toPersianNumber } from "../../utils/format";

// Data Constants - Separation of Content from Logic
const STATS = [
  { label: "محصول منتخب", value: 8 },
  { label: "سال تجربه", value: 15 },
  { label: "پشتیبانی", value: "24 / 7" },
];

const FEATURES = [
  {
    title: "محصولات اصل",
    desc: "تضمین ۱۰۰٪ اصالت کالا از برندهای معتبر جهانی.",
    icon: <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  },
  {
    title: "ارسال سریع",
    desc: "تحویل اکسپرس در کمترین زمان ممکن به تمام نقاط.",
    icon: <path d="M13 10V3L4 14h7v7l9-11h-7z" />
  },
  {
    title: "پرداخت امن",
    desc: "تجربه خریدی آسوده با درگاه‌های بانکی معتبر.",
    icon: <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  },
  {
    title: "مشاوره تخصصی",
    desc: "تیم ما مثل یک دوست در انتخاب همراه شماست.",
    icon: <path d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
  }
];

export default function Home({ products = [], onAddToCart, onNavigate }) {
  const featuredProducts = products.slice(0, 4);

  return (
    <main className="home-page-wrapper">
      {/* --- HERO SECTION --- */}
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-content">
            <span className="eyebrow fade-in">Premium Home Collection</span>
            <h1 className="hero-title">
              تجربه‌ای نو در <br />
              <span className="text-gradient">چیدمان خانه شما</span>
            </h1>
            <p className="hero-text">
              مجموعه‌ای از لوازم خانگی و دکوراسیون که با **Obsessive Attention to Detail** برای مشتریان خوش‌سلیقه گلچین شده‌اند.
            </p>

            <div className="hero-actions">
              <button 
                className="primary-btn large-btn shadow-hover"
                onClick={() => onNavigate("products")}
              >
                کشف محصولات
              </button>
              <button 
                className="secondary-btn large-btn"
                onClick={() => onNavigate("about")}
              >
                داستان برند ما
              </button>
            </div>

            <div className="stats-grid">
              {STATS.map((stat, idx) => (
                <div key={idx} className="stat-card">
                  <strong className="number">{toPersianNumber(stat.value)}+</strong>
                  <span className="label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual">
            <div className="glass-card floating-animation">
              <div className="glass-card-header">
                <div className="dot red"></div><div className="dot yellow"></div><div className="dot green"></div>
              </div>
              <div className="glass-card-body">
                <h3>کیفیت، زیبایی، اعتماد</h3>
                <p>Modern Design & Seamless Experience</p>
                <ul className="modern-list">
                  <li><span>✓</span> محصولات اصل و شناسنامه‌دار</li>
                  <li><span>✓</span> ارسال سفارشی و ایمن</li>
                  <li><span>✓</span> ضمانت بازگشت وجه</li>
                </ul>
              </div>
            </div>
            {/* Background Decoration */}
            <div className="hero-blob"></div>
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-head centered">
            <span className="eyebrow">چرا ما؟</span>
            <h2>ارزش‌هایی که به آن پایبندیم</h2>
          </div>

          <div className="features-grid">
            {FEATURES.map((feature, idx) => (
              <div key={idx} className="feature-card-modern">
                <div className="feature-icon-wrapper">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    {feature.icon}
                  </svg>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FEATURED PRODUCTS --- */}
      <section className="section featured-products">
        <div className="container">
          <div className="section-head between">
            <div>
              <span className="eyebrow">Selection</span>
              <h2>محصولات منتخب امروز</h2>
            </div>
            <button 
              className="text-link-btn"
              onClick={() => onNavigate("products")}
            >
              مشاهده کاتالوگ کامل ←
            </button>
          </div>

          <div className="products-container">
            <ProductGrid
              products={featuredProducts}
              onAddToCart={onAddToCart}
              emptyMessage="در حال به‌روزرسانی لیست محصولات منتخب..."
            />
          </div>

          {featuredProducts.length > 0 && (
             <div className="centered-actions mt-12">
               <button
                 className="outline-btn"
                 onClick={() => onNavigate("products")}
               >
                 مشاهده همه {toPersianNumber(products.length)} محصول
               </button>
             </div>
          )}
        </div>
      </section>
    </main>
  );
}
