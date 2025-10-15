import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import AppRouter from "./routers";
import TodosPage from "./page/TodosPage";
import TodoDetailPage from "./component/TodoDetail";
import NotFoundPage from "./page/NotFoundPage";

const App = () => {
  return (
    <Routes>
      <Route path="/todos" element={<TodosPage />} />
      <Route path="/" element={<Navigate to="/todos" replace />} />
      <Route path="/todos/:id" element={<TodoDetailPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>

    // <AppRouter />
  );
};

export default App;
