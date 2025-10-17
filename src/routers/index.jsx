import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "../page/NotFoundPage";
import MainRouter from "./MainRouter";

let router = createBrowserRouter([
  ...MainRouter,
  { path: "*", element: NotFoundPage },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
