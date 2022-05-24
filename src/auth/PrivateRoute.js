import React from "react";
import { isAuthenticated } from "./index";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
