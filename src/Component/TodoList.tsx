import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos } from "../features/todosSlice";
import type { RootState, AppDispatch } from "../store/redux";
import TodoItem from "./TodoItem";

const TodoList: React.FC = () => {
    const { todos, loading } = useSelector((state: RootState) => state.todos);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    return (
        <div className="min-h-screen p-6 bg-gradient-to-b from-gray-900 to-gray-800 text-white font-mono">
            {loading && <p className="text-yellow-400 text-center">Đang tải...</p>}
            {!loading && !todos.length && (
                <p className="text-red-400 text-center">Không có công việc nào</p>
            )}

            <div className="max-w-xl mx-auto bg-gray-900/80 p-4 rounded-xl shadow-lg border border-gray-700">
                {todos.map((todo) => (
                    <TodoItem key={todo._id} todo={todo} />
                ))}
            </div>
        </div>
    );
};

export default TodoList;
