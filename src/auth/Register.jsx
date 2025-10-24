import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import z from "zod";
import { registerAuth } from "../api/apiAuth";

const Register = () => {
  const navigate = useNavigate();

  // ✅ Schema xác thực
  const schema = z
    .object({
      userName: z
        .string({ required_error: "Không được để trống" })
        .min(3, { message: "Phải >= 3 ký tự" })
        .max(30, { message: "Tối đa 30 ký tự" }),
      email: z
        .string({ required_error: "Email không được để trống" })
        .email("Email không đúng định dạng"),
      password: z
        .string({ required_error: "Password không được để trống" })
        .min(6, { message: "Password ít nhất 6 ký tự" })
        .max(20, { message: "Password tối đa 20 ký tự" }),
      confirmPassword: z.string({
        required_error: "Vui lòng xác nhận lại mật khẩu",
      }),
      agreeToTerms: z.boolean().refine((val) => val === true, {
        message: "Bạn phải đồng ý với điều khoản",
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Mật khẩu xác nhận không khớp",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  useEffect(() => {
    const hasErrors = Object.keys(errors).length > 0;
    if (hasErrors) {
      console.error("Form validation errors:", errors);
    }
  }, [errors]);
  const onSubmit = async (data) => {
    try {
      await registerAuth({
        userName: data.userName,
        email: data.email,
        password: data.password,
      });
      toast.success("🎉 Đăng ký thành công!");
      setTimeout(() => navigate("/auth/login"), 1000);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="bg-gray-800/80 backdrop-blur-lg text-white w-full max-w-md rounded-2xl shadow-2xl p-8 border border-gray-700">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-400">
          🚀 Đăng ký tài khoản
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Tên người dùng
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Nhập tên người dùng"
              {...register("userName")}
            />
            {errors.userName && (
              <p className="text-red-400 text-sm mt-1">
                {errors.userName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Nhập email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Mật khẩu</label>
            <input
              type="password"
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Nhập mật khẩu"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Nhập lại mật khẩu"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-red-400 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="agreeToTerms"
              className="w-4 h-4 text-blue-500 bg-gray-900 border-gray-600 rounded focus:ring-blue-500"
              {...register("agreeToTerms")}
            />
            <label
              htmlFor="agreeToTerms"
              className="ml-2 text-sm text-gray-300"
            >
              Tôi đồng ý với{" "}
              <span className="text-blue-400 hover:underline cursor-pointer">
                điều khoản
              </span>
            </label>
          </div>
          {errors.agreeToTerms && (
            <p className="text-red-400 text-sm">
              {errors.agreeToTerms.message}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-blue-600 hover:bg-blue-700 transition-all rounded-lg font-semibold text-white shadow-lg shadow-blue-500/30"
          >
            Đăng ký
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Đã có tài khoản?{" "}
          <span
            onClick={() => navigate("/auth/login")}
            className="text-blue-400 hover:underline cursor-pointer"
          >
            Đăng nhập
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
