import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <div className="container-xxl header">
        <h1 className="title mx-0">TODO App</h1>
      </div>
      <Outlet />
    </>
  );
};

export default MainLayout;
