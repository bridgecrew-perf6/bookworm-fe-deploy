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
  Select,
  MenuItem,
  makeStyles,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import PropTypes from "prop-types";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { listOrders, getStatusValues, updateOrderStatus } from "./apiAdmin";
import DashboardLayout from "../core/DashboardLayout";
import moment from "moment";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

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

  function createData(
    transaction_id,
    status,
    customer,
    customer_id,
    total,
    date,
    address,
    detail
  ) {
    return {
      transaction_id,
      status,
      customer,
      customer_id,
      total,
      date,
      address,
      // detail: [
      //   {
      //     date: "2020-01-05",
      //     customerId: "11091700",
      //     amount: 3,
      //   },
      //   {
      //     date: "2020-01-02",
      //     customerId: "Anonymous",
      //     amount: 1,
      //   },
      // ],
      detail,
    };
  }

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.transaction_id}
          </TableCell>
          <TableCell align="right">{row.status}</TableCell>
          <TableCell align="right">{row.customer}</TableCell>
          <TableCell align="right">{row.customer_id}</TableCell>
          <TableCell align="right">{row.total}</TableCell>
          <TableCell align="right">{row.date}</TableCell>
          <TableCell align="right">{row.address}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Order Details
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>No.</TableCell>
                      <TableCell>Title</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell align="right">Price ($)</TableCell>
                      <TableCell align="right">Total price ($)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.detail.map((detailRow, i) => (
                      <TableRow key={i}>
                        <TableCell component="th" scope="row">
                          {i + 1}
                        </TableCell>
                        <TableCell>{detailRow.name}</TableCell>

                        <TableCell>{detailRow.count}</TableCell>
                        <TableCell align="right">{detailRow.price}</TableCell>
                        <TableCell align="right">
                          {detailRow.count * detailRow.price}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  const rows = [];

  // Mapping head
  orders.map((o, oIndex) => {
    // console.log(oIndex);
    console.log(o.transaction_id);
    console.log(o.products.length);

    rows.push(
      createData(
        o.transaction_id,
        showStatus(o),
        o.user.name,
        o.user._id,
        o.products.length,
        moment(o.createdAt).fromNow(),
        o.address,
        o.products
      )
    );
  });

  // console.log(rows);

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

        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Transaction ID</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Customer</TableCell>
                <TableCell align="right">Customer ID</TableCell>
                <TableCell align="right">Total Product(s)</TableCell>
                <TableCell align="right">Ordered on</TableCell>
                <TableCell align="right">Delivery Address</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row key={row.name} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DashboardLayout>
    </Box>
  );
};

export default Orders;
