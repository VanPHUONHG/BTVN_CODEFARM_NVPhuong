import { Navigate } from "react-router-dom";
import FuncitonProducts from "../component/FuncitonProducts";
import MainLayout from "../component/MainLayout ";
import TodoDetailPage from "../component/TodoDetail";
import Todos from "../component/Todos";

const MainRouter = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to={"/todos"} /> },
      { path: "todos", element: <Todos /> },
      { path: "todos/:id", element: <TodoDetailPage /> },
    ],
  },
];
export default MainRouter;
