import { useMemo, useState, useEffect } from "react";
import ProductGrid from "/src/components/ProductGrid/ProductGrid";
import { getCategories, sanitizeInput } from "../../utils/format";
import styles from "./Products.module.css";

export default function Products({ onAddToCart }) {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = useMemo(
    () => ["همه", ...getCategories(products)],
    [products]
  );

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("همه");
  const [sortBy, setSortBy] = useState("default");

  /* =========================
     FETCH FROM BACKEND
  ========================= */
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);

        const res = await fetch("http://localhost:5000/api/products");

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();
        setProducts(data);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  /* debounce search */
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(search);
    }, 250);

    return () => clearTimeout(t);
  }, [search]);

  /* filtering */
  const filteredProducts = useMemo(() => {
    let result = [...products];

    const q = debouncedSearch.trim().toLowerCase();

    if (q) {
      result = result.filter((p) => {
        const name = p.name?.toLowerCase() || "";
        const desc = p.description?.toLowerCase() || "";
        const cat = p.category?.toLowerCase() || "";

        return name.includes(q) || desc.includes(q) || cat.includes(q);
      });
    }

    if (selectedCategory !== "همه") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    const sorted = [...result];

    switch (sortBy) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating-desc":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "name-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name, "fa"));
        break;
    }

    return sorted;
  }, [products, debouncedSearch, selectedCategory, sortBy]);

  const resetFilters = () => {
    setSearch("");
    setSelectedCategory("همه");
    setSortBy("default");
  };

  /* =========================
     UI STATES
  ========================= */

  if (loading) {
    return <p className={styles.loading}>در حال بارگذاری...</p>;
  }

  if (error) {
    return <p className={styles.error}>خطا: {error}</p>;
  }

  return (
    <section className={styles.productsPage}>
      <div className={styles.container}>

        <header className={styles.pageHeader}>
          <span className={styles.pageEyebrow}>فروشگاه</span>
          <h1 className={styles.pageTitle}>تمام محصولات</h1>
          <p className={styles.pageDescription}>
            جستجو، فیلتر و مرتب‌سازی حرفه‌ای
          </p>
        </header>

        {/* FILTERS */}
        <div className={styles.filtersPanel}>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>جستجو</label>

            <div className={styles.searchWrapper}>
              <input
                className={styles.filterInput}
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(sanitizeInput(e.target.value, 100))
                }
                placeholder="نام محصول..."
              />

              {search && (
                <button
                  className={styles.clearBtn}
                  onClick={() => setSearch("")}
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>دسته‌بندی</label>

            <select
              className={styles.filterSelect}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>مرتب‌سازی</label>

            <select
              className={styles.filterSelect}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">پیش‌فرض</option>
              <option value="price-asc">ارزان‌ترین</option>
              <option value="price-desc">گران‌ترین</option>
              <option value="rating-desc">بیشترین امتیاز</option>
              <option value="name-asc">نام (الفبا)</option>
            </select>
          </div>

          <button className={styles.resetBtn} onClick={resetFilters}>
            پاک کردن فیلترها
          </button>

        </div>

        {/* GRID */}
        <ProductGrid
          products={filteredProducts}
          onAddToCart={onAddToCart}
          emptyMessage="هیچ محصولی پیدا نشد"
        />

      </div>
    </section>
  );
}