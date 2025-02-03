import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("user_role");

  if (!token) {
    // Not logged in, redirect to login page with the return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Role not authorized, redirect to home page
    return <Navigate to="/" replace />;
  }

  // If authenticated and role is allowed, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
