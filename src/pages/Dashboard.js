import React, { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { getUserData } from "../utils/config";

const Dashboard = () => {
  const navigate = useNavigate();

  const loacation = useLocation();

  useEffect(() => {
    const token = getUserData()?.token;
    if (!token) {
      navigate("/");
    } else {
      navigate("");
    }
  }, []);

  return (
    <div className="container-xxl p-5 dash-wrapper">
      <div className="my-2 d-flex p-2 justify-content-between align-items-center">
        <h4>Logo</h4>
        <Link
          className="nav-link"
          to={
            loacation.pathname === "/dashboard/profile"
              ? "/dashboard"
              : "/dashboard/profile"
          }
        >
          {loacation.pathname === "/dashboard/profile"
            ? "Dashboard"
            : "Profile"}
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Dashboard;
