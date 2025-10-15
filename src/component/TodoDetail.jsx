import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const TodoDetailPage = () => {
  const { id } = useParams();
  const [products, setproducts] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetch(`https://api-class-o1lo.onrender.com/api/v1/todos/${id}`)
      .then((res) => res.json())
      .then((data) => setproducts(data.data))
      .catch((err) => console.error("Lỗi khi gọi API:", err));
  }, [id]);

  if (!products)
    return (
      <div className="text-center text-white py-20 text-xl">
        Đang tải dữ liệu...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white py-20 px-6">
      <div className="max-w-3xl mx-auto bg-gray-900/80 p-10 rounded-2xl border border-purple-600 shadow-xl">
        <h1 className="text-4xl font-bold text-pink-400 mb-4">
          {products.name}
        </h1>
        <p className="text-gray-300 mb-4">{products.description}</p>
        <p className="text-lg mb-2">Ưu tiên: {products.priority}</p>
        <p className="text-lg mb-2">
          Hạn: {new Date(products.dueDate).toLocaleDateString("vi-VN")}
        </p>
        <p className="text-lg">
          Trạng thái:{" "}
          {products.completed ? "✅ Hoàn thành" : "⏳ Đang thực hiện"}
        </p>

        <button
          onClick={() => navigate(location.state?.from || "/todos")}
          className="mt-8 bg-pink-600 px-6 py-2 rounded-lg hover:bg-pink-700 font-semibold"
        >
          ← Quay lại
        </button>
      </div>
    </div>
  );
};

export default TodoDetailPage;
