import products from "./db_products.js";
import { renderProducts } from "./ap.js";
import { filterByCategories } from "./filter.js";
import { sortProducts } from "./sort.js";
import { searchProducts } from "./seach.js";

const app = document.getElementById("app");
const filterContainer = document.getElementById("filter");
const sortSelect = document.getElementById("sort");
const searchInput = document.getElementById("search");

let currentProducts = [...products];
let selectedCategories = [];

function updateUI() {
  let filtered = filterByCategories(products, selectedCategories);
  filtered = sortProducts(filtered, sortSelect.value);
  filtered = searchProducts(filtered, searchInput.value);
  renderProducts(filtered, app);
}

filterContainer.addEventListener("change", (e) => {
  const value = e.target.value;
  if (e.target.checked) {
    selectedCategories.push(value);
  } else {
    selectedCategories = selectedCategories.filter((c) => c !== value);
  }
  updateUI();
});

sortSelect.addEventListener("change", updateUI);
searchInput.addEventListener("input", updateUI);

// Khởi tạo
updateUI();
