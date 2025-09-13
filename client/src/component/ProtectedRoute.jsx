import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const user = localStorage.getItem("authToken");
  const authUser = JSON.parse(user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, [authUser]);

  if (authUser) {
    return <Outlet />;
  }
};

export default ProtectedRoute;
