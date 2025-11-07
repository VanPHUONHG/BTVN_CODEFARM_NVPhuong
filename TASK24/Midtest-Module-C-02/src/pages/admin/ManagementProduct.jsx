import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getCategories } from "../../api/apiCategory";
import { deleteProduct, getProducts } from "../../api/apiProduct";

// Hàm định dạng tiền tệ
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

// 🌌 --- STYLE THEME: Galaxy Tech Universe (Full Screen Cosmic Neon) ---
const styles = {
  container: {
    minHeight: "100vh", // Full screen height
    padding: "0", // No padding for full immersion
    maxWidth: "100%", // Full width
    margin: "0", // No margin
    background: "radial-gradient(circle at top, #0d0f12 0%, #050507 100%)", // Deep cosmic radial bg
    color: "#e5e5e5",
    fontFamily: "'Poppins', sans-serif", // Modern sans-serif
    overflow: "hidden",
    position: "relative",
    "::before": {
      // Galaxy nebula pattern
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `
        radial-gradient(ellipse 60% 60% at 20% 20%, rgba(138,43,226,0.2) 0%, transparent 50%),
        radial-gradient(ellipse 40% 40% at 80% 80%, rgba(0,191,255,0.3) 0%, transparent 70%),
        radial-gradient(circle at 50% 50%, rgba(255,0,255,0.1) 0%, transparent 100%),
        radial-gradient(circle at 10% 90%, rgba(79,195,247,0.2) 0%, transparent 60%)
      `,
      pointerEvents: "none",
      animation: "nebulaShift 20s ease-in-out infinite alternate",
    },
  },
  title: {
    color: "#00e5ff", // Neon cyan
    fontSize: "36px", // Larger for full screen
    fontWeight: "800",
    marginBottom: "30px",
    textAlign: "center",
    background: "linear-gradient(135deg, #00e5ff, #4fc3f7, #00ffff)", // Cyan rainbow gradient
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: "1.5px",
    textShadow: "0 0 25px rgba(0,229,255,0.8), 0 0 50px rgba(79,195,247,0.4)", // Multi-layer neon glow
  },
  // --- Filter & Action Bar (Neon glass with cosmic hover) ---
  filterBar: {
    display: "flex",
    alignItems: "end",
    gap: "20px", // Larger gap for full screen
    margin: "0 5%", // Centered with margin for full screen
    marginBottom: "40px",
    padding: "25px",
    background: "rgba(255, 255, 255, 0.05)", // Cosmic glass
    backdropFilter: "blur(25px)",
    borderRadius: "15px",
    border: "1px solid rgba(0,229,255,0.4)", // Neon cyan border
    boxShadow:
      "0 0 30px rgba(0,229,255,0.3), inset 0 1px 0 rgba(255,255,255,0.1)", // Neon outer + inset
    flexWrap: "wrap",
  },
  select: {
    padding: "14px 18px",
    borderRadius: "12px",
    border: "1px solid rgba(0,229,255,0.6)", // Neon cyan border
    fontSize: "16px",
    minWidth: "220px",
    background: "rgba(0,0,0,0.7)", // Dark cosmic glass
    color: "#e5e5e5",
    cursor: "pointer",
    transition: "all 0.4s ease",
    boxShadow: "0 0 15px rgba(0,0,0,0.4)",
    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 12 6"><path fill="%2300e5ff" d="M0 0l6 6 6-6z"/></svg>')`, // Neon cyan arrow
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 14px center",
    ":hover": {
      borderColor: "#00e5ff",
      boxShadow: "0 0 20px rgba(0,229,255,0.6)",
      backgroundColor: "rgba(0,0,0,0.8)",
    },
  },
  input: {
    padding: "14px 18px",
    width: "300px",
    minWidth: "250px",
    borderRadius: "12px",
    border: "1px solid rgba(0,229,255,0.6)",
    fontSize: "16px",
    background: "rgba(0,0,0,0.7)",
    color: "#e5e5e5",
    transition: "all 0.4s ease",
    outline: "none",
    boxShadow: "0 0 15px rgba(0,0,0,0.4)",
    "::placeholder": { color: "#b0c4de" },
    ":focus": {
      borderColor: "#00e5ff",
      boxShadow: "0 0 20px rgba(0,229,255,0.6), 0 0 0 3px rgba(0,229,255,0.1)",
    },
  },
  addButton: (isHovered) => ({
    background: isHovered
      ? "linear-gradient(135deg, #00e5ff 0%, #4fc3f7 100%)" // Neon cyan gradient
      : "linear-gradient(135deg, #4fc3f7 0%, #00e5ff 100%)",
    color: "#0a0a0a", // Dark text
    padding: "14px 26px",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    transition: "all 0.4s ease",
    marginLeft: "auto",
    boxShadow: isHovered
      ? "0 0 30px rgba(0,229,255,0.7), 0 8px 25px rgba(0,0,0,0.4)" // Strong neon glow
      : "0 0 20px rgba(0,229,255,0.5)",
    transform: isHovered ? "translateY(-4px)" : "translateY(0)",
  }),
  // --- Table Styles (Full Screen: Larger, neon glass rows) ---
  table: {
    width: "100%",
    margin: "0 5%", // Centered for full screen
    borderCollapse: "separate",
    borderSpacing: "0 12px", // Larger spacing
  },
  tableHeader: {
    background: "rgba(0,0,0,0.7)", // Dark cosmic glass
    backdropFilter: "blur(15px)",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 0 25px rgba(0,229,255,0.3)", // Neon cyan shadow
  },
  th: {
    textAlign: "left",
    padding: "20px 18px", // Larger padding for full screen
    fontWeight: "700",
    color: "#00e5ff", // Neon cyan
    textTransform: "uppercase",
    fontSize: "14px",
    letterSpacing: "1px",
    textShadow: "0 0 8px rgba(0,229,255,0.6)", // Glow
  },
  trBase: (isHovered, index) => ({
    background: isHovered
      ? "rgba(0,0,0,0.9)" // Darker cosmic on hover
      : index % 2 === 0
      ? "rgba(0,0,0,0.5)"
      : "rgba(0,0,0,0.3)", // Alternating glass
    backdropFilter: "blur(15px)",
    boxShadow: isHovered
      ? "0 0 25px rgba(0,229,255,0.5), 0 8px 25px rgba(0,0,0,0.4)" // Neon hover glow
      : "0 0 15px rgba(0,0,0,0.3)",
    transition: "all 0.4s ease",
    transform: isHovered ? "translateY(-3px)" : "translateY(0)", // Lift
    cursor: "pointer",
    borderRadius: "12px",
    border: "1px solid rgba(0,229,255,0.3)", // Neon cyan border
  }),
  td: {
    padding: "20px 18px", // Larger padding
    border: "none",
    color: "#e5e5e5",
    fontSize: "16px", // Larger font
    verticalAlign: "middle",
    borderBottom: "1px solid rgba(0,229,255,0.15)", // Faint neon divider
  },
  actionButton: (color, isHovered) => ({
    padding: "12px 18px", // Larger for full screen
    borderRadius: "10px",
    cursor: "pointer",
    border: "none",
    fontWeight: "600",
    fontSize: "15px",
    transition: "all 0.4s ease",
    backgroundColor: color,
    color: "white",
    opacity: isHovered ? 0.95 : 1,
    boxShadow: isHovered ? "0 0 20px rgba(0,229,255,0.6)" : "none", // Neon glow
    transform: isHovered ? "translateY(-2px)" : "translateY(0)",
  }),
  editButton: (isHovered) => ({
    ...styles.actionButton("#4fc3f7", isHovered), // Cyan blue
    backgroundColor: isHovered ? "#00e5ff" : "#4fc3f7",
    color: "#0a0a0a",
    marginRight: "15px", // Larger margin
  }),
  deleteButton: (isHovered) => ({
    ...styles.actionButton("#ef4444", isHovered), // Red for delete
    backgroundColor: isHovered ? "dc2626" : "#ef4444",
    color: "#fff",
  }),
  empty: {
    textAlign: "center",
    padding: "80px 20px", // Larger padding for full screen
    fontSize: "20px",
    color: "#9ca3af",
    background: "rgba(0,0,0,0.5)", // Dark glass
    backdropFilter: "blur(15px)",
    borderRadius: "15px",
    border: "1px dashed rgba(0,229,255,0.4)", // Dashed neon cyan
    margin: "20px 5%", // Centered for full screen
    boxShadow: "inset 0 2px 15px rgba(0,0,0,0.6), 0 0 25px rgba(0,229,255,0.3)", // Inset + outer neon
  },
};

// --- Animations CSS (thêm vào index.css hoặc <style> tag) ---
const cssAnimations = `
@keyframes nebulaShift {
  0% { opacity: 0.8; transform: scale(1); }
  100% { opacity: 1; transform: scale(1.05); }
}
@keyframes neonPulse {
  0%, 100% { box-shadow: 0 0 10px rgba(0, 255, 255, 0.5); }
  50% { box-shadow: 0 0 20px rgba(0, 255, 255, 1); }
}
`;

const ManagementProduct = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({ categoryId: "all", q: "" });
  const [hoveredAddButton, setHoveredAddButton] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [hoveredEdit, setHoveredEdit] = useState(null);
  const [hoveredDelete, setHoveredDelete] = useState(null);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      // Đảm bảo chỉ gửi categoryId nếu nó không phải là 'all'
      const apiFilters = {
        q: filters.q,
      };
      if (filters.categoryId !== "all") {
        apiFilters.categoryId = filters.categoryId;
      }
      const data = await getProducts(apiFilters);
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm:", error);
      setProducts([]);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Lỗi khi tải danh mục:", error);
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xoá sản phẩm này không?")) {
      try {
        await deleteProduct(id);
        toast.success("✅ Xoá thành công!"); // Sử dụng toast thay alert
        fetchProducts();
      } catch (error) {
        console.error("Lỗi khi xoá sản phẩm:", error);
        toast.error("Lỗi khi xoá sản phẩm!"); // Toast error
      }
    }
  };

  const getCategoryTitle = (categoryId) => {
    const category = categories.find((cate) => cate.id === Number(categoryId));
    return category ? category.title : "— Không rõ —";
  };

  return (
    <div style={styles.container}>
      <style>{cssAnimations}</style>
      <h2 style={styles.title}>🛍️ Quản lý Sản phẩm</h2>

      {/* Filter and Action Bar */}
      <div style={styles.filterBar}>
        {/* Select Category */}
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

        {/* Search Input */}
        <input
          type="text"
          placeholder="🔍 Tìm theo tên sản phẩm..."
          value={filters.q}
          onChange={(e) => setFilters({ ...filters, q: e.target.value })}
          style={styles.input}
        />

        {/* Add Product Button */}
        <button
          onClick={() => navigate("/admin/products/create")}
          style={styles.addButton(hoveredAddButton)}
          onMouseEnter={() => setHoveredAddButton(true)}
          onMouseLeave={() => setHoveredAddButton(false)}
        >
          + Thêm sản phẩm mới
        </button>
      </div>

      {/* Products Table */}
      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeader}>
            <th style={{ ...styles.th, width: "40%" }}>Tên sản phẩm</th>
            <th style={{ ...styles.th, width: "20%" }}>Giá</th>
            <th style={{ ...styles.th, width: "20%" }}>Danh mục</th>
            <th style={{ ...styles.th, width: "20%" }}>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((item, index) => (
              <tr
                key={item.id}
                style={styles.trBase(item.id === hoveredRow, index)}
                onMouseEnter={() => setHoveredRow(item.id)}
                onMouseLeave={() => setHoveredRow(null)}
                onClick={() => navigate(`/admin/products/update/${item.id}`)} // Click hàng để Sửa nhanh
              >
                <td style={{ ...styles.td, fontWeight: "600" }}>
                  {item.title}
                </td>
                <td style={{ ...styles.td, color: "#00e5ff" }}>
                  {formatCurrency(item.price)}
                </td>
                <td style={styles.td}>
                  <span style={{ color: "#9ca3af", fontSize: "14px" }}>
                    {getCategoryTitle(item.categoryId)}
                  </span>
                </td>
                <td style={styles.td}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Tránh click lan lên tr
                      navigate(`/admin/products/update/${item.id}`);
                    }}
                    style={styles.editButton(hoveredEdit === item.id)}
                    onMouseEnter={() => setHoveredEdit(item.id)}
                    onMouseLeave={() => setHoveredEdit(null)}
                  >
                    ✏️ Sửa
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Tránh click lan lên tr
                      handleDelete(item.id);
                    }}
                    style={styles.deleteButton(hoveredDelete === item.id)}
                    onMouseEnter={() => setHoveredDelete(item.id)}
                    onMouseLeave={() => setHoveredDelete(null)}
                  >
                    🗑️ Xoá
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={styles.empty}>
                Không tìm thấy sản phẩm nào phù hợp với bộ lọc.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManagementProduct;
