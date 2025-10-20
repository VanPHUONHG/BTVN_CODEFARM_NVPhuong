import Register from "../auth/Register";
import Login from "../auth/Login";

const AuthRouter = [
  {
    path: "auth/register",
    Component: Register,
  },
  {
    path: "auth/login",
    Component: Login,
  },
];
export default AuthRouter;
