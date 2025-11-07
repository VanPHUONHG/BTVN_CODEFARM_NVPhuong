import { Navigate } from "react-router-dom";

const PrivateRouter = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.rote;
  console.log(user);
  if (!token) {
    console.log("check token");
    return <Navigate to={"/auth/login"} />;
  }
  if (!role) {
    console.log("check role");

    return <Navigate to={"/auth/login"} />;
  }
  return children;
};

export default PrivateRouter;
