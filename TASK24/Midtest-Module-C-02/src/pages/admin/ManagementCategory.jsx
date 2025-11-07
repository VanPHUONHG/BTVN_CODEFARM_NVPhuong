import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getCategories, deleteCategory } from "../../api/apiCategory";
import { getProducts } from "../../api/apiProduct";

// Định nghĩa Icon đơn giản
const PlusIcon = () => <span style={{ marginRight: "5px" }}>➕</span>;

// 🌌 --- STYLE THEME: Futuristic - Tech Luxury (Match ProductDetail) ---
const styles = {
  container: {
    minHeight: "100vh", // Full screen height
    padding: "0", // No padding for full screen
    maxWidth: "100%", // Full width
    margin: "0", // No margin
    background: "radial-gradient(circle at top, #0d0f12 0%, #050507 100%)", // Dark futuristic bg
    color: "#e5e5e5",
    fontFamily: "'Poppins', sans-serif", // Sans-serif modern
    overflow: "hidden",
    position: "relative",
    "::before": {
      // Subtle nebula pattern
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `
        radial-gradient(ellipse 50% 50% at 20% 20%, rgba(0,191,255,0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(79,195,247,0.1) 0%, transparent 70%)
      `,
      pointerEvents: "none",
      animation: "nebulaShift 15s ease-in-out infinite alternate",
    },
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    borderBottom: "1px solid rgba(0,229,255,0.3)", // Cyan divider
    padding: "20px 30px",
    background: "rgba(0,0,0,0.4)", // Dark glass
    backdropFilter: "blur(10px)",
  },
  title: {
    color: "#00e5ff", // Cyan
    fontSize: "28px",
    fontWeight: "800",
    background: "linear-gradient(135deg, #00e5ff, #4fc3f7)", // Cyan gradient
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: "1px",
    textShadow: "0 0 15px rgba(0,229,255,0.6)", // Neon glow
  },
  addButton: (isHovered) => ({
    background: isHovered
      ? "linear-gradient(135deg, #00e5ff 0%, #4fc3f7 100%)" // Cyan gradient
      : "linear-gradient(135deg, #4fc3f7 0%, #00e5ff 100%)",
    color: "#0a0a0a", // Dark text
    padding: "12px 24px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "600",
    transition: "all 0.3s ease",
    boxShadow: isHovered
      ? "0 0 25px rgba(0,229,255,0.6), 0 6px 20px rgba(0,0,0,0.3)" // Strong cyan glow
      : "0 0 15px rgba(0,229,255,0.4)",
    transform: isHovered ? "translateY(-3px)" : "translateY(0)",
  }),
  // --- Table Styles (Futuristic: Neon borders, glass rows) ---
  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0 12px", // Spacing lớn hơn cho full screen
    margin: "0 30px", // Margin for full screen
  },
  tableHeader: {
    background: "rgba(0,0,0,0.6)", // Dark glass
    backdropFilter: "blur(10px)",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 0 20px rgba(0,229,255,0.2)", // Cyan shadow
  },
  th: {
    textAlign: "left",
    padding: "18px 20px", // Padding lớn hơn for full screen
    fontWeight: "700",
    color: "#00e5ff", // Cyan text
    textTransform: "uppercase",
    fontSize: "13px",
    letterSpacing: "1px",
    textShadow: "0 0 5px rgba(0,229,255,0.5)", // Subtle glow
  },
  trBase: (isHovered, index) => ({
    background: isHovered
      ? "rgba(0,0,0,0.8)" // Darker on hover
      : index % 2 === 0
      ? "rgba(0,0,0,0.4)"
      : "rgba(0,0,0,0.2)", // Alternating glass
    backdropFilter: "blur(10px)",
    boxShadow: isHovered
      ? "0 0 20px rgba(0,229,255,0.4), 0 6px 20px rgba(0,0,0,0.3)" // Neon hover
      : "0 0 10px rgba(0,0,0,0.2)",
    transition: "all 0.3s ease",
    transform: isHovered ? "translateY(-2px)" : "translateY(0)", // Lift
    cursor: "pointer",
    borderRadius: "10px",
    border: "1px solid rgba(0,229,255,0.2)", // Cyan border
  }),
  td: {
    padding: "18px 20px", // Padding lớn hơn
    border: "none",
    color: "#e5e5e5",
    fontSize: "15px",
    verticalAlign: "middle",
    borderBottom: "1px solid rgba(0,229,255,0.1)", // Faint cyan divider
  },
  categoryTitle: {
    color: "#00e5ff",
    fontWeight: "600",
    textDecoration: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
    textShadow: "0 0 5px rgba(0,229,255,0.5)", // Glow
    ":hover": {
      color: "#4fc3f7",
      textShadow: "0 0 10px rgba(79,195,247,0.8)",
    },
  },
  actionButton: (color, isHovered) => ({
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    border: "none",
    fontWeight: "600",
    fontSize: "14px",
    transition: "all 0.3s ease",
    backgroundColor: color,
    color: "white",
    opacity: isHovered ? 0.95 : 1,
    boxShadow: isHovered ? "0 0 15px rgba(0,229,255,0.5)" : "none", // Cyan glow
    transform: isHovered ? "translateY(-1px)" : "translateY(0)",
  }),
  editButton: (isHovered) => ({
    ...styles.actionButton("#4fc3f7", isHovered), // Cyan blue
    backgroundColor: isHovered ? "#00e5ff" : "#4fc3f7",
    color: "#0a0a0a",
    marginRight: "12px",
  }),
  deleteButton: (isHovered) => ({
    ...styles.actionButton("#ef4444", isHovered), // Red for delete
    backgroundColor: isHovered ? "#dc2626" : "#ef4444",
    color: "#fff",
  }),
  empty: {
    textAlign: "center",
    padding: "60px 20px",
    fontSize: "18px",
    color: "#9ca3af",
    background: "rgba(0,0,0,0.4)", // Dark glass
    backdropFilter: "blur(10px)",
    borderRadius: "12px",
    border: "1px dashed rgba(0,229,255,0.3)", // Dashed cyan
    marginTop: "20px",
    boxShadow: "inset 0 2px 10px rgba(0,0,0,0.5), 0 0 20px rgba(0,229,255,0.2)", // Inset + outer glow
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

const ManagementCategory = () => {
  const [categories, setCategories] = useState([]);
  const [hoveredAddButton, setHoveredAddButton] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [hoveredEdit, setHoveredEdit] = useState(null);
  const [hoveredDelete, setHoveredDelete] = useState(null);
  const navigate = useNavigate();

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

  const handleDelete = async (id) => {
    try {
      // 🔍 kiểm tra xem danh mục có sản phẩm không
      const products = await getProducts();
      const hasProduct = products.some((p) => p.categoryId === id);

      if (hasProduct) {
        toast.error("❌ Không thể xoá danh mục vì vẫn còn sản phẩm trong đó!");
        return;
      }

      if (window.confirm("Bạn có chắc muốn xoá danh mục này không?")) {
        await deleteCategory(id);
        toast.success("✅ Xoá thành công!"); // Toast thay alert
        fetchCategories();
      }
    } catch (err) {
      console.error("Lỗi khi xoá danh mục:", err);
      toast.error("Lỗi khi xoá danh mục!"); // Toast error
    }
  };

  return (
    <div style={styles.container}>
      <style>{cssAnimations}</style>
      <div style={styles.header}>
        <h2 style={styles.title}>🏷️ Quản lý Danh mục Sản phẩm</h2>
        <button
          onClick={() => navigate("/admin/categories/create")}
          style={styles.addButton(hoveredAddButton)}
          onMouseEnter={() => setHoveredAddButton(true)}
          onMouseLeave={() => setHoveredAddButton(false)}
        >
          <PlusIcon /> Thêm danh mục mới
        </button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeader}>
            <th style={{ ...styles.th, width: "40%" }}>Tên danh mục</th>
            <th style={{ ...styles.th, width: "30%" }}>Slug (URL)</th>
            <th style={{ ...styles.th, width: "30%" }}>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories.map((c) => (
              <tr
                key={c.id}
                style={styles.trBase(c.id === hoveredRow)}
                onMouseEnter={() => setHoveredRow(c.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td style={styles.td}>
                  <span
                    onClick={() =>
                      navigate(`/admin/products?categoryId=${c.id}`)
                    }
                    style={styles.categoryTitle}
                  >
                    {c.title}
                  </span>
                </td>
                <td style={{ ...styles.td, color: "#9ca3af" }}>{c.slug}</td>
                <td style={styles.td}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/admin/categories/update/${c.id}`);
                    }}
                    style={styles.editButton(hoveredEdit === c.id)}
                    onMouseEnter={() => setHoveredEdit(c.id)}
                    onMouseLeave={() => setHoveredEdit(null)}
                  >
                    ✏️ Sửa
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(c.id);
                    }}
                    style={styles.deleteButton(hoveredDelete === c.id)}
                    onMouseEnter={() => setHoveredDelete(c.id)}
                    onMouseLeave={() => setHoveredDelete(null)}
                  >
                    🗑️ Xoá
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={styles.empty}>
                Chưa có danh mục nào được tạo.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManagementCategory;
