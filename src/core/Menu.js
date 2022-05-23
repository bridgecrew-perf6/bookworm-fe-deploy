import { Link, useNavigate, NavLink, Navigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { signout, isAuthenticated } from "../auth";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <NavLink to="/" style={{ color: "#fff", textDecoration: "none" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="logo"
            >
              <LocalMallIcon />
            </IconButton>
            Ecommerce
          </NavLink>
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button color="inherit">
            <NavLink
              to="shop"
              style={({ isActive }) =>
                isActive
                  ? { color: "#ff9900", textDecoration: "none" }
                  : { color: "#fff", textDecoration: "none" }
              }
            >
              Shop
            </NavLink>
          </Button>
          {!isAuthenticated() && (
            <Button color="inherit">
              <NavLink
                to="signin"
                style={({ isActive }) =>
                  isActive
                    ? { color: "#ff9900", textDecoration: "none" }
                    : { color: "#fff", textDecoration: "none" }
                }
              >
                Sign In
              </NavLink>
            </Button>
          )}

          {!isAuthenticated() && (
            <Button color="inherit">
              <NavLink
                to="signup"
                style={({ isActive }) =>
                  isActive
                    ? { color: "#ff9900", textDecoration: "none" }
                    : { color: "#fff", textDecoration: "none" }
                }
              >
                Sign Up
              </NavLink>
            </Button>
          )}

          {isAuthenticated() && (
            <Button
              color="inherit"
              onClick={() => {
                signout(() => {
                  navigate("/");
                });
              }}
            >
              <span style={{ color: "#fff", textDecoration: "none" }}>
                Sign Out
              </span>
            </Button>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
