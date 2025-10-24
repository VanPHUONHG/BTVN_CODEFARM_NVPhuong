import Login from "../auth/Login";
import Register from "../auth/Register";
import LayoutAuth from "../layout/LayoutAuth";
import AuthTected from "./protected/AuthTected";

const AuthRouter = [
  {
    path: "auth",
    element: (
      <AuthTected>
        <LayoutAuth />
      </AuthTected>
    ),
    children: [
      {
        path: "register",
        Component: Register,
      },
      {
        path: "login",
        Component: Login,
      },
    ],
  },
];

export default AuthRouter;
