import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ClientRouter from "./ClientRouter";
import AuthRouter from "./AuthRouter";

const router = createBrowserRouter([...ClientRouter, ...AuthRouter]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};
export default AppRouter;
