import { Outlet } from "react-router-dom";
const AuthLayout = () => {
  return (
    <div>
      {/* <h1>AuthLayout</h1> */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
