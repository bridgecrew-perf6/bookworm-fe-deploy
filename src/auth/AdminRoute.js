import React from "react";
import { isAuthenticated } from "./index";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  return isAuthenticated() && isAuthenticated().user.role == 1 ? (
    children
  ) : (
    <Navigate to="/signin" replace />
  );
};

export default AdminRoute;
