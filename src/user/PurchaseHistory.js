import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { isAuthenticated } from "../auth";
import { read, update, updateUser } from "./apiUser";
import { useState, useEffect } from "react";
import DashboardLayout from "../core/DashboardLayout";
import { TextField, Button } from "@mui/material";
import { Navigate } from "react-router-dom";
import { getPurchaseHistory } from "./apiUser";
import moment from "moment";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function PurchaseHistory() {
  const {
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

  console.log(history);

  const purchaseHistory = (history) => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Purchase history</h3>
        <ul className="list-group">
          <li className="list-group-item">
            {history.map((h, i) => {
              return (
                <div>
                  <hr />
                  {h.products.map((p, i) => {
                    return (
                      <div key={i}>
                        <h6>Product name: {p.name}</h6>
                        <h6>Product price: ${p.price}</h6>
                        <h6>Purchased date: {moment(h.createdAt).fromNow()}</h6>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Box sx={{ margin: "auto", textAlign: "center" }}>
      <DashboardLayout title="Update Profile" description="">
        {purchaseHistory(history)}
      </DashboardLayout>
    </Box>
  );
}

export default PurchaseHistory;
