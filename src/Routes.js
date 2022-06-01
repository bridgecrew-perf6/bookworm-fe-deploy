import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import Shop from "./core/Shop";
import Navbar from "./core/Menu";
import { createTheme, ThemeProvider, Typography } from "@mui/material";
import PrivateRoute from "./auth/PrivateRoute";
import UserDashboard from "./user/UserDashboard";
import AdminRoute from "./auth/AdminRoute";
import AdminDashboard from "./admin/AdminDashboard";
import Product from "./core/Product";
import Cart from "./core/Cart";

const Routes = () => {
  const theme = createTheme({
    typography: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
    },
    // palette: {
    //   primary: { main: "#f1c40f" },
    // },
  });
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Navbar></Navbar>
        <Switch>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/user/dashboard/*"
            element={
              <PrivateRoute>
                <UserDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/dashboard/*"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route path="/product/:productId" element={<Product />} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default Routes;
