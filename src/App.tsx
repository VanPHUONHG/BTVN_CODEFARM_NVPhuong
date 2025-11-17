import React from "react";
import TodoStatusBar from "./Component/TodoStatusBar";
import AddTodo from "./Component/AddTodo";
import TodoList from "./Component/TodoList";

const App: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-cyan-200 p-4">
      <div className="w-full max-w-md bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-2xl p-6 space-y-6 border border-cyan-500">
        <h1 className="text-3xl font-bold text-cyan-400 text-center mb-4">
          🖥️ Code Farm Todo List
        </h1>

        <TodoStatusBar />
        <AddTodo />
        <TodoList />
      </div>
    </div>
  );
};

export default App;
