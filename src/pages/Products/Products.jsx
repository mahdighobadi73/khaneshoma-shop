import { useMemo, useState } from "react";
import ProductGrid from "/src/components/ProductGrid/ProductGrid";
import { getCategories, sanitizeInput } from "../../utils/format";
import styles from "./Products.module.css";

export default function Products({ products, onAddToCart }) {

  const categories = useMemo(() => getCategories(products), [products]);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("همه");
  const [sortBy, setSortBy] = useState("default");

  const filteredProducts = useMemo(() => {
    let result = [...products];

    const normalizedSearch = search.trim().toLowerCase();

    if (normalizedSearch) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(normalizedSearch) ||
          product.description.toLowerCase().includes(normalizedSearch) ||
          product.category.toLowerCase().includes(normalizedSearch)
      );
    }

    if (selectedCategory !== "همه") {
<<<<<<< HEAD
      result = result.filter((product) => product.category === selectedCategory);
    } 
=======
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }
>>>>>>> 5cbd245e0b9ae09c91adbc97f1b071168c2729b0

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating-desc":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name, "fa"));
        break;
      default:
        break;
    }

    return result;
  }, [products, search, selectedCategory, sortBy]);

  return (
    <section className={styles.productsPage}>

      <div className={styles.container}>

        <div className={styles.pageHeader}>
          <span className={styles.pageEyebrow}>فروشگاه</span>
          <h2 className={styles.pageTitle}>تمام محصولات</h2>
          <p className={styles.pageDescription}>
            جستجو، فیلتر و مرتب‌سازی حرفه‌ای برای پیدا کردن محصول مناسب.
          </p>
        </div>

        <div className={styles.filtersPanel}>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>جستجو</label>
            <input
              className={styles.filterInput}
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(sanitizeInput(e.target.value, 100))
              }
              placeholder="نام محصول، دسته‌بندی یا توضیح..."
            />
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>دسته‌بندی</label>
            <select
              className={styles.filterSelect}
              value={selectedCategory}
              onChange={(e) =>
                setSelectedCategory(e.target.value)
              }
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
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

        </div>

        <ProductGrid
          products={filteredProducts}
          onAddToCart={onAddToCart}
          emptyMessage="هیچ محصولی با این فیلترها پیدا نشد."
        />

      </div>

    </section>
  );
}
