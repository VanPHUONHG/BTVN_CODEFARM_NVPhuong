import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import TodoDetailPage from "./component/TodoDetail";
import FormPage from "./page/FormPage";
import FormUpdateJob from "./page/FormUpdateJob";
import NotFoundPage from "./page/NotFoundPage";
import TodosPage from "./page/TodosPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/todos" replace />} />

      <Route path="/todos/update/:id" element={<FormUpdateJob />} />

      <Route path="/todos/:id" element={<TodoDetailPage />} />
      <Route path="/todos" element={<TodosPage />} />
      <Route path="/add" element={<FormPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>

    // <AppRouter />
  );
};

export default App;
