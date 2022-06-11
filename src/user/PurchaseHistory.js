import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
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
import { isAuthenticated } from "../auth";
import DashboardLayout from "../core/DashboardLayout";
import moment from "moment";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { getPurchaseHistory } from "./apiUser";

const PurchaseHistory = () => {
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

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
      // <div>Ok</div>
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

          <TableCell align="center">{row.products.length}</TableCell>
          <TableCell align="right">$ {row.amount}</TableCell>
          <TableCell align="center">
            {moment(row.createdAt).fromNow()}
          </TableCell>
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
                  Purchase Details
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
                    {row.products.map((detailRow, i) => (
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

  const showPurchaseLength = () => {
    if (history.length > 0) {
      return (
        <Typography sx={{ paddingTop: "20px", paddingBottom: "30px" }}>
          Total Purchase: {history.length} purchase(s)
        </Typography>
      );
    } else {
      return (
        <Typography sx={{ paddingTop: "20px", paddingBottom: "30px" }}>
          No purchase found!
        </Typography>
      );
    }
  };

  return (
    <Box sx={{ margin: "auto", textAlign: "center" }}>
      <DashboardLayout
        title="Purchase History"
        description={showPurchaseLength()}
      >
        {/* {showOrdersLength()} */}

        {history.length ? (
          <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell align="center">Transaction ID</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Total Product(s)</TableCell>
                  {/* <TableCell align="center">Customer ID</TableCell> */}
                  <TableCell align="right">Total Price</TableCell>
                  <TableCell align="center">Ordered On</TableCell>
                  <TableCell align="center">Delivery Address</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {history.map((row, index) => (
                  <Row key={index} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          ""
        )}
      </DashboardLayout>
    </Box>
  );
};

export default PurchaseHistory;
