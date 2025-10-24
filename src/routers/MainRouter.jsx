import { Navigate } from "react-router-dom";
import MainLayout from "../component/MainLayout ";
import TodoDetailPage from "../component/TodoDetail";
import Todos from "../component/Todos";
import FormPage from "../page/FormPage";
import FormUpdateJob from "../page/FormUpdateJob";
import Register from "../auth/Register";
import Login from "../auth/Login";
import PrivateRoute from "./protected/PrivateRoute";

const MainRouter = [
  {
    path: "/",
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Navigate to={"/todos"} /> },
      { path: "todos", element: <Todos /> },
      { path: "todos/:id", element: <TodoDetailPage /> },
      { path: "todos/add", element: <FormPage /> },
      { path: "todos/update/:id", element: <FormUpdateJob /> },
    ],
  },
];
export default MainRouter;
