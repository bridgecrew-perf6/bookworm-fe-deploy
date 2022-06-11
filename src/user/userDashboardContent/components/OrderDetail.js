import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import { useState, useEffect } from "react";
import { isAuthenticated } from "../../../auth";
import { getPurchaseHistory } from "../../apiUser";
import moment from "moment";

export default function OrderDetail() {
  const {
    user: { _id },
    token,
  } = isAuthenticated();

  const [history, setHistory] = useState([]);

  const init = (userId, token) => {
    getPurchaseHistory(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setHistory(data);
      }
    });
  };

  useEffect(() => {
    init(_id, token);
  }, []);

  return (
    <React.Fragment>
      <Title>Total Transaction(s)</Title>
      <Typography component="p" variant="h4">
        {history.length} Transaction(s)
      </Typography>
      <Typography color="text.secondary">
        per {moment(new Date()).format("DD MMM, YYYY")}
      </Typography>
    </React.Fragment>
  );
}
