import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { NavLink } from "react-router-dom";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

const activeStyleButton = ({ isActive }) =>
  isActive
    ? { color: "inherit", textDecoration: "none" }
    : { color: "inherit", textDecoration: "none" };

export const mainListItems = (
  <React.Fragment>
    <NavLink to="" style={activeStyleButton}>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </NavLink>
    <NavLink to="profile" style={activeStyleButton}>
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Admin Info" />
      </ListItemButton>
    </NavLink>
    <NavLink to="update" style={activeStyleButton}>
      <ListItemButton>
        <ListItemIcon>
          <ManageAccountsIcon />
        </ListItemIcon>
        <ListItemText primary="Update Info" />
      </ListItemButton>
    </NavLink>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Utilities
    </ListSubheader>
    <NavLink to="create/category" style={activeStyleButton}>
      <ListItemButton>
        <ListItemIcon>
          <AddBusinessIcon />
        </ListItemIcon>
        <ListItemText primary="Create Category" />
      </ListItemButton>
    </NavLink>
    <NavLink to="create/product" style={activeStyleButton}>
      <ListItemButton>
        <ListItemIcon>
          <MenuBookIcon />
        </ListItemIcon>
        <ListItemText primary="Create Product" />
      </ListItemButton>
    </NavLink>
    <NavLink to="products" style={activeStyleButton}>
      <ListItemButton>
        <ListItemIcon>
          <LibraryBooksIcon />
        </ListItemIcon>
        <ListItemText primary="Manage Products" />
      </ListItemButton>
    </NavLink>
    <NavLink to="orders" style={activeStyleButton}>
      <ListItemButton>
        <ListItemIcon>
          <ListAltIcon />
        </ListItemIcon>
        <ListItemText primary="Order List" />
      </ListItemButton>
    </NavLink>
  </React.Fragment>
);
