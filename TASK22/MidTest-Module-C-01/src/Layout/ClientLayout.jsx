import { Outlet } from "react-router-dom";
const ClientLayout = () => {
  return (
    <div>
      {/* <h1>ClientLayout</h1> */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default ClientLayout;
