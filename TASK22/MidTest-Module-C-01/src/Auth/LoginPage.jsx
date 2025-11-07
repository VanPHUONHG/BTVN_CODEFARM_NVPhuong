import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";
import { loginUser } from "../Api/AuthApi";

const LoginPage = () => {
  const nav = useNavigate();

  const Schema = z.object({
    email: z
      .string()
      .email("Email không đúng định dạng")
      .nonempty({ message: "Email không được để trống" }),
    password: z
      .string()
      .min(6, { message: "Mật khẩu ít nhất 6 ký tự" })
      .nonempty({ message: "Password không được để trống" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(Schema) });

  const onSubmit = async (data) => {
    try {
      const products = await loginUser(data);
      if (products) {
        localStorage.setItem("token", products.accessToken);
        localStorage.setItem("user", JSON.stringify(products.user));
      }
      toast.success("Đăng nhập thành công!");
      nav(`/`);
    } catch (error) {
      console.log(error);
      toast.error("Đăng nhập không thành công!");
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1920&q=80')",
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
          padding: "40px",
          borderRadius: "16px",
          backdropFilter: "blur(10px)",
          boxShadow: "0 0 25px rgba(0, 255, 255, 0.5)",
          color: "white",
          width: "90%",
          maxWidth: "420px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
            background: "linear-gradient(90deg, #00ffff, #ff00ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: "2.2rem",
            fontWeight: "bold",
            letterSpacing: "2px",
          }}
        >
          LOGIN
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "grid", gap: "15px" }}
        >
          <div>
            <label>Email</label>
            <input
              type="email"
              placeholder="Nhập email của bạn"
              {...register("email")}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #00ffff",
                background: "rgba(255,255,255,0.1)",
                color: "white",
                outline: "none",
              }}
            />
            {errors.email && (
              <p style={{ color: "#ff8080", fontSize: "0.9rem" }}>
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label>Mật khẩu</label>
            <input
              type="password"
              placeholder="Nhập mật khẩu"
              {...register("password")}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ff00ff",
                background: "rgba(255,255,255,0.1)",
                color: "white",
                outline: "none",
              }}
            />
            {errors.password && (
              <p style={{ color: "#ff8080", fontSize: "0.9rem" }}>
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              background: "linear-gradient(90deg, #00ffff, #ff00ff)",
              color: "white",
              border: "none",
              padding: "10px",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow = "0 0 20px #00ffff")
            }
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            Đăng nhập
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "15px",
            fontSize: "0.95rem",
            color: "#ccc",
          }}
        >
          Bạn chưa có tài khoản?{" "}
          <span
            onClick={() => nav("/auth/register")}
            style={{
              color: "#00ffff",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Đăng ký ngay
          </span>
        </p>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default LoginPage;
