// filter.js
export function filterByCategories(products, categories) {
  if (!Array.isArray(products)) return [];
  if (categories.length === 0) return products;
  return products.filter((p) => categories.includes(p.type));
}
