import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ClientRouter from "./ClientRouter";
import AuthRouter from "./AuthRouter";

const router = createBrowserRouter([
  ...ClientRouter,
  ...AuthRouter,
  // Catch-all 404
  { path: "*", element: <div>404 - Page Not Found</div> },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};
export default AppRouter;
