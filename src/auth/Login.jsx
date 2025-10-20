// src/pages/Login.jsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { loginAuth } from "../api/apiAuth";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const schema = z.object({
    email: z.string().email("Email không hợp lệ"),
    password: z.string().min(6, "Mật khẩu >= 6 ký tự"),
    agreeToTerms: z.boolean().optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const res = await loginAuth({
        email: data.email,
        password: data.password,
      });
      toast.success("Đăng nhập thành công!");
      if (data.agreeToTerms)
        localStorage.setItem("user", JSON.stringify(res?.user ?? data));
      navigate("/todos");
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || "Đăng nhập thất bại";
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 overflow-hidden">
      {/* Hình Goku mờ chìm (absolute, dưới form) */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* ảnh nền lớn, mờ & làm mờ thêm bằng filter */}
        <div
          className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-20 filter blur-sm scale-110"
          style={{ backgroundImage: "url('/images/goku.png')" }}
        />
        {/* overlay gradient để chữ dễ đọc */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/60" />
      </div>

      {/* Card login (z-index cao hơn) */}
      <div className="relative z-10 w-full max-w-md p-8 rounded-2xl bg-gray-800/70 border border-gray-700 shadow-2xl backdrop-blur-sm">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-300">
          🔐 Đăng nhập
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-200">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-sm text-red-400 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-200">
              Mật khẩu
            </label>
            <input
              type="password"
              {...register("password")}
              className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-sm text-red-400 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-300">
              <input
                type="checkbox"
                className="w-4 h-4"
                {...register("agreeToTerms")}
              />
              <span className="ml-2">Lưu tài khoản</span>
            </label>
            <button
              type="button"
              onClick={() => navigate("/auth/register")}
              className="text-sm text-blue-300 hover:underline"
            >
              Đăng ký
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white font-semibold"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
