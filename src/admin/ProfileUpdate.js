import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { isAuthenticated } from "../auth";
import { read, update, updateAdmin } from "./apiAdmin";
import { useState, useEffect } from "react";
import DashboardLayout from "../core/DashboardLayout";
import { TextField, Button } from "@mui/material";
import { Navigate } from "react-router-dom";

function ProfileUpdate() {
  const {
    user: { _id },
    token,
  } = isAuthenticated();

  const userId = _id;

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    role: 1,
    error: "",
    success: false,
  });

  const { name, email, password, role, error, success } = values;

  const init = (userId) => {
    read(userId, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: true });
      } else {
        setValues({ ...values, name: data.name, email: data.email });
      }
    });
  };

  useEffect(() => {
    init(userId);
  }, []);

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    update(userId, token, { name, email, password, role }).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        updateAdmin(data, () => {
          setValues({
            ...values,
            name: data.name,
            email: data.email,
            success: true,
            role: 1,
          });
        });
      }
    });
  };

  const redirectUser = (success) => {
    if (success) {
      return <Navigate to="/admin/dashboard/profile" replace />;
    }
  };

  const profileUpdate = (name, email, password) => {
    return (
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "20px",
          "& > :not(style)": { m: 1, width: "400px" },
        }}
      >
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          onChange={handleChange("name")}
          value={name}
          inputProps={{ style: { background: "white" } }}
        />{" "}
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          onChange={handleChange("email")}
          value={email}
          inputProps={{ style: { background: "white" } }}
        />{" "}
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          onChange={handleChange("password")}
          value={password}
          inputProps={{ style: { background: "white" } }}
        />
        <Button
          variant="contained"
          onClick={clickSubmit}
          sx={{ width: "100%" }}
        >
          Submit
        </Button>
      </Box>
    );
  };

  return (
    <Box sx={{ margin: "auto", textAlign: "center" }}>
      <DashboardLayout title="Update Profile" description="">
        {/* {JSON.stringify(values)} */}
        {profileUpdate(name, email, password)}
        {redirectUser(success)}
      </DashboardLayout>
    </Box>
  );
}

export default ProfileUpdate;
