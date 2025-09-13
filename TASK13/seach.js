export function searchProducts(products, keyword) {
  if (!keyword) return products;
  return products.filter((p) =>
    p.name.toLowerCase().includes(keyword.toLowerCase())
  );
}
