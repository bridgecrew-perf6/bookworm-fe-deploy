import React, { useState, useEffect } from "react";
import {
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  TextField,
  Button,
  Modal,
  Box,
  Typography,
  CircularProgress,
  IconButton,
  Select,
  MenuItem,
  makeStyles,
} from "@mui/material";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { listOrders, getStatusValues, updateOrderStatus } from "./apiAdmin";
import DashboardLayout from "../core/DashboardLayout";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusValues, setStatusValues] = useState([]);

  const { user, token } = isAuthenticated();

  const loadOrders = () => {
    listOrders(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  const loadStatusValues = () => {
    getStatusValues(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setStatusValues(data);
      }
    });
  };

  useEffect(() => {
    loadOrders();
    loadStatusValues();
  }, []);

  const showOrdersLength = () => {
    if (orders.length > 0) {
      return <Typography>Total orders: {orders.length}</Typography>;
    } else {
      return <Typography>No orders</Typography>;
    }
  };

  const showInput = (key, value) => {
    return (
      <Box>
        <Box>
          <Box>{key}</Box>
        </Box>
        <Box>{value}</Box>
      </Box>
    );
  };

  const handleStatusChange = (e, orderId) => {
    // statusValues(e.target.value);
    // console.log("update order status");
    updateOrderStatus(user._id, token, orderId, e.target.value).then((data) => {
      if (data.error) {
        console.log("Status update failed");
      } else {
        loadOrders();
      }
    });
  };

  const showStatus = (o) => {
    return (
      <Box>
        <Typography>{o.status}</Typography>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={statusValues}
            label="Age"
            onChange={(e) => handleStatusChange(e, o._id)}
          >
            {/* <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem> */}

            {statusValues.map((status, index) => {
              return (
                <MenuItem key={index} value={status}>
                  {status}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
    );
  };

  return (
    <Box sx={{ margin: "auto", textAlign: "center" }}>
      <DashboardLayout title="Create Product" description="">
        {showOrdersLength()}
        {/* {JSON.stringify(orders)} */}
        {orders.map((o, oIndex) => {
          return (
            <Box key={oIndex}>
              <Typography>Order ID: {o._id}</Typography>
              <ul>
                <li>{showStatus(o)}</li>
                <li>Transaction ID: {o.transaction_id}</li>
                <li>Amount: {o.amount}</li>
                <li>Ordered by: {o.user.name}</li>
                <li>Ordered on: {moment(o.createdAt).fromNow()}</li>
                <li>Delivery address: {o.address}</li>
              </ul>
              <Typography>
                Total products in the order: {o.products.length}
              </Typography>
              {o.products.map((p, pIndex) => {
                return (
                  <Box key={pIndex}>
                    {showInput("Product name: ", p.name)}
                    {showInput("Product price: ", p.price)}
                    {showInput("Product total: ", p.count)}
                    {showInput("Product ID: ", p._id)}
                  </Box>
                );
              })}
            </Box>
          );
        })}
      </DashboardLayout>
    </Box>
  );
};

export default Orders;
