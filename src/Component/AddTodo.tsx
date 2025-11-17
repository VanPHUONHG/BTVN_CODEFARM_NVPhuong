import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo, fetchTodos } from "../features/todosSlice";
import type { AppDispatch } from "../store/redux";

const AddTodo: React.FC = () => {
    const [text, setText] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch<AppDispatch>();

    const handleAdd = async () => {
        if (!text.trim()) {
            setError("⚠️ Vui lòng nhập công việc trước khi thêm!");
            return;
        }

        setError(""); // clear lỗi
        await dispatch(addTodo({ name: text }));
        setText("");
        dispatch(fetchTodos()); // reload danh sách
    };

    return (
        <div className="max-w-xl mx-auto mb-6">
            <div className="flex gap-3">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="💻 Nhập công việc..."
                    className="flex-1 px-4 py-2 rounded-lg bg-gray-900/80 text-cyan-200 placeholder-cyan-400 border border-gray-700 shadow-md
          focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200"
                />
                <button
                    onClick={handleAdd}
                    className="px-6 py-2 rounded-lg bg-cyan-500 text-gray-900 font-bold hover:bg-cyan-400 shadow-lg transition-all duration-200"
                >
                    Thêm
                </button>
            </div>
            {error && <p className="text-red-400 mt-1 text-sm">{error}</p>}
        </div>
    );
};

export default AddTodo;
