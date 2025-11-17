import React, { useState } from "react";
import { useDispatch } from "react-redux";
import type { Todo } from "../Type/todos";
import type { AppDispatch } from "../store/redux";
import { deleteTodo, toggleCompleteTodo, fetchTodos } from "../features/todosSlice";
import EditTodo from "./EditTodo"; // Adjust the import path as needed

interface TodoItemProps {
    todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [hover, setHover] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleToggle = async () => {
        if (window.confirm("Bạn có muốn cập nhật trạng thái không?")) {
            await dispatch(toggleCompleteTodo(todo._id));
            dispatch(fetchTodos());
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const getPriorityColor = (priority: number) => {
        if (priority >= 3) return "text-red-400 bg-red-900/30";
        if (priority === 2) return "text-yellow-400 bg-yellow-900/30";
        return "text-blue-400 bg-blue-900/30";
    };

    const isOverdue = new Date(todo.dueDate) < new Date();

    return (
        <>
            <div
                className={`relative overflow-hidden rounded-2xl shadow-2xl border border-gray-700/50 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-3xl
                    ${todo.completed
                        ? "bg-gradient-to-br from-emerald-900/80 to-emerald-800/80 border-emerald-600/50"
                        : isOverdue
                            ? "bg-gradient-to-br from-rose-900/80 to-rose-800/80 border-rose-600/50"
                            : "bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-slate-600/50"
                    }`}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                {/* Decorative top border gradient */}
                <div className={`absolute top-0 left-0 right-0 h-1 ${todo.completed ? "bg-gradient-to-r from-emerald-400 to-emerald-500" :
                    isOverdue ? "bg-gradient-to-r from-rose-400 to-rose-500" :
                        "bg-gradient-to-r from-cyan-400 to-blue-500"
                    }`}></div>

                {/* Main content */}
                <div className="p-6">
                    {/* Todo Name & Status - Clickable Header */}
                    <div className="flex justify-between items-start mb-4 group">
                        <div className="flex-1 cursor-pointer" onClick={handleToggle}>
                            <h3 className={`text-xl font-bold transition-all duration-300 pr-2 ${todo.completed
                                ? "line-through text-gray-300"
                                : "text-white group-hover:text-cyan-300"
                                }`}>
                                {todo.name}
                            </h3>
                            <p className={`text-sm mt-1 transition-colors duration-300 ${todo.completed
                                ? "text-emerald-300"
                                : isOverdue
                                    ? "text-rose-300"
                                    : "text-gray-400 group-hover:text-gray-300"
                                }`}>
                                {todo.description || "Không có mô tả"}
                            </p>
                        </div>

                        {/* Status Badge */}
                        <div className={`ml-4 flex-shrink-0 rounded-full px-3 py-1 text-xs font-semibold shadow-lg ${todo.completed
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30"
                            : isOverdue
                                ? "bg-rose-500/20 text-rose-300 border border-rose-400/30"
                                : "bg-amber-500/20 text-amber-300 border border-amber-400/30"
                            }`}>
                            {todo.completed ? "✓ Hoàn thành" : isOverdue ? "⏰ Quá hạn" : "⏳ Chờ"}
                        </div>
                    </div>

                    {/* Details Grid - Clean and Compact */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                        {/* Priority Chip */}
                        <div className={`p-2 rounded-lg border border-gray-600/50 ${getPriorityColor(todo.priority ?? 1)
                            }`}>
                            <span className="font-mono text-xs">Ưu tiên</span>
                            <div className="flex items-center mt-1">
                                <span className="text-lg mr-1">★</span>
                                <span className="font-bold">{todo.priority ?? 1}</span>
                            </div>
                        </div>

                        {/* Due Date */}
                        <div className={`p-2 rounded-lg border border-gray-600/50 ${isOverdue ? "bg-rose-900/30 text-rose-300" : "bg-gray-800/30 text-gray-300"
                            }`}>
                            <span className="font-mono text-xs">Hạn chót</span>
                            <div className="flex items-center mt-1">
                                <span className="text-lg mr-1">📅</span>
                                <span className="font-semibold">
                                    {new Date(todo.dueDate).toLocaleDateString('vi-VN')}
                                </span>
                            </div>
                        </div>

                        {/* Updated At */}
                        <div className="p-2 rounded-lg border border-gray-600/50 bg-gray-800/30 text-gray-400 col-span-2 md:col-span-1">
                            <span className="font-mono text-xs">Cập nhật</span>
                            <div className="mt-1">
                                <span className="font-mono text-xs">
                                    {new Date(todo.updatedAt).toLocaleString('vi-VN', {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </span>
                            </div>
                        </div>

                        {/* ID - Subtle */}
                        <div className="p-2 rounded-lg border border-gray-600/50 bg-gray-800/30 text-gray-500 col-span-2 md:col-span-1 text-xs">
                            <span className="font-mono">ID: {todo._id.substring(0, 8)}...</span>
                        </div>
                    </div>

                    {/* Action Buttons - Bottom Row */}
                    <div className="flex justify-end items-center space-x-3 pt-4 border-t border-gray-700/50">
                        <button
                            onClick={handleToggle}
                            className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 ${todo.completed
                                ? "bg-emerald-600/50 hover:bg-emerald-500/70 text-emerald-100"
                                : isOverdue
                                    ? "bg-rose-600/50 hover:bg-rose-500/70 text-rose-100"
                                    : "bg-cyan-600/50 hover:bg-cyan-500/70 text-cyan-100"
                                }`}
                        >
                            {todo.completed ? "Chưa hoàn thành" : "Hoàn thành"}
                        </button>
                        <button
                            onClick={handleEdit}
                            className="p-2 rounded-xl bg-blue-600/50 hover:bg-blue-500/70 text-blue-100 font-bold transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                            title="Sửa todo"
                        >
                            ✏️
                        </button>
                        <button
                            onClick={() => dispatch(deleteTodo(todo._id))}
                            className="p-2 rounded-xl bg-rose-600/50 hover:bg-rose-500/70 text-rose-100 font-bold transition-all duration-300 shadow-lg hover:shadow-rose-500/25"
                            title="Xóa todo"
                        >
                            🗑️
                        </button>
                    </div>
                </div>

                {/* Enhanced Tooltip on Hover */}
                {hover && !todo.completed && (
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900/95 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-xl shadow-2xl border border-gray-700/50 z-20 animate-fade-in">
                        <span className="flex items-center">
                            <span className="text-yellow-400 mr-1">⚠️</span>
                            Click để cập nhật trạng thái!
                        </span>
                    </div>
                )}

                <style jsx>{`
                    @keyframes fade-in {
                        from { opacity: 0; transform: translateY(-10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .animate-fade-in {
                        animation: fade-in 0.3s ease-out;
                    }
                `}</style>
            </div>

            {isEditing && (
                <EditTodo
                    todo={todo}
                    onClose={() => setIsEditing(false)}
                />
            )}
        </>
    );
};

export default TodoItem;