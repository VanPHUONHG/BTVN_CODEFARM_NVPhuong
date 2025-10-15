import React, { useEffect, useState } from "react";
import { Form, Link } from "react-router-dom";

const Important = ({ showImportant = false }) => {
  const [todos, setTodos] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("none");
  const [search, setSearch] = useState("");
  const itemsPerPage = 6;

  // Lấy dữ liệu từ API
  useEffect(() => {
    fetch("https://api-class-o1lo.onrender.com/api/v1/todos/?priority=3")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data.data || []);
      })
      .catch((err) => console.error("Lỗi khi gọi API:", err));
  }, []);

  // Xử lý hiển thị trạng thái
  const getStatus = (item) => {
    if (item.completed) return "Hoàn thành ✅";
    const now = new Date();
    const due = new Date(item.dueDate);
    return now > due ? "Quá hạn ❌" : "Đang thực hiện ⏳";
  };

  // Xử lý mức độ ưu tiên
  const getPriorityText = (p) => {
    if (p === 1) return "Thấp";
    if (p === 2) return "Trung bình";
    if (p === 3) return "Cao";
    return "Không xác định";
  };

  const getPriorityColor = (p) => {
    if (p === 1) return "text-green-400";
    if (p === 2) return "text-yellow-400";
    if (p === 3) return "text-red-400";
    return "text-gray-400";
  };

  // Bộ lọc + sắp xếp + tìm kiếm
  const filteredData = todos
    .filter((item) => item.name?.toLowerCase().includes(search.toLowerCase()))
    .filter((item) => {
      if (showImportant) return item.priority === 3;

      if (filter === "low") return item.priority === 1;
      if (filter === "medium") return item.priority === 2;
      if (filter === "high") return item.priority === 3;
      return true;
    })
    .sort((a, b) => {
      if (sortOrder === "asc") return a.priority - b.priority;
      if (sortOrder === "desc") return b.priority - a.priority;
      return 0;
    });

  // Phân trang
  const totalPage = Math.ceil(filteredData.length / itemsPerPage);
  const indexPrev = (currPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(indexPrev, indexPrev + itemsPerPage);

  const nextPage = () => currPage < totalPage && setCurrPage(currPage + 1);
  const prevPage = () => currPage > 1 && setCurrPage(currPage - 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white py-10 px-6">
      <h1 className="text-center text-5xl font-extrabold mb-10 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-lg tracking-wide">
        Danh Sách Việc Cần Làm
      </h1>
      {/* Tìm kiếm */}
      {!showImportant && (
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <input
            type="text"
            placeholder="🔍 Tìm kiếm công việc..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrPage(1);
            }}
            className="w-full md:w-1/3 px-4 py-2 rounded-lg bg-gray-800 border border-pink-400/40 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />

          {/* Lọc */}
          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setCurrPage(1);
            }}
            className="w-full md:w-1/3 px-4 py-2 rounded-lg bg-gray-800 border border-purple-400/40 focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">Tất cả mức độ ưu tiên</option>
            <option value="low">Thấp</option>
            <option value="medium">Trung bình</option>
            <option value="high">Cao</option>
          </select>

          {/* Sắp xếp */}
          <select
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(e.target.value);
              setCurrPage(1);
            }}
            className="w-full md:w-1/3 px-4 py-2 rounded-lg bg-gray-800 border border-indigo-400/40 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="none">Không sắp xếp</option>
            <option value="asc">Ưu tiên tăng dần</option>
            <option value="desc">Ưu tiên giảm dần</option>
          </select>
        </div>
      )}

      {/* Danh sách công việc */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentData.length > 0 ? (
          currentData.map((item) => (
            <div
              key={item._id}
              className="bg-gray-900/80 rounded-xl border border-purple-700/40 p-5 shadow-lg hover:border-pink-400 hover:shadow-pink-400/40 transition-all duration-300"
            >
              <h2 className="text-xl font-semibold text-pink-300 mb-1">
                <Link
                  to={`/todos/${item._id}`}
                  state={{
                    from: {
                      pathName: "/todos",
                      search,
                      filter,
                      sortOrder,
                      currPage,
                    },
                  }}
                  className="hover:text-pink-400 underline"
                >
                  {item.name}
                </Link>
              </h2>
              <p className="text-sm text-gray-300 mb-2">
                {item.description || "Không có mô tả"}
              </p>

              <p
                className={`font-medium mb-1 ${getPriorityColor(
                  item.priority
                )}`}
              >
                Ưu tiên: {getPriorityText(item.priority)}
              </p>
              <p className="text-gray-300">
                Hạn: {new Date(item.dueDate).toLocaleDateString("vi-VN")}
              </p>

              <p className="mt-2 font-semibold">
                Trạng thái:{" "}
                <span
                  className={
                    item.completed
                      ? "text-green-400"
                      : new Date(item.dueDate) < new Date()
                      ? "text-red-400"
                      : "text-yellow-400"
                  }
                >
                  {getStatus(item)}
                </span>
              </p>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-xl text-pink-300 py-10">
            Không có công việc nào 🫥
          </div>
        )}
      </div>

      {/* Phân trang */}
      <div className="flex justify-center items-center gap-4 mt-10">
        <button
          onClick={prevPage}
          disabled={currPage === 1}
          className="bg-pink-500 px-4 py-2 rounded-lg font-semibold hover:bg-pink-600 disabled:opacity-50"
        >
          ⬅ Trang trước
        </button>
        <span className="font-bold text-lg">
          {currPage}/{totalPage}
        </span>
        <select name="" id="">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="25">25</option>
        </select>
        <button
          onClick={nextPage}
          disabled={currPage === totalPage}
          className="bg-purple-500 px-4 py-2 rounded-lg font-semibold hover:bg-purple-600 disabled:opacity-50"
        >
          Trang sau ➡
        </button>
      </div>
    </div>
  );
};

export default Important;
