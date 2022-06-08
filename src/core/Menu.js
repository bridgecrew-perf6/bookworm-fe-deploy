import * as React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import { ListItemText } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import { signout, isAuthenticated } from "../auth";
import profpic from "../images/profpic1.jpg";
import { itemTotal } from "./cartHelpers";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    background: "blue",
  },
}));

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Navbar = () => {
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function cartBadge() {
    return (
      <NavLink to="cart" style={{ color: "#000", textDecoration: "none" }}>
        <IconButton aria-label="cart" size="large">
          <StyledBadge badgeContent={itemTotal()} color="secondary">
            <ShoppingCartIcon sx={{ color: "white" }} />
          </StyledBadge>
        </IconButton>
      </NavLink>
    );
  }

  return (
    <AppBar position="static" sx={{ background: "#34495e" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo in Wide View */}
          <BookOutlinedIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/");
            }}
          />
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 400,
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            bookWorm
          </Typography>

          {/* Menu in Narrow View */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <NavLink
                to="shop"
                style={{ color: "#000", textDecoration: "none" }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Shop</Typography>
                </MenuItem>
              </NavLink>
              <NavLink
                to={
                  isAuthenticated() && isAuthenticated().user.role == 1
                    ? "admin/dashboard"
                    : "user/dashboard"
                }
                style={{ color: "#000", textDecoration: "none" }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Dashboard</Typography>
                </MenuItem>
              </NavLink>
            </Menu>
          </Box>

          {/* Logo in Narrow View */}
          <BookOutlinedIcon
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 1,
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/");
            }}
          />
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 400,
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            bookWorm
          </Typography>

          {/* Menu in Wide View */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
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
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <NavLink
                to={
                  isAuthenticated() && isAuthenticated().user.role == 1
                    ? "admin/dashboard"
                    : "user/dashboard"
                }
                style={({ isActive }) =>
                  isActive
                    ? { color: "#ff9900", textDecoration: "none" }
                    : { color: "#fff", textDecoration: "none" }
                }
              >
                Dashboard
              </NavLink>
            </Button>
          </Box>

          {/* Tooltip in Wide View */}
          <Box
            sx={{
              flexGrow: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {isAuthenticated() && (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={profpic} />
                </IconButton>
              </Tooltip>
            )}

            {!isAuthenticated() && (
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <NavLink
                  to="signin"
                  style={({ isActive }) =>
                    isActive
                      ? { color: "#f1c40f", textDecoration: "none" }
                      : { color: "#fff", textDecoration: "none" }
                  }
                >
                  Sign In
                </NavLink>
              </Button>
            )}

            {!isAuthenticated() && (
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <NavLink
                  to="signup"
                  style={({ isActive }) =>
                    isActive
                      ? { color: "#f1c40f", textDecoration: "none" }
                      : { color: "#fff", textDecoration: "none" }
                  }
                >
                  Sign Up
                </NavLink>
              </Button>
            )}

            {cartBadge()}

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography
                  onClick={() => {
                    isAuthenticated().user.role == 1
                      ? navigate("admin/dashboard/profile")
                      : navigate("user/dashboard/profile");
                  }}
                >
                  Profile
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography
                  onClick={() => {
                    signout(() => {
                      navigate("/");
                    });
                  }}
                >
                  Sign Out
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
