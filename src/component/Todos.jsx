// src/pages/Todos.jsx
import React, { useEffect, useState } from "react";
import FuncitonProducts from "./FuncitonProducts";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [meta, setMeta] = useState(null);
  const [query, setQuery] = useState({
    _page: 1,
    _limit: 10,
  });

  //Xóa reset lại
  const resetFilter = () => {
    setQuery({
      _page: 1,
      _limit: 10,
    });
  };
  // Gọi API lấy danh sách công việc
  useEffect(() => {
    const fetchTodos = () => {
      const cleanupQuery = Object.entries(query)
        .filter(([key, value]) => {
          void key;
          return Boolean(value);
        })
        .map(([key, value]) => `${key}=${value}`)
        .join("&");
      fetch(`https://api-class-o1lo.onrender.com/api/v1/todos?${cleanupQuery}`)
        .then((res) => res.json())
        .then(({ data, meta }) => {
          setTodos(data || []);
          setMeta(meta);
        })
        .catch((err) => console.error("Lỗi khi gọi API:", err));
    };
    fetchTodos();
  }, [query]);

  // Phân trang
  const nextPage = () =>
    query._page < meta.totalPages &&
    setQuery((prev) => ({ ...prev, _page: query._page + 1 }));
  const prevPage = () =>
    query._page > 1 &&
    setQuery((prev) => ({ ...prev, _page: query._page - 1 }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white py-10 px-6">
      <h1 className="text-center text-5xl font-extrabold mb-10 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-lg tracking-wide">
        Danh Sách Việc Cần Làm
      </h1>

      {/* Thanh tìm kiếm + lọc + sắp xếp */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="🔍 Tìm kiếm công việc..."
          value={query?.search}
          onChange={(e) => {
            setQuery((prev) => ({
              ...prev,
              _page: 1,
              q: e.target.value,
            }));
          }}
          className="w-full md:w-1/3 px-4 py-2 rounded-lg bg-gray-800 border border-pink-400/40 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />

        <select
          value={query.priority}
          onChange={(e) => {
            setQuery((prev) => ({
              ...prev,
              _page: 1,
              priority: e.target.value,
            }));
          }}
          className="w-full md:w-1/3 px-4 py-2 rounded-lg bg-gray-800 border border-purple-400/40 focus:ring-2 focus:ring-purple-500"
        >
          <option value="">Tất cả mức độ ưu tiên</option>
          <option value="1">Thấp</option>
          <option value="2">Trung bình</option>
          <option value="3">Cao</option>
        </select>

        <select
          //   value={query.status || ""}
          onChange={(e) => {
            setQuery((prev) => ({
              ...prev,
              _page: 1,
              completed: e.target.value,
            }));
          }}
          className="w-full md:w-[23%] px-4 py-2 rounded-lg bg-gray-800 border border-pink-400/40 focus:ring-2 focus:ring-pink-500"
        >
          <option value="">Tất cả trạng thái</option>
          <option value="false">Đang làm</option>
          {/* <option value="overdue">Quá hạn</option> */}
          <option value="true">Hoàn thành</option>
        </select>

        <select
          value={query._order}
          onChange={(e) => {
            setQuery((prev) => ({
              ...prev,
              _page: 1,
              _sort: "priority",
              _order: e.target.value,
            }));
          }}
          className="w-full md:w-1/3 px-4 py-2 rounded-lg bg-gray-800 border border-indigo-400/40 focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Không sắp xếp</option>
          <option value="asc">Ưu tiên tăng dần</option>
          <option value="desc">Ưu tiên giảm dần</option>
        </select>

        <button onClick={resetFilter}>Reset</button>
      </div>

      {/* Hiển thị danh sách công việc */}
      <FuncitonProducts todos={todos} />

      {/* Phân trang */}
      <div className="flex justify-center items-center gap-4 mt-10">
        <button
          onClick={prevPage}
          disabled={query._page === 1}
          className="bg-pink-500 px-4 py-2 rounded-lg font-semibold hover:bg-pink-600 disabled:opacity-50"
        >
          ⬅ Trang trước
        </button>

        <span className="font-bold text-lg">
          {query._page}/{meta?.totalPages}
        </span>

        <button
          onClick={nextPage}
          disabled={query._page === meta?.totalPages}
          className="bg-purple-500 px-4 py-2 rounded-lg font-semibold hover:bg-purple-600 disabled:opacity-50"
        >
          Trang sau ➡
        </button>
      </div>
    </div>
  );
};

export default Todos;
