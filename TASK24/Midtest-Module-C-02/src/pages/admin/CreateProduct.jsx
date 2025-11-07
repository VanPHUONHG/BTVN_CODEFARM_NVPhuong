import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify"; // Thêm toast nếu chưa
import { z } from "zod";
import { getCategories } from "../../api/apiCategory";
import {
  createProduct,
  getProductDetail,
  updateProduct,
} from "../../api/apiProduct";

// 💰 Định dạng tiền tệ (nếu cần)
const formatCurrency = (amount) => {
  if (!amount) return "Miễn phí";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

// 🌌 --- STYLE THEME: Futuristic - Tech Luxury (Full Screen Cosmic) ---
const styles = {
  container: {
    minHeight: "100vh", // Full screen height
    padding: "0", // No padding for immersion
    maxWidth: "100%", // Full width
    margin: "0", // No margin
    background: "radial-gradient(circle at top, #0d0f12 0%, #050507 100%)", // Cosmic radial
    color: "#e5e5e5",
    fontFamily: "'Poppins', sans-serif", // Modern font
    overflow: "hidden",
    position: "relative",
    "::before": {
      // Galaxy nebula
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
      animation: "nebulaShift 20s ease-in-out infinite",
    },
  },
  formCard: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    maxWidth: "500px",
    padding: "50px 40px",
    background: "rgba(255, 255, 255, 0.1)", // Cosmic glass
    backdropFilter: "blur(25px)",
    borderRadius: "20px",
    border: "1px solid rgba(0,229,255,0.4)", // Neon cyan border
    boxShadow: `
      0 30px 60px rgba(0, 0, 0, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.2),
      0 0 60px rgba(0,229,255,0.5)  // Outer neon glow
    `,
    textAlign: "center",
    overflow: "hidden",
    "::before": {
      // Inner pulse glow
      content: '""',
      position: "absolute",
      top: -2,
      left: -2,
      right: -2,
      bottom: -2,
      background:
        "linear-gradient(45deg, #00bfff, #1e90ff, #00bfff, transparent)",
      zIndex: -1,
      animation: "neonPulse 4s linear infinite",
    },
  },
  title: {
    color: "#00e5ff", // Neon cyan
    fontSize: "32px",
    fontWeight: "800",
    marginBottom: "10px",
    letterSpacing: "2px",
    textShadow: "0 0 25px rgba(0,229,255,0.8)", // Strong glow
    background: "linear-gradient(90deg, #00e5ff, #4fc3f7, #00ffff)", // Cyan rainbow
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  inputGroup: {
    marginBottom: "25px",
    position: "relative",
  },
  inputLabel: {
    position: "absolute",
    top: "-12px",
    left: "18px",
    background: "rgba(0, 0, 0, 0.8)", // Dark cosmic bg
    color: "#00e5ff",
    fontSize: "13px",
    padding: "0 6px",
    borderRadius: "4px",
    transition: "all 0.3s ease",
    pointerEvents: "none",
    textShadow: "0 0 5px rgba(0,229,255,0.5)",
  },
  input: (hasError) => ({
    width: "100%",
    padding: "18px 15px", // Larger padding
    borderRadius: "12px",
    border: `1px solid ${hasError ? "#ef4444" : "rgba(0,229,255,0.4)"}`, // Red for error, cyan otherwise
    background: "rgba(255, 255, 255, 0.1)", // Glass
    backdropFilter: "blur(15px)",
    color: "#e5e5e5",
    fontSize: "16px",
    transition: "all 0.4s ease",
    outline: "none",
    boxShadow: hasError
      ? "0 0 15px rgba(239,68,68,0.5)"
      : "0 0 15px rgba(0,0,0,0.3)", // Glow for error/focus
    "::placeholder": { color: "#b0c4de" },
  }),
  textarea: (hasError) => ({
    ...styles.input(hasError),
    resize: "vertical",
    minHeight: "120px",
  }),
  submitButton: (isHovered, isSubmitting) => ({
    width: "100%",
    padding: "18px",
    background: isHovered
      ? "linear-gradient(45deg, #00e5ff, #4fc3f7, #00ffff)" // Neon cyan
      : "linear-gradient(45deg, #4fc3f7, #00e5ff, #00ffff)",
    color: "#0a0a0a",
    border: "none",
    borderRadius: "12px",
    fontSize: "18px",
    fontWeight: "700",
    cursor: isSubmitting ? "not-allowed" : "pointer",
    transition: "all 0.4s ease",
    boxShadow: isHovered
      ? "0 0 35px rgba(0,229,255,0.7), 0 12px 30px rgba(0,0,0,0.4)" // Strong glow
      : "0 0 20px rgba(0,229,255,0.5)",
    transform: isHovered ? "translateY(-4px) scale(1.03)" : "translateY(0)",
    letterSpacing: "1px",
    position: "relative",
    overflow: "hidden",
    "::before": {
      // Shimmer
      content: '""',
      position: "absolute",
      top: 0,
      left: "-100%",
      width: "100%",
      height: "100%",
      background:
        "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
      transition: "left 0.6s",
    },
    ":hover::before": { left: "100%" },
    opacity: isSubmitting ? 0.7 : 1,
  }),
  cancelButton: (isHovered) => ({
    width: "100%",
    padding: "18px",
    background: "rgba(0,0,0,0.6)", // Dark cosmic
    color: "#00e5ff",
    border: "1px solid rgba(0,229,255,0.5)",
    borderRadius: "12px",
    fontSize: "18px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.4s ease",
    boxShadow: isHovered ? "0 0 20px rgba(0,229,255,0.5)" : "none",
    transform: isHovered ? "translateY(-2px)" : "translateY(0)",
  }),
  // --- Animations CSS ---
  animations: `
    @keyframes nebulaShift {
      0% { opacity: 0.8; transform: scale(1); }
      100% { opacity: 1; transform: scale(1.05); }
    }
    @keyframes neonPulse {
      0%, 100% { box-shadow: 0 0 10px rgba(0, 255, 255, 0.5); }
      50% { box-shadow: 0 0 20px rgba(0, 255, 255, 1); }
    }
  `,
};

const CreateProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state
  const [focusedInput, setFocusedInput] = useState(null); // Fix: Add focusedInput state
  const [hoveredCancel, setHoveredCancel] = useState(false); // Fix: Add hoveredCancel state

  const productSchema = z.object({
    title: z
      .string()
      .min(3, "Tên sản phẩm phải có ít nhất 3 ký tự")
      .nonempty("Không được để trống"),
    price: z.preprocess(
      (val) => (val === "" ? undefined : Number(val)),
      z.number({ invalid_type_error: "Giá phải là số" }).min(0, "Giá phải >= 0")
    ),
    categoryId: z.string().nonempty("Phải chọn danh mục"),
    description: z.string().optional(),
    thumbnail: z.string().optional(),
    stock: z.preprocess(
      (val) => (val === "" ? undefined : Number(val)),
      z
        .number({ invalid_type_error: "Số lượng phải là số" })
        .min(0, "Số lượng phải >= 0")
    ),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      price: 0,
      categoryId: "",
      description: "",
      thumbnail: "",
      stock: 0,
    },
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const catData = await getCategories();
        setCategories(catData || []);

        if (id) {
          const data = await getProductDetail(id);
          reset({
            title: data.title ?? "",
            price: data.price ?? 0,
            categoryId: data.categoryId ?? "",
            description: data.description ?? "",
            thumbnail: data.thumbnail ?? "",
            stock: data.stock ?? 0,
          });
        }
      } catch (err) {
        toast.error("Lỗi tải dữ liệu!");
      }
    };

    loadData();
  }, [id, reset]);

  const onSubmit = async (values) => {
    setIsSubmitting(true); // Start loading
    try {
      if (id) {
        await updateProduct(id, values);
        toast.success("Cập nhật sản phẩm thành công!");
      } else {
        await createProduct(values);
        toast.success("Thêm sản phẩm thành công!");
      }
      navigate("/admin/products");
    } catch (err) {
      console.error("Lỗi khi lưu sản phẩm:", err);
      toast.error("Không thể lưu sản phẩm!");
    } finally {
      setIsSubmitting(false); // End loading
    }
  };

  // Fix: Hàm lấy style cho input (dùng focusedInput)
  const getInputStyle = (fieldName) => ({
    ...styles.input(focusedInput === fieldName),
  });

  return (
    <div style={styles.container}>
      <style>{styles.animations}</style>
      <div style={styles.formCard}>
        <h2 style={styles.title}>
          {id ? "✏️ Cập nhật sản phẩm" : "🛍️ Thêm sản phẩm mới"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Title */}
          <div style={styles.inputGroup}>
            <label style={styles.inputLabel}>Tên sản phẩm</label>
            <input
              {...register("title")}
              placeholder="Nhập tên sản phẩm"
              style={getInputStyle("title")}
              onFocus={() => setFocusedInput("title")}
              onBlur={() => setFocusedInput(null)}
            />
            {errors.title && (
              <p
                style={{ color: "#ef4444", fontSize: "13px", marginTop: "5px" }}
              >
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Price */}
          <div style={styles.inputGroup}>
            <label style={styles.inputLabel}>Giá</label>
            <input
              type="number"
              {...register("price")}
              placeholder="Nhập giá sản phẩm"
              style={getInputStyle("price")}
              onFocus={() => setFocusedInput("price")}
              onBlur={() => setFocusedInput(null)}
            />
            {errors.price && (
              <p
                style={{ color: "#ef4444", fontSize: "13px", marginTop: "5px" }}
              >
                {errors.price.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div style={styles.inputGroup}>
            <label style={styles.inputLabel}>Danh mục</label>
            <select
              {...register("categoryId")}
              style={getInputStyle("categoryId")}
              onFocus={() => setFocusedInput("categoryId")}
              onBlur={() => setFocusedInput(null)}
            >
              <option value="">-- Chọn danh mục --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.title}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p
                style={{ color: "#ef4444", fontSize: "13px", marginTop: "5px" }}
              >
                {errors.categoryId.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div style={styles.inputGroup}>
            <label style={styles.inputLabel}>Mô tả</label>
            <textarea
              {...register("description")}
              placeholder="Mô tả sản phẩm (không bắt buộc)"
              style={getInputStyle("description")}
              onFocus={() => setFocusedInput("description")}
              onBlur={() => setFocusedInput(null)}
            />
          </div>

          {/* Thumbnail */}
          <div style={styles.inputGroup}>
            <label style={styles.inputLabel}>Hình ảnh (URL)</label>
            <input
              {...register("thumbnail")}
              placeholder="https://example.com/image.jpg"
              style={getInputStyle("thumbnail")}
              onFocus={() => setFocusedInput("thumbnail")}
              onBlur={() => setFocusedInput(null)}
            />
          </div>

          {/* Stock */}
          <div style={styles.inputGroup}>
            <label style={styles.inputLabel}>Số lượng trong kho</label>
            <input
              type="number"
              {...register("stock")}
              placeholder="Nhập số lượng"
              style={getInputStyle("stock")}
              onFocus={() => setFocusedInput("stock")}
              onBlur={() => setFocusedInput(null)}
            />
            {errors.stock && (
              <p
                style={{ color: "#ef4444", fontSize: "13px", marginTop: "5px" }}
              >
                {errors.stock.message}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "15px", marginTop: "30px" }}>
            <button
              type="submit"
              disabled={isSubmitting}
              style={styles.submitButton(isSubmitting)}
              onMouseEnter={() => !isSubmitting && true}
              onMouseLeave={() => false}
            >
              {id ? "Cập nhật" : "Thêm mới"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              style={styles.cancelButton(hoveredCancel)}
              onMouseEnter={() => setHoveredCancel(true)}
              onMouseLeave={() => setHoveredCancel(false)}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
