import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
    <h1 className="text-6xl font-extrabold text-pink-500 mb-4">404</h1>
    <p className="text-xl text-gray-300 mb-6">
      Oops! Trang bạn tìm không tồn tại 🫤
    </p>
    <Link
      to="/todos"
      className="bg-pink-600 px-6 py-2 rounded-lg hover:bg-pink-700 transition"
    >
      ⬅ Quay lại danh sách công việc
    </Link>
  </div>
);

export default NotFoundPage;
