import React from "react";
import { Outlet } from "react-router-dom";

const LayoutAuth = () => {
  return (
    <>
      AuthLayou
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default LayoutAuth;
