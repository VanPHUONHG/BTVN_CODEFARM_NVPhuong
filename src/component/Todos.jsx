// src/pages/Todos.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FuncitonProducts from "./FuncitonProducts";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [meta, setMeta] = useState(null);
  const [query, setQuery] = useState({
    _page: 1,
    _limit: 10,
  });

  // Reset filter
  const resetFilter = () => {
    setQuery({
      _page: 1,
      _limit: 10,
    });
  };

  // Fetch API todos
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const cleanupQuery = Object.entries(query)
          .filter(([value]) => Boolean(value))
          .map(([key, value]) => `${key}=${value}`)
          .join("&");

        const res = await fetch(
          `https://api-class-o1lo.onrender.com/api/v1/todos?${cleanupQuery}`,
          {
            headers: {
              Authorization: `Bearer ${
                localStorage.getItem("accessToken") ||
                sessionStorage.getItem("accessToken")
              }`,
            },
          }
        );
        const { data, meta } = await res.json();
        setTodos(data || []);
        setMeta(meta);
      } catch (err) {
        console.error("Lỗi khi gọi API:", err);
      }
    };
    fetchTodos();
  }, [query]);

  // Phân trang
  const nextPage = () =>
    query._page < meta?.totalPages &&
    setQuery((prev) => ({ ...prev, _page: query._page + 1 }));
  const prevPage = () =>
    query._page > 1 &&
    setQuery((prev) => ({ ...prev, _page: query._page - 1 }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#4c1d95] text-white px-6 py-10">
      {/* Tiêu đề */}
      <h1 className="text-center text-5xl font-extrabold mb-10 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent tracking-wide drop-shadow-lg">
        📝 Danh Sách Việc Cần Làm
      </h1>

      {/* Bộ lọc + tìm kiếm */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row flex-wrap justify-between items-center gap-4 mb-8 bg-gray-800/40 backdrop-blur-sm p-5 rounded-2xl border border-gray-700 shadow-lg">
        <input
          type="text"
          placeholder="🔍 Tìm kiếm công việc..."
          onChange={(e) =>
            setQuery((prev) => ({ ...prev, _page: 1, q: e.target.value }))
          }
          className="w-full md:w-[30%] px-4 py-2 rounded-xl bg-gray-900/70 border border-pink-500/40 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
        />

        <select
          value={query.priority || ""}
          onChange={(e) =>
            setQuery((prev) => ({
              ...prev,
              _page: 1,
              priority: e.target.value,
            }))
          }
          className="w-full md:w-[20%] px-4 py-2 rounded-xl bg-gray-900/70 border border-purple-500/40 focus:ring-2 focus:ring-purple-500 transition"
        >
          <option value="">🎯 Mức độ ưu tiên</option>
          <option value="1">Thấp</option>
          <option value="2">Trung bình</option>
          <option value="3">Cao</option>
        </select>

        <select
          onChange={(e) =>
            setQuery((prev) => ({
              ...prev,
              _page: 1,
              completed: e.target.value,
            }))
          }
          className="w-full md:w-[20%] px-4 py-2 rounded-xl bg-gray-900/70 border border-pink-500/40 focus:ring-2 focus:ring-pink-500 transition"
        >
          <option value="">📋 Trạng thái</option>
          <option value="false">Đang làm</option>
          <option value="true">Hoàn thành</option>
        </select>

        <select
          value={query._order || ""}
          onChange={(e) =>
            setQuery((prev) => ({
              ...prev,
              _page: 1,
              _sort: "priority",
              _order: e.target.value,
            }))
          }
          className="w-full md:w-[20%] px-4 py-2 rounded-xl bg-gray-900/70 border border-indigo-500/40 focus:ring-2 focus:ring-indigo-500 transition"
        >
          <option value="">⚙️ Sắp xếp</option>
          <option value="asc">Ưu tiên tăng dần</option>
          <option value="desc">Ưu tiên giảm dần</option>
        </select>

        <div className="flex gap-3">
          <button
            onClick={resetFilter}
            className="px-5 py-2 bg-gradient-to-r from-blue-500 to-teal-400 text-white font-semibold rounded-xl shadow-md hover:from-blue-600 hover:to-teal-500 transition-all"
          >
            🔄 Reset
          </button>

          <Link
            to="/add"
            className="px-5 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-xl shadow-md hover:from-pink-600 hover:to-purple-600 transition-all"
          >
            ➕ Thêm mới
          </Link>
        </div>
      </div>

      {/* Danh sách công việc */}
      <div className="max-w-6xl mx-auto bg-gray-900/40 p-6 rounded-2xl shadow-xl border border-gray-700 backdrop-blur-md">
        <FuncitonProducts todos={todos} />
      </div>

      {/* Phân trang */}
      <div className="flex justify-center items-center gap-4 mt-10">
        <button
          onClick={prevPage}
          disabled={query._page === 1}
          className="px-4 py-2 rounded-lg font-semibold bg-pink-600 hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          ⬅ Trang trước
        </button>

        <span className="font-bold text-lg text-blue-300 bg-gray-800/50 px-4 py-1 rounded-full border border-gray-600 shadow-inner">
          {query._page}/{meta?.totalPages || 1}
        </span>

        <button
          onClick={nextPage}
          disabled={query._page === meta?.totalPages}
          className="px-4 py-2 rounded-lg font-semibold bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Trang sau ➡
        </button>
      </div>
    </div>
  );
};

export default Todos;
