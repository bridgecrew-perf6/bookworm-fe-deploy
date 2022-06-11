import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import { useState, useEffect } from "react";
import { isAuthenticated } from "../../../auth";
import moment from "moment";
import { getPurchaseHistory } from "../../apiUser";

export default function Deposits() {
  const {
    user,
    user: { _id, name, email, role },
    token,
  } = isAuthenticated();

  // const userId = _id;

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

  let getTotal = () => {
    let totalSales = 0;
    for (let i = 0; i < history.length; i++) {
      totalSales += history[i].amount;
    }
    return totalSales.toFixed(2);
  };

  return (
    <React.Fragment>
      <Title>Total Purchase</Title>
      <Typography component="p" variant="h4">
        ${getTotal()}
      </Typography>
      <Typography color="text.secondary">
        per {moment(new Date()).format("DD MMM, YYYY")}
      </Typography>
    </React.Fragment>
  );
}
