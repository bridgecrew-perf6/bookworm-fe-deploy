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
  Card,
  CardContent,
  CardActions,
  Container,
  Grid,
} from "@mui/material";
import { createCategory } from "./apiAdmin";
import { API } from "../core/config";

import DashboardLayout from "../core/DashboardLayout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "./apiAdmin";

function ManageProducts() {
  const { user, token } = isAuthenticated();
  const [products, setProducts] = useState([]);

  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  const destroy = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadProducts();
      }
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const showProductsLength = () => {
    return (
      <Typography sx={{ paddingTop: "20px", paddingBottom: "30px" }}>
        Total Products: {products.length} product(s)
      </Typography>
    );
  };

  return (
    <DashboardLayout title="Manage Products" description={showProductsLength()}>
      <Container maxWidth="sm" sx={{ margin: "auto", minWidth: "500px" }}>
        {products.map((p, i) => (
          <Card
            sx={{
              minWidth: "500px",
              marginBottom: "20px",
              boxShadow:
                "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;",
            }}
            key={i}
          >
            <Grid container sx={{ display: "flex", flexDirection: "row" }}>
              <Grid item xs={4} sx={{ margin: "auto" }}>
                <img
                  src={`${API}/product/photo/${p._id}`}
                  alt={p.name}
                  style={{
                    maxHeight: "100px",
                    maxWidth: "100%",
                    minHeight: "100px",
                    objectFit: "cover",
                    alignItems: "center",
                    display: "block",
                    margin: "auto",
                  }}
                />
              </Grid>
              <Grid item xs={8}>
                <Box sx={{ paddingRight: "20px" }}>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{ fontSize: "16px", textAlign: "left" }}
                    >
                      {p.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        textAlign: "left",
                      }}
                    >
                      {p.description}
                      {/* {product.description.substring(0, 100)} */}
                    </Typography>
                  </CardContent>
                  <CardActions
                    style={{
                      // justifyContent: "left",
                      marginBottom: "10px",
                      marginLeft: "10px",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "right",
                      alignItems: "center",
                      padding: "0 0 20px 0",
                    }}
                  >
                    <Link
                      to={`/product/${p._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button
                        variant="outlined"
                        size="medium"
                        sx={{ marginRight: "10px", fontSize: "12px" }}
                      >
                        View
                      </Button>
                    </Link>

                    <Link
                      to={`/admin/dashboard/products/update/${p._id}`}
                      style={{ textDecoration: "none", margin: 0 }}
                    >
                      <Button
                        variant="contained"
                        size="medium"
                        sx={{ marginRight: "10px", fontSize: "12px" }}
                      >
                        Update
                      </Button>
                    </Link>

                    <Button
                      variant="contained"
                      color="secondary"
                      size="medium"
                      sx={{ marginRight: "10px", fontSize: "12px" }}
                      onClick={() => destroy(p._id)}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Box>
              </Grid>
            </Grid>
          </Card>
        ))}
      </Container>
      <br />
    </DashboardLayout>
  );
}

export default ManageProducts;
