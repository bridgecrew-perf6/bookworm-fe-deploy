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
import moment from "moment";
import { getPurchaseHistory } from "../../apiUser";
import { Box, Typography } from "@mui/material";

export default function Orders() {
  const [history, setHistory] = useState([]);
  const [show, setShow] = useState(5);

  function addShow() {
    setShow(() => show + 5);
  }

  const {
    user,
    user: { _id, name, email, role },
    token,
  } = isAuthenticated();

  // const userId = _id;

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
      <Title>Recent Orders</Title>

      {!history.length ? (
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
              <TableCell>Ship To</TableCell>
              <TableCell align="right">Sale Amount</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {history.slice(0, show).map((h, index) => (
              <TableRow key={index}>
                <TableCell>
                  {moment(h.createdAt).format("DD MMM, YYYY")}
                </TableCell>
                <TableCell>{h.address}</TableCell>
                <TableCell align="right">{`$${h.amount}`}</TableCell>
                <TableCell>{h.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {history.length > show && (
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
