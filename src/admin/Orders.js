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
      return (
        <Typography sx={{ paddingTop: "20px", paddingBottom: "30px" }}>
          Total Orders: {orders.length} order(s)
        </Typography>
      );
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
    // console.log(o);
    return (
      <Box>
        {/* <Typography>{o.status}</Typography> */}
        <FormControl fullWidth>
          {/* <InputLabel id="status">Status</InputLabel> */}
          <Select
            id="status"
            // value={statusValues}
            value={o.status}
            // label="Status"
            onChange={(e) => handleStatusChange(e, o._id)}
            sx={{ textAlign: "center", height: "2rem" }}
          >
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
    key,
    transaction_id,
    status,
    customer,
    // customer_id,
    total,
    date,
    address,
    detail
  ) {
    return {
      key,
      transaction_id,
      status,
      customer,
      // customer_id,
      total,
      date,
      address,
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
          <TableCell align="center" component="th" scope="row">
            {row.transaction_id}
          </TableCell>
          <TableCell align="center">{row.status}</TableCell>
          {/* <TableCell align="center">{row.customer_id}</TableCell> */}
          <TableCell align="center">{row.customer}</TableCell>
          <TableCell align="center">{row.total}</TableCell>
          <TableCell align="center">{row.date}</TableCell>
          <TableCell align="center">{row.address}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1, marginBottom: "20px" }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  component="div"
                  sx={{
                    fontSize: "18px",
                    fontWeight: "600",
                    textAlign: "center",
                  }}
                >
                  Order Details
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">No.</TableCell>
                      <TableCell align="center">Title</TableCell>
                      <TableCell align="center">Book ID</TableCell>
                      <TableCell align="center">Quantity</TableCell>
                      <TableCell align="center">Price ($)</TableCell>
                      <TableCell align="center">Total price ($)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.detail.map((detailRow, i) => (
                      <TableRow key={i}>
                        <TableCell align="center" component="th" scope="row">
                          {i + 1}
                        </TableCell>
                        <TableCell align="center">{detailRow.name}</TableCell>
                        <TableCell align="center">{detailRow._id}</TableCell>

                        <TableCell align="center">{detailRow.count}</TableCell>
                        <TableCell align="center">{detailRow.price}</TableCell>
                        <TableCell align="center">
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
    rows.push(
      createData(
        oIndex,
        o.transaction_id,
        showStatus(o),
        o.user.name,
        // o.user._id,
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
      <DashboardLayout title="Order List" description={showOrdersLength()}>
        {/* {showOrdersLength()} */}

        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell align="center">Transaction ID</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Customer</TableCell>
                {/* <TableCell align="center">Customer ID</TableCell> */}
                <TableCell align="center">Total Product(s)</TableCell>
                <TableCell align="center">Ordered On</TableCell>
                <TableCell align="center">Delivery Address</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <Row key={index} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DashboardLayout>
    </Box>
  );
};

export default Orders;
