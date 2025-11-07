import LoginPage from "../Auth/LoginPage";
import RegisterPage from "../Auth/RegisterPage";
import AuthLayout from "../Layout/AuthLayout";

const AuthRouter = [
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      { path: "register", Component: RegisterPage },
      { path: "login", Component: LoginPage },
    ],
  },
];

export default AuthRouter;
