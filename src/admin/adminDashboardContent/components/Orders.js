import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { useState, useEffect } from "react";
import { isAuthenticated } from "../../../auth";
import { listOrders } from "../../apiAdmin";
import moment from "moment";
import { Box, Typography } from "@mui/material";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [show, setShow] = useState(5);

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

  useEffect(() => {
    loadOrders();
  }, []);

  // console.log(orders);
  function addShow() {
    setShow(() => show + 5);
  }

  return (
    <React.Fragment>
      <Title>Recent Orders</Title>

      {!orders.length ? (
        <Box>
          <Typography
            sx={{ fontWeight: "500", textAlign: "center", fontSize: "20px" }}
          >
            No orders yet!
          </Typography>
        </Box>
      ) : (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Ship To</TableCell>
              <TableCell align="right">Sale Amount</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.slice(0, show).map((order, index) => (
              <TableRow key={index}>
                <TableCell>
                  {moment(order.createdAt).format("DD MMM, YYYY")}
                </TableCell>
                <TableCell>{order.user.name}</TableCell>
                <TableCell>{order.address}</TableCell>
                <TableCell align="right">{`$${order.amount}`}</TableCell>
                <TableCell>{order.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {orders.length > show && (
        <Link
          color="primary"
          onClick={addShow}
          sx={{ mt: 3, cursor: "pointer" }}
        >
          See more orders
        </Link>
      )}
    </React.Fragment>
  );
}
