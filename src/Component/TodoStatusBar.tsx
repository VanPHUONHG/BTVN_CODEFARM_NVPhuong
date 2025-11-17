import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/redux";

const TodoStatusBar: React.FC = () => {
    // đảm bảo todos luôn là array
    const todos = useSelector((state: RootState) =>
        Array.isArray(state.todos.todos) ? state.todos.todos : []
    );



    const total = todos.length;
    const completed = todos.filter((t) => t.completed).length;
    const uncompleted = total - completed;

    return (
        <div className="mb-4 p-2 bg-gray-100 border rounded">
            Todo: Tổng {total} | Hoàn thành {completed} | Chưa hoàn thành {uncompleted}
        </div>
    );
};

export default TodoStatusBar;
