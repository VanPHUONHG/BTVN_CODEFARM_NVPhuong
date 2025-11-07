import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../api/apiCategory";
import { getProducts } from "../../api/apiProduct";

// 💰 Định dạng tiền tệ
const formatCurrency = (amount) => {
  if (!amount) return "Miễn phí";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

// 🌌 --- STYLE THEME: Futuristic - Tech Luxury ---
const styles = {
  container: {
    minHeight: "100vh",
    padding: "80px 20px",
    background: "radial-gradient(circle at top, #0d0f12 0%, #050507 100%)",
    color: "#e5e5e5",
    fontFamily: "'Poppins', sans-serif",
    overflow: "hidden",
  },

  heroTitle: {
    textAlign: "center",
    fontSize: "48px",
    fontWeight: "800",
    marginBottom: "60px",
    background: "linear-gradient(90deg, #0ff, #4fc3f7, #a0f)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: "1.5px",
    textShadow: "0 0 15px rgba(79,195,247,0.4)",
  },

  filterBar: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(12px)",
    padding: "20px 30px",
    borderRadius: "20px",
    border: "1px solid rgba(79,195,247,0.2)",
    marginBottom: "50px",
    boxShadow: "0 0 25px rgba(79,195,247,0.15)",
  },

  select: {
    padding: "12px 18px",
    borderRadius: "10px",
    border: "1px solid rgba(79,195,247,0.5)",
    background: "rgba(0,0,0,0.6)",
    color: "#e5e5e5",
    fontSize: "16px",
    outline: "none",
    transition: "0.3s",
    minWidth: "220px",
  },

  input: {
    padding: "12px 20px",
    borderRadius: "10px",
    border: "1px solid rgba(79,195,247,0.5)",
    background: "rgba(0,0,0,0.6)",
    color: "#e5e5e5",
    fontSize: "16px",
    width: "280px",
    outline: "none",
    transition: "0.3s",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "40px",
    maxWidth: "1400px",
    margin: "0 auto",
  },

  card: (hovered) => ({
    background: "rgba(255,255,255,0.04)",
    borderRadius: "18px",
    padding: "24px",
    border: "1px solid rgba(79,195,247,0.15)",
    boxShadow: hovered
      ? "0 0 30px rgba(79,195,247,0.3)"
      : "0 0 15px rgba(0,0,0,0.5)",
    transform: hovered ? "translateY(-8px)" : "translateY(0)",
    transition: "all 0.4s ease",
    backdropFilter: "blur(10px)",
    position: "relative",
    overflow: "hidden",
  }),

  image: (hovered) => ({
    width: "100%",
    height: "220px",
    objectFit: "cover",
    borderRadius: "12px",
    marginBottom: "20px",
    transition: "all 0.4s ease",
    filter: hovered ? "brightness(1.15) saturate(1.2)" : "brightness(1)",
    boxShadow: hovered
      ? "0 0 20px rgba(79,195,247,0.4)"
      : "0 0 10px rgba(0,0,0,0.5)",
  }),

  title: {
    fontSize: "22px",
    fontWeight: "600",
    color: "#fff",
    marginBottom: "10px",
  },

  description: {
    fontSize: "15px",
    color: "#9ca3af",
    marginBottom: "15px",
    lineHeight: "1.6",
  },

  price: {
    color: "#00e5ff",
    fontSize: "20px",
    fontWeight: "700",
    marginBottom: "16px",
    textShadow: "0 0 10px rgba(0,229,255,0.5)",
  },

  button: (hovered) => ({
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    background: hovered
      ? "linear-gradient(90deg, #00e5ff, #4fc3f7)"
      : "linear-gradient(90deg, #2196f3, #00bcd4)",
    border: "none",
    color: "#0a0a0a",
    fontWeight: "700",
    fontSize: "15px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: hovered
      ? "0 0 20px rgba(79,195,247,0.6)"
      : "0 0 10px rgba(79,195,247,0.3)",
    transform: hovered ? "translateY(-3px)" : "translateY(0)",
  }),

  empty: {
    gridColumn: "1 / -1",
    textAlign: "center",
    color: "#9ca3af",
    fontSize: "18px",
    padding: "60px 0",
  },
};

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({ categoryId: "all", q: "" });
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const data = await getProducts(filters);
    setProducts(data);
  };

  const fetchCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const handleNavigate = (id) => navigate(`/products/${id}`);

  return (
    <div style={styles.container}>
      <h1 style={styles.heroTitle}>✨ Sản phẩm công nghệ sang trọng ✨</h1>

      {/* --- Bộ lọc --- */}
      <div style={styles.filterBar}>
        <select
          value={filters.categoryId}
          onChange={(e) =>
            setFilters({ ...filters, categoryId: e.target.value })
          }
          style={styles.select}
        >
          <option value="all">Tất cả danh mục</option>
          {categories.map((cate) => (
            <option key={cate.id} value={cate.id}>
              {cate.title}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="🔍 Tìm kiếm sản phẩm..."
          value={filters.q}
          onChange={(e) => setFilters({ ...filters, q: e.target.value })}
          style={styles.input}
        />
      </div>

      {/* --- Danh sách sản phẩm --- */}
      <div style={styles.grid}>
        {products.length === 0 ? (
          <div style={styles.empty}>Không tìm thấy sản phẩm phù hợp.</div>
        ) : (
          products.map((item) => (
            <div
              key={item.id}
              style={styles.card(hoveredCard === item.id)}
              onMouseEnter={() => setHoveredCard(item.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                style={styles.image(hoveredCard === item.id)}
              />
              <h3 style={styles.title}>{item.title}</h3>
              <p style={styles.description}>
                {item.description?.length > 100
                  ? item.description.substring(0, 100) + "..."
                  : item.description}
              </p>
              <p style={styles.price}>{formatCurrency(item.price)}</p>
              <button
                style={styles.button(hoveredButton === item.id)}
                onMouseEnter={() => setHoveredButton(item.id)}
                onMouseLeave={() => setHoveredButton(null)}
                onClick={() => handleNavigate(item.id)}
              >
                Xem chi tiết
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
