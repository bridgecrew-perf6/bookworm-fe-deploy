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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

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
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;

  const init = (userId) => {
    console.log(userId);
    read(userId, token).then((data) => {
      console.log(data);
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
    update(userId, token, { name, email, password }).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        updateUser(data, () => {
          setValues({
            ...values,
            name: data.name,
            email: data.email,
            success: true,
          });
        });
      }
    });
  };

  const redirectUser = (success) => {
    if (success) {
      return <Navigate to="/user/dashboard/profile" replace />;
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
          "& > :not(style)": { m: 1, width: "400px" },
        }}
      >
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          onChange={handleChange("name")}
          value={name}
        />{" "}
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          onChange={handleChange("email")}
          value={email}
        />{" "}
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          onChange={handleChange("password")}
          value={password}
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
        {JSON.stringify(values)}
        {profileUpdate(name, email, password)}
        {redirectUser(success)}
      </DashboardLayout>
    </Box>
  );
}

export default ProfileUpdate;
