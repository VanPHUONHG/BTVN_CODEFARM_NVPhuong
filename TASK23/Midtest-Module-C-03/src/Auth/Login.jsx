import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react"; // Thêm useState cho loading
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom"; // Thêm Link cho nút Register
import { toast } from "react-toastify";
import z from "zod";
import { LoginApi } from "../Api/AuthApi";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Loading state cho submit

  // Fix schema: Sửa tên và message
  const Schema = z.object({
    email: z.string().email({ message: "Email phải đúng định dạng" }),
    password: z
      .string()
      .min(6, { message: "Password ít nhất 6 ký tự" })
      .max(20, { message: "Password tối đa 20 ký tự" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(Schema) });

  const onSubmit = async (data) => {
    setLoading(true); // Bắt đầu loading
    try {
      const job = await LoginApi(data);
      toast.success("Đăng nhập thành công");
      if (job) {
        localStorage.setItem("token", job.accessToken);
        localStorage.setItem("user", JSON.stringify(job.user));

        // Force micro-task để localStorage "thấm" trước navigate
        setTimeout(() => {
          const userRole = job.user.role;
          if (userRole === "admin") {
            navigate("/admin", { replace: true });
          } else {
            navigate("/", { replace: true });
          }
        }, 0);
      } else {
        // Fallback nếu job rỗng
        toast.error("Dữ liệu phản hồi không hợp lệ!");
        navigate("/"); // Về home mặc định
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error); // Log chi tiết hơn
      toast.error(
        "Đăng nhập thất bại: " +
          (error.response?.data?.message || "Lỗi không xác định")
      );
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body p-4">
              <h1 className="text-center mb-4">Đăng nhập</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    placeholder="Nhập email..."
                    {...register("email")}
                    disabled={loading}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">
                      {errors.email.message}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Mật khẩu
                  </label>
                  <input
                    id="password"
                    type="password" // Fix: type="password" để ẩn ký tự
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    placeholder="Nhập mật khẩu..."
                    {...register("password")}
                    disabled={loading}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">
                      {errors.password.message}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 mb-3"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Đang đăng nhập...
                    </>
                  ) : (
                    "Đăng nhập"
                  )}
                </button>
              </form>

              {/* Link đến Register */}
              <div className="text-center">
                <p className="mb-0">
                  Chưa có tài khoản?{" "}
                  <Link to="/auth/register" className="text-primary fw-bold">
                    Đăng ký ngay
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
