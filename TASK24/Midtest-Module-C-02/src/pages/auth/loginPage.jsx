import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { LoginAuth } from "../../api/apiAuth";
import { toast } from "react-toastify";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #0c0c1e 0%, #1a0033 30%, #0f0f23 70%, #000000 100%)", // Deep cosmic gradient
    color: "#e5e5e5",
    fontFamily: "'Orbitron', monospace", // Futuristic font
    overflow: "hidden",
    position: "relative",
  },
  // Animated stars/nebula bg (CSS)
  starsBg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `
      radial-gradient(2px 2px at 20px 30px, #eee, transparent),
      radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
      radial-gradient(1px 1px at 90px 40px, #fff, transparent),
      radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.6), transparent),
      radial-gradient(2px 2px at 160px 30px, #ddd, transparent)
    `,
    backgroundRepeat: "repeat",
    backgroundSize: "200px 100px",
    animation: "twinkle 20s linear infinite",
  },
  nebula: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `
      radial-gradient(ellipse 50% 50% at 20% 20%, rgba(138,43,226,0.3) 0%, transparent 50%),
      radial-gradient(ellipse 30% 30% at 80% 80%, rgba(0,191,255,0.4) 0%, transparent 70%),
      radial-gradient(circle at 50% 50%, rgba(255,0,255,0.2) 0%, transparent 100%)
    `,
    opacity: 0.8,
    animation: "nebulaShift 15s ease-in-out infinite alternate",
  },
  // --- Login Card (Glassmorphism with neon glow) ---
  loginCard: {
    width: "100%",
    maxWidth: "420px",
    padding: "50px 40px",
    background: "rgba(255, 255, 255, 0.1)", // Glass transparent
    backdropFilter: "blur(20px)", // Blur for glass
    borderRadius: "20px",
    border: "1px solid rgba(0, 191, 255, 0.3)", // Cyan border
    boxShadow: `
      0 25px 50px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.2),
      0 0 50px rgba(0, 191, 255, 0.4)  // Outer neon cyan glow
    `,
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
    "::before": {
      // Inner glow pulse
      content: '""',
      position: "absolute",
      top: -2,
      left: -2,
      right: -2,
      bottom: -2,
      background:
        "linear-gradient(45deg, #00bfff, #1e90ff, #00bfff, transparent)",
      zIndex: -1,
      animation: "neonPulse 3s linear infinite",
    },
  },
  title: {
    color: "#00ffff", // Cyan
    fontSize: "32px",
    fontWeight: "900",
    marginBottom: "10px",
    letterSpacing: "2px",
    textShadow: "0 0 20px rgba(0, 255, 255, 0.8)", // Strong cyan glow
    background: "linear-gradient(90deg, #00ffff, #00bfff, #1e90ff)", // Cyan gradient
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subtitle: {
    color: "#b0c4de", // Light blue-gray
    fontSize: "14px",
    marginBottom: "40px",
    letterSpacing: "1px",
  },
  inputGroup: {
    marginBottom: "25px",
    position: "relative",
  },
  inputLabel: {
    position: "absolute",
    top: "-10px",
    left: "15px",
    background: "rgba(0, 0, 0, 0.7)", // Dark bg for label
    color: "#00ffff",
    fontSize: "12px",
    padding: "0 5px",
    borderRadius: "3px",
    transition: "all 0.3s ease",
    pointerEvents: "none",
  },
  input: (isFocused) => ({
    width: "100%",
    padding: "16px 15px 16px 15px", // Space for label
    borderRadius: "12px",
    border: `1px solid ${isFocused ? "#00ffff" : "rgba(0, 255, 255, 0.3)"}`, // Cyan border
    background: "rgba(255, 255, 255, 0.1)", // Glass input
    backdropFilter: "blur(10px)",
    color: "#e5e5e5",
    fontSize: "16px",
    transition: "all 0.3s ease",
    outline: "none",
    boxShadow: isFocused ? "0 0 20px rgba(0, 255, 255, 0.5)" : "none", // Glow on focus
    "::placeholder": {
      color: "#b0c4de",
    },
  }),
  submitButton: (isHovered) => ({
    width: "100%",
    padding: "16px",
    background: isHovered
      ? "linear-gradient(45deg, #00ffff, #00bfff, #1e90ff)" // Cyan gradient
      : "linear-gradient(45deg, #00bfff, #1e90ff, #00ffff)",
    color: "#0a0a0a", // Dark text
    border: "none",
    borderRadius: "12px",
    fontSize: "18px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.4s ease", // Longer transition for luxury
    boxShadow: isHovered
      ? "0 0 30px rgba(0, 255, 255, 0.6), 0 10px 25px rgba(0, 0, 0, 0.3)" // Strong glow + shadow
      : "0 0 20px rgba(0, 255, 255, 0.4)",
    transform: isHovered ? "translateY(-3px) scale(1.02)" : "translateY(0)", // Lift + subtle scale
    letterSpacing: "1px",
    position: "relative",
    overflow: "none",
    "::before": {
      // Shimmer effect
      content: '""',
      position: "absolute",
      top: 0,
      left: "-100%",
      width: "100%",
      height: "100%",
      background:
        "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
      transition: "left 0.5s",
    },
    ":hover::before": { left: "100%" },
  }),
  registerLink: {
    color: "#00ffff", // Cyan link
    textDecoration: "none",
    fontWeight: "600",
    transition: "all 0.3s ease",
    ":hover": {
      color: "#4fc3f7",
      textShadow: "0 0 10px rgba(0, 255, 255, 0.8)", // Glow on hover
    },
  },
  // --- Animations CSS ---
  animations: `
    @keyframes twinkle {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
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

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const nav = useNavigate();
  const [hoveredSubmit, setHoveredSubmit] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  const onsubmit = async (data) => {
    try {
      const res = await LoginAuth(data);

      // Lưu token và thông tin user
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("user", JSON.stringify(res.user));

      // Kiểm tra role
      if (res.user.role === "admin") {
        nav("/admin"); // chuyển đến trang admin
      } else {
        nav("/products"); // chuyển đến trang sản phẩm bình thường
      }

      toast.success("Đăng nhập thành công!"); // Thay alert bằng toast
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      toast.error(
        "Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu."
      ); // Toast error
    }
  };

  // Hàm lấy style cho input (mô phỏng focus)
  const getInputStyle = (fieldName) => ({
    ...styles.input(focusedInput === fieldName), // Fix: isFocusedInput → focusedInput
  });

  return (
    <div style={styles.container}>
      <style>{styles.animations}</style>
      <div style={styles.starsBg}></div>
      <div style={styles.nebula}></div>
      <div style={styles.loginCard}>
        <h2 style={styles.title}>
          <Link to="/register" style={styles.registerLink}>
            Đăng ký
          </Link>
        </h2>
        <p style={styles.subtitle}>Khám phá đa vũ trụ công nghệ</p>

        <form onSubmit={handleSubmit(onsubmit)}>
          <div style={styles.inputGroup}>
            <label style={styles.inputLabel}></label>
            <input
              required
              type="email"
              placeholder="Địa chỉ Email"
              {...register("email")}
              style={getInputStyle("email")}
              onFocus={() => setFocusedInput("email")}
              onBlur={() => setFocusedInput(null)}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.inputLabel}></label>
            <input
              required
              type="password"
              placeholder="Mật khẩu"
              {...register("password")}
              style={getInputStyle("password")}
              onFocus={() => setFocusedInput("password")}
              onBlur={() => setFocusedInput(null)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={styles.submitButton(hoveredSubmit)}
            onMouseEnter={() => setHoveredSubmit(true)}
            onMouseLeave={() => setHoveredSubmit(false)}
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
