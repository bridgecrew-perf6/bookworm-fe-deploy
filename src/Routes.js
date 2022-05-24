import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import Navbar from "./core/Menu";
import { createTheme, ThemeProvider, Typography } from "@mui/material";
import PrivateRoute from "./auth/PrivateRoute";
import UserDashboard from "./user/UserDashboard";

const Routes = () => {
  const theme = createTheme({
    typography: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Navbar></Navbar>
        <Switch>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <UserDashboard />
              </PrivateRoute>
            }
          />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default Routes;
