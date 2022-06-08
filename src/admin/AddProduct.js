import React, { useState, useEffect } from "react";
import {
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  TextField,
  Button,
  Modal,
  Box,
  Typography,
  CircularProgress,
  IconButton,
  Select,
  MenuItem,
  makeStyles,
  Paper,
} from "@mui/material";
import MuiTextField from "@mui/material/TextField";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import DashboardLayout from "../core/DashboardLayout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createProduct, getCategories } from "./apiAdmin";

import { styled } from "@mui/material/styles";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const InputPhoto = styled("input")({
  display: "none",
});

const TextFieldCustom = styled(MuiTextField, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiTextField-root": {
    fontFamily: "Lato",
  },
}));

function AddProduct() {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    loading: false,
    error: false,
    createdProduct: "",
    redirectToProfile: false,
    formData: "",
    success: false,
  });

  // Load categories
  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const { user, token } = isAuthenticated();
  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    photo,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
    success,
  } = values;

  const closeModal = () => {
    setValues({ ...values, error: false, success: false });
  };

  // HOC => function returning another function
  const changeHandler = (name) => (event) => {
    console.log(event);
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, error: false, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setValues({ ...values, error: false, loading: true });
    // Make request to API to create product
    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          category: "",
          shipping: "",
          quantity: "",
          photo: "",
          loading: false,
          error: false,
          createdProduct: data.name,
        });
      }
    });
  };

  const showSpinner = () => {
    return (
      <Modal
        open={loading}
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
            {error}
          </Typography>
        </Box>
      </Modal>
    );
  };

  const showSuccess = () => {
    return (
      <Modal
        open={success}
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
            Category '{name}' is created successfully.
          </Typography>
        </Box>
      </Modal>
    );
  };

  const newProductForm = () => {
    return (
      <FormControl sx={{ minWidth: "500px" }} variant="outlined">
        <FormControl>
          <TextField
            // error={name ? false : true}
            inputProps={{ style: { background: "white" } }}
            id="name"
            label="Product Name"
            type="text"
            // helperText="Incorrect entry."
            style={{
              marginTop: "25px",
            }}
            onChange={changeHandler("name")}
            value={name}
          />
        </FormControl>
        <TextField
          // error={name ? false : true}
          inputProps={{ style: { background: "white" } }}
          id="description"
          label="Product Description"
          type="text"
          // helperText="Incorrect entry."
          style={{
            marginTop: "25px",
          }}
          onChange={changeHandler("description")}
          value={description}
        />

        <TextField
          // error={name ? false : true}
          inputProps={{ style: { background: "white" } }}
          id="price"
          label="Product Price"
          type="number"
          // helperText="Incorrect entry."
          style={{
            marginTop: "25px",
          }}
          onChange={changeHandler("price")}
          value={price}
        />

        <Box sx={{ minWidth: 120, marginTop: "25px" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Category"
              onChange={changeHandler("category")}
              sx={{ backgroundColor: "white" }}
            >
              {categories &&
                categories.map((c, i) => {
                  return (
                    <MenuItem key={i} value={c._id}>
                      {c.name}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </Box>

        <TextField
          // error={name ? false : true}
          // component={Paper}
          id="quantity"
          label="Product Quantity"
          type="number"
          // helperText="Incorrect entry."
          style={{
            marginTop: "25px",
          }}
          inputProps={{ style: { background: "white" } }}
          onChange={changeHandler("quantity")}
          value={quantity}
        />

        <Box sx={{ minWidth: 120, marginTop: "25px" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Shipping</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={shipping}
              label="Shipping"
              onChange={changeHandler("shipping")}
              sx={{ backgroundColor: "white" }}
            >
              <MenuItem value={0}>No</MenuItem>
              <MenuItem value={1}>Yes</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <label
          htmlFor="photo"
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            marginTop: "25px",
          }}
        >
          <InputPhoto
            accept="image/*"
            name="photo"
            id="photo"
            type="file"
            onChange={changeHandler("photo")}
          />
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <PhotoCamera />
          </IconButton>
          <Button variant="outlined" size="medium" component="span">
            Select image
          </Button>
          {photo && (
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography sx={{ marginLeft: "20px" }}>
                Image selected
              </Typography>
              <CheckCircleOutlineIcon sx={{ marginLeft: "5px" }} />
            </Box>
          )}
        </label>

        <Button
          variant="contained"
          style={{
            marginTop: "25px",
          }}
          onClick={submitHandler}
        >
          Create Product
        </Button>
      </FormControl>
    );
  };
  return (
    <Box sx={{ margin: "auto", textAlign: "center" }}>
      <DashboardLayout title="Create Product" description="">
        {showSpinner()}
        {showError()}
        {showSuccess()}
        {newProductForm()}
      </DashboardLayout>
    </Box>
  );
}

export default AddProduct;
