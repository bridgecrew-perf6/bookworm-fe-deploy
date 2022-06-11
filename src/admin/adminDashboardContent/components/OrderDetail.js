import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import { useState, useEffect } from "react";
import { isAuthenticated } from "../../../auth";
import { listOrders } from "../../apiAdmin";
import moment from "moment";

export default function OrderDetail() {
  const [orders, setOrders] = useState([]);

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

  return (
    <React.Fragment>
      <Title>Total Orders</Title>
      <Typography component="p" variant="h4">
        {orders.length} Orders
      </Typography>
      <Typography color="text.secondary">
        per {moment(new Date()).format("DD MMM, YYYY")}
      </Typography>
    </React.Fragment>
  );
}
