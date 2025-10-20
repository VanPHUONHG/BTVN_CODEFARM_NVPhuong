import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "../page/NotFoundPage";
import MainRouter from "./MainRouter";
import AuthRouter from "./AuthRouter";

let router = createBrowserRouter([
  ...MainRouter,
  ...AuthRouter,
  { path: "*", element: NotFoundPage },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
