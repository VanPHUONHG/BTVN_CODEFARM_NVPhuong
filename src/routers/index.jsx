import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "../page/NotFoundPage";
import MainRouter from "./MainRouter";

let route = createBrowserRouter([
  ...MainRouter,
  { path: "*", element: <NotFoundPage /> },
]);

const AppRouter = () => {
  return <RouterProvider router={route} />;
};

export default AppRouter;
