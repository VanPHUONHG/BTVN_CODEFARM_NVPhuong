import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";
import { registerUser } from "../Api/AuthApi";

const RegisterPage = () => {
  const nav = useNavigate();

  const Schema = z.object({
    email: z.string().email({ message: "Email phải đúng định dạng" }),
    password: z
      .string()
      .min(6, { message: "Password ít nhất 6 ký tự" })
      .max(20, { message: "Password tối đa 20 ký tự" }),
    fullname: z
      .string()
      .min(6, { message: "Fullname ít nhất 6 ký tự" })
      .max(50, { message: "Fullname tối đa 50 ký tự" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(Schema) });

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      toast.success("Đăng ký thành công!");
      nav(`/auth/login`);
    } catch (error) {
      console.log(error);
      toast.error("Đăng ký không thành công!");
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div
        style={{
          background: "rgba(0, 0, 0, 0.7)",
          padding: "40px 50px",
          borderRadius: "16px",
          boxShadow: "0 0 30px rgba(0,255,255,0.5)",
          width: "90%",
          maxWidth: "500px",
          color: "white",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px",
            background: "linear-gradient(90deg, #00ffff, #ff00ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: "2.2rem",
            fontWeight: "bold",
          }}
        >
          REGISTER
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div style={{ marginBottom: "15px" }}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Nhập email"
              {...register("email")}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #00ffff",
                background: "rgba(255,255,255,0.1)",
                color: "white",
              }}
            />
            {errors.email && (
              <p style={{ color: "#ff007f", marginTop: "5px" }}>
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div style={{ marginBottom: "15px" }}>
            <label>Password</label>
            <input
              type="password"
              placeholder="Nhập mật khẩu"
              {...register("password")}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #00ffff",
                background: "rgba(255,255,255,0.1)",
                color: "white",
              }}
            />
            {errors.password && (
              <p style={{ color: "#ff007f", marginTop: "5px" }}>
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Fullname */}
          <div style={{ marginBottom: "20px" }}>
            <label>Fullname</label>
            <input
              type="text"
              placeholder="Nhập họ tên"
              {...register("fullname")}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #00ffff",
                background: "rgba(255,255,255,0.1)",
                color: "white",
              }}
            />
            {errors.fullname && (
              <p style={{ color: "#ff007f", marginTop: "5px" }}>
                {errors.fullname.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              border: "none",
              borderRadius: "8px",
              background: "linear-gradient(90deg, #00ffff, #ff00ff)",
              color: "white",
              fontWeight: "bold",
              letterSpacing: "1px",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow = "0 0 15px rgba(0,255,255,0.8)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            Đăng ký
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            fontSize: "14px",
          }}
        >
          Đã có tài khoản?{" "}
          <Link
            to="/auth/login"
            style={{
              color: "#00ffff",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Đăng nhập
          </Link>
        </p>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default RegisterPage;
