import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const user = localStorage.getItem("authToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  if (user) {
    return <Outlet />;
  }
};

export default ProtectedRoute;
