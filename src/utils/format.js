export function sanitizeInput(input, maxLength = 500) {
  if (typeof input !== "string") return "";
  return input.trim().slice(0, maxLength);
}

export function formatPrice(price) {
  if (typeof price !== "number" || price < 0 || Number.isNaN(price)) {
    return "۰ ریال";
  }

  return new Intl.NumberFormat("fa-IR", {
    style: "currency",
    currency: "IRR",
    minimumFractionDigits: 0,
  }).format(price);
}

export function toPersianNumber(value) {
  return String( value ).replace( /\d/g, ( d ) => "۰۱۲۳۴۵۶۷۸۹"[ d ] );
}

export function safeParseJSON(value, fallback) {
  try {
    const parsed = JSON.parse(value);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

export function getCategories(products) {
  const categories = products.map((item) => item.category);
  return ["همه", ...new Set(categories)];
}

export function validateCart(rawCart, products) {
  if (!Array.isArray(rawCart)) return [];

  const productMap = new Map(products.map((product) => [product.id, product]));

  return rawCart
    .filter((item) => {
      return (
        item &&
        typeof item.id === "number" &&
        typeof item.quantity === "number" &&
        item.quantity > 0 &&
        productMap.has(item.id)
      );
    })
    .map((item) => {
      const product = productMap.get(item.id);
      return {
        id: item.id,
        quantity: Math.min(item.quantity, product.stock),
      };
    })
    .filter((item) => item.quantity > 0);
}
