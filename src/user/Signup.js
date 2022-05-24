import { useState } from "react";
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
import { signup } from "../auth";

function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    isLoading: false,
    error: "",
    success: false,
  });

  const closeModal = () => {
    setValues({ ...values, error: "", success: false });
  };

  const changeHandler = (property) => (event) => {
    setValues({ ...values, error: false, [property]: event.target.value });
  };

  const { name, email, password, isLoading, success, error } = values;

  const submitHandler = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, isLoading: true });
    // Kita buat parameter sebagai object
    signup({ name, email, password }).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          success: false,
          isLoading: false,
        });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          success: true,
          isLoading: false,
        });
      }
    });
  };

  const signUpForm = () => {
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
          id="username"
          label="Username"
          // helperText="Incorrect entry."
          placeholder="Input your username..."
          onChange={changeHandler("name")}
          value={name}
        />
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
        open={values.isLoading}
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

  const showError = () => {
    return (
      <Modal
        open={values.error}
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

  const showSuccess = () => {
    return (
      <Modal
        open={values.success}
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
            Register success
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Account is registered successfully.
          </Typography>
        </Box>
      </Modal>
    );
  };

  return (
    <Layout title="Sign Up" description="Register to Bookworm">
      {showSpinner()}
      {showError()}
      {showSuccess()}
      {signUpForm()}
    </Layout>
  );
}

export default Signup;
