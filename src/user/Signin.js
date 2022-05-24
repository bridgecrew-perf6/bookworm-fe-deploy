import { useState } from "react";
import { Navigate } from "react-router-dom";
import {
  FormControl,
  TextField,
  Button,
  Modal,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import Layout from "../core/Layout";
import { signin, authenticate, isAuthenticated } from "../auth";

function Signin() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    isLoading: false,
    error: "",
    redirectToReferrer: false,
  });

  const closeModal = () => {
    setValues({ ...values, error: "", success: false });
  };

  const changeHandler = (property) => (event) => {
    setValues({ ...values, error: false, [property]: event.target.value });
  };

  const { email, password, isLoading, error, redirectToReferrer } = values;
  const { user } = isAuthenticated();

  const submitHandler = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, isLoading: true });
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          isLoading: false,
        });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            isLoading: false,
            redirectToReferrer: true,
          });
        });
      }
    });
  };

  const signInForm = () => {
    return (
      <FormControl
        size="small"
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "45px",
          width: "500px",
          justifyContent: "center",
          margin: "auto",
        }}
      >
        <TextField
          // error={false}
          id="email"
          label="Email"
          type="email"
          // helperText="Incorrect entry."
          placeholder="Input your email..."
          style={{
            marginTop: "25px",
          }}
          onChange={changeHandler("email")}
          value={email}
        />
        <TextField
          // error={false}
          id="password"
          label="Password"
          type="password"
          // helperText="Incorrect entry."
          placeholder="Input your password..."
          style={{
            marginTop: "25px",
          }}
          onChange={changeHandler("password")}
          value={password}
        />
        <Button
          variant="contained"
          style={{
            marginTop: "25px",
          }}
          onClick={submitHandler}
        >
          Submit
        </Button>
      </FormControl>
    );
  };

  const showSpinner = () => {
    return (
      <Modal
        open={isLoading}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            display: "flex",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CircularProgress />
        </Box>
      </Modal>
    );
  };

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role == 1) {
        return <Navigate to="/admin/dashboard" replace />;
      } else {
        return <Navigate to="/user/dashboard" replace />;
      }
    }
    if (isAuthenticated()) {
      return <Navigate to="/" replace />;
    }
  };

  const showError = () => {
    return (
      <Modal
        open={error}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Register Error
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {values.error}
          </Typography>
        </Box>
      </Modal>
    );
  };

  return (
    <Layout title="Sign In" description="Sign in to Bookworm">
      {showSpinner()}
      {redirectUser()}
      {showError()}
      {signInForm()}
      {showSpinner()}
    </Layout>
  );
}

export default Signin;
