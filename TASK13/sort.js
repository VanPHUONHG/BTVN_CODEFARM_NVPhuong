export function sortProducts(products, order) {
  if (!Array.isArray(products)) return [];

  if (order === "asc") return [...products].sort((a, b) => a.price - b.price);
  if (order === "desc") return [...products].sort((a, b) => b.price - a.price);

  return products;
}
