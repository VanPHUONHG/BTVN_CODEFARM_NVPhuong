// src/pages/FuncitonProducts.jsx
import React from "react";
import { Link } from "react-router-dom";

const FuncitonProducts = ({ todos = [] }) => {
  const getStatus = (item) => {
    console.log(item);
    return item.isCompleted ? "Hoàn thành ✅" : "Dang thuc hien";
    // if (item.completed) return "Hoàn thành ✅";
    // const now = new Date();
    // const due = new Date(item.dueDate);
    // return now > due ? "Quá hạn ❌" : "Đang thực hiện ⏳";
  };

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
  console.log(todos);
  if (!todos.length) {
    return (
      <div className="text-center text-xl text-pink-300 py-10">
        Không có công việc nào 🫥
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {todos.map((item) => (
        <div
          key={item._id}
          className="bg-gray-900/80 rounded-xl border border-purple-700/40 p-5 shadow-lg hover:border-pink-400 hover:shadow-pink-400/40 transition-all duration-300"
        >
          <h2 className="text-xl font-semibold text-pink-300 mb-1">
            <Link
              to={`/todos/${item._id}`}
              className="hover:text-pink-400 underline"
            >
              {item.name}
            </Link>
          </h2>
          <p className="text-sm text-gray-300 mb-2">
            {item.description || "Không có mô tả"}
          </p>

          <p className={`font-medium mb-1 ${getPriorityColor(item.priority)}`}>
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
      ))}
    </div>
  );
};

export default FuncitonProducts;
