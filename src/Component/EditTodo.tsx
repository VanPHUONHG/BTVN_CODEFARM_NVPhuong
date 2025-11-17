import React, { useState, } from "react";
import { useDispatch } from "react-redux";
import { updateTodo, fetchTodos } from "../features/todosSlice";
import type { AppDispatch } from "../store/redux";
import type { Todo } from "../Type/todos";

interface EditTodoProps {
    todo: Todo;
    onClose: () => void;
}

const EditTodo: React.FC<EditTodoProps> = ({ todo, onClose }) => {
    const dispatch = useDispatch<AppDispatch>();

    const [name, setName] = useState(todo.name);
    const [description, setDescription] = useState(todo.description || "");
    const [priority, setPriority] = useState(todo.priority ?? 1);
    const [dueDate, setDueDate] = useState(todo.dueDate ? todo.dueDate.split("T")[0] : "");
    const [completed, setCompleted] = useState(todo.completed);
    const [error, setError] = useState("");

    const handleSave = async () => {
        if (!name.trim()) {
            setError("⚠️ Vui lòng nhập tên công việc!");
            return;
        }

        setError("");

        await dispatch(
            updateTodo({
                id: todo._id,
                todo: { name, description, priority, dueDate, completed },
            })
        );

        dispatch(fetchTodos());
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-md text-white relative">
                <h2 className="text-cyan-400 text-xl font-bold mb-4">✏️ Sửa công việc</h2>

                <div className="flex flex-col gap-3">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Tên công việc..."
                        className="px-4 py-2 rounded-lg bg-gray-800 text-cyan-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />

                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Mô tả công việc..."
                        className="px-4 py-2 rounded-lg bg-gray-800 text-cyan-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                        rows={3}
                    />

                    <select
                        value={priority}
                        onChange={(e) => setPriority(Number(e.target.value))}
                        className="px-4 py-2 rounded-lg bg-gray-800 text-cyan-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                        <option value={1}>Bình thường</option>
                        <option value={2}>Quan trọng</option>
                        <option value={3}>Rất quan trọng</option>
                    </select>

                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="px-4 py-2 rounded-lg bg-gray-800 text-cyan-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />

                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={completed}
                            onChange={(e) => setCompleted(e.target.checked)}
                            className="accent-cyan-400"
                        />
                        Hoàn thành
                    </label>

                    {error && <p className="text-red-400 text-sm">{error}</p>}

                    <div className="flex justify-end gap-3 mt-2">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                        >
                            Hủy
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-4 py-2 bg-cyan-500 text-gray-900 font-bold rounded-lg hover:bg-cyan-400 transition-colors"
                        >
                            Lưu
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditTodo;
