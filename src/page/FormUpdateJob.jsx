import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { apiJob, upDateJob } from "../api/apiJob";

const FormUpdateJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      isCompleted: false,
      priority: "1",
    },
  });

  const onSubmit = async (data) => {
    try {
      data.priority = Number(data.priority);
      console.log(data);
      await upDateJob(id, data);
      alert("✅ Cập nhật công việc thành công!");
      navigate(`/todos`);
    } catch (error) {
      console.error(error);
      alert("❌ Cập nhật công việc thất bại");
    }
  };
  useEffect(() => {
    if (!id) return; // kiểm tra id
    (async () => {
      const { data } = await apiJob(id);
      reset(data);
    })();
  }, [id, reset]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-gray-100"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500">
          📝 Sua công việc mới
        </h2>

        {/* NAME */}
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">
            Tên công việc <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("name", {
              required: "Tên công việc không được bỏ trống",
              minLength: { value: 3, message: "Tối thiểu 3 ký tự" },
              maxLength: { value: 80, message: "Tối đa 80 ký tự" },
            })}
            placeholder="Nhập tên công việc..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all duration-200"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* PRIORITY */}
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">
            Mức độ ưu tiên <span className="text-red-500">*</span>
          </label>
          <select
            {...register("priority", {
              required: "Vui lòng chọn mức độ ưu tiên",
            })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all duration-200"
          >
            <option value="1">Thấp 🟢</option>
            <option value="2">Trung bình 🟡</option>
            <option value="3">Cao 🔴</option>
          </select>
          {errors.priority && (
            <p className="text-red-500 text-sm mt-1">
              {errors.priority.message}
            </p>
          )}
        </div>

        {/* DESCRIPTION */}
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">
            Mô tả (tuỳ chọn)
          </label>
          <textarea
            rows="3"
            {...register("description")}
            placeholder="Mô tả ngắn gọn về công việc..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all duration-200 resize-none"
          ></textarea>
        </div>

        {/* DUE DATE */}
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">
            Hạn chót <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            {...register("dueDate", {
              required: "Hạn chót công việc không được bỏ trống",
            })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all duration-200"
          />
          {errors.dueDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.dueDate.message}
            </p>
          )}
        </div>

        {id && (
          <div className="mb-5 flex items-center gap-3">
            <input
              type="checkbox"
              {...register("isCompleted")}
              id="isCompleted"
              className="w-5 h-5 accent-indigo-500"
            />
            <label htmlFor="isCompleted" className="text-gray-700 font-medium">
              Hoàn thành
            </label>
          </div>
        )}

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg hover:from-indigo-600 hover:to-pink-600 transition-all duration-200"
        >
          🚀 Cập nhật công việc
        </button>
      </form>
    </div>
  );
};

export default FormUpdateJob;
