import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react"; // Thêm useState cho loading
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom"; // Thêm Link cho nút Login
import { toast } from "react-toastify";
import z from "zod";
import { RegisterApi } from "../Api/AuthApi";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Loading state cho submit

  // Fix schema: Thêm fullname, sửa tên và message (role default "student" ở backend)
  const Schema = z.object({
    fullname: z.string().min(1, { message: "Họ tên không được bỏ trống" }),
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
      await RegisterApi(data); // Gửi data (backend set role="student")
      toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
      navigate("/auth/login"); // Chuyển sang login
    } catch (error) {
      console.error("Lỗi đăng ký:", error); // Log chi tiết hơn
      toast.error(
        "Đăng ký thất bại: " +
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
              <h1 className="text-center mb-4">Đăng ký</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label htmlFor="fullname" className="form-label">
                    Họ tên
                  </label>
                  <input
                    id="fullname"
                    type="text"
                    className={`form-control ${
                      errors.fullname ? "is-invalid" : ""
                    }`}
                    placeholder="Nhập họ tên..."
                    {...register("fullname")}
                    disabled={loading}
                  />
                  {errors.fullname && (
                    <div className="invalid-feedback">
                      {errors.fullname.message}
                    </div>
                  )}
                </div>

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
                      Đang đăng ký...
                    </>
                  ) : (
                    "Đăng ký"
                  )}
                </button>
              </form>

              {/* Link đến Login */}
              <div className="text-center">
                <p className="mb-0">
                  Đã có tài khoản?{" "}
                  <Link to="/auth/login" className="text-primary fw-bold">
                    Đăng nhập ngay
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

export default Register;
