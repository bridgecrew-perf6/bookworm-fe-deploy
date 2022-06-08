import React, { useEffect, useState } from "react";
import moment from "moment";

import { read, listRelated } from "./apiCore";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  TextField,
  Container,
  Grid,
} from "@mui/material";
import ShowImage from "./ShowImage";
import GppGoodIcon from "@mui/icons-material/GppGood";
import PaymentIcon from "@mui/icons-material/Payment";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { styled } from "@mui/material/styles";
import { Chip, Stack } from "@mui/material";
import ProductCard from "./ProductCard";
import { isAuthenticated } from "../auth";
import Divider from "@mui/material/Divider";
import { addItem } from "./cartHelpers";

const styleFeature = { fontWeight: 600, fontSize: "16px", fontFamily: "Lato" };

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [idChange, setIdChange] = useState("");

  const productId = useParams().productId;

  const {
    user: { role },
  } = isAuthenticated();
  console.log(role);

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        // fetch related product
        listRelated(data._id).then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProduct(data);
          }
        });
      }
    });
  };

  useEffect(() => {
    setIdChange(productId);
    loadSingleProduct(productId);
  }, [productId]);

  const addToCart = () => {
    addItem(product, quantity, () => {
      console.log("success");
    });
  };

  return (
    <Container
      maxWidth="md"
      sx={{ display: "flex", flexDirection: "column", marginTop: "100px" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            paddingRight: "40px",
            width: "60%",
          }}
        >
          <ShowImage item={product} url="product" />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: "35px",
              textTransform: "uppercase",
              fontWeight: "700",
              marginBottom: "10px",
            }}
          >
            {product.name}
          </Typography>
          <Stack direction="row" spacing={1}>
            <Chip
              label={`Created ${moment(product.createdAt).fromNow()}`}
              size="small"
              sx={{ padding: "0 10px", marginBottom: "20px" }}
            />
            <Chip
              label={`Category: ${
                product.category ? product.category.name : "None"
              }`}
              size="small"
              sx={{ padding: "0 10px", marginBottom: "20px" }}
            />
          </Stack>
          <Typography
            variant="h2"
            sx={{ fontSize: "20px", marginBottom: "10px" }}
          >
            {product.description}
          </Typography>

          <Typography
            variant="h2"
            sx={{ fontSize: "20px", fontWeight: "500", marginBottom: "20px" }}
          >
            ${product.price}
          </Typography>

          <Typography
            sx={{ fontSize: "20px", fontWeight: "500", marginBottom: "20px" }}
          >
            Shipment to Estimated delivery
          </Typography>

          <Stack direction="row" spacing={1}>
            {product.quantity ? (
              <Chip
                label={`In stock: ${product.quantity}`}
                color="primary"
                size="small"
                sx={{ padding: "0 10px", marginBottom: "20px" }}
              />
            ) : (
              <Chip
                label="Out of stock"
                size="small"
                sx={{ padding: "0 10px", marginBottom: "20px" }}
              />
            )}
          </Stack>

          {role == 0 && (
            <Box
              sx={{ maxWidth: "400px", display: "flex", marginBottom: "20px" }}
            >
              <TextField
                size="small"
                type="number"
                value={quantity ? quantity : 1}
                variant="outlined"
                inputProps={{
                  min: 1,
                  max: product.quantity,
                  step: 1,
                }}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                sx={{
                  maxWidth: "70px",
                  textAlign: "center",
                  paddingRight: "10px",
                }}
              />
              <Button variant="contained" onClick={addToCart}>
                Add to cart
              </Button>
            </Box>
          )}
          <Divider sx={{ marginBottom: "20px" }} />

          <Grid container spacing={2} sx={{ alignSelf: "flex-end" }}>
            <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
              <GppGoodIcon fontSize="large" />
              <Box sx={{ marginLeft: "10px" }}>
                <Typography sx={styleFeature}>60-Days Protection</Typography>
                <Typography sx={{ fontSize: "14px" }}>
                  Money back guarantee
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
              <PaymentIcon fontSize="large" />
              <Box sx={{ marginLeft: "10px" }}>
                <Typography sx={styleFeature}>Easy Payment</Typography>
                <Typography sx={{ fontSize: "14px" }}>
                  Debit/Credit Cards
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
              <SupportAgentIcon fontSize="large" />
              <Box sx={{ marginLeft: "10px" }}>
                <Typography sx={styleFeature}>Aftersales Support</Typography>
                <Typography sx={{ fontSize: "14px" }}>
                  24/7 product aftersales support
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
              <LocalShippingIcon fontSize="large" />
              <Box sx={{ marginLeft: "10px" }}>
                <Typography sx={styleFeature}>Worldwide Shipment</Typography>
                <Typography sx={{ fontSize: "14px" }}>
                  Shipping all around nations
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Divider sx={{ marginBottom: "30px", marginTop: "60px" }}>
        <Chip
          sx={{
            fontSize: "20px",
            padding: "25px 10px",
            borderRadius: "50px",
          }}
          label="Related product"
        />
      </Divider>
      <Grid
        container
        spacing={4}
        sx={{ justifyContent: "center", marginBottom: "30px" }}
      >
        {relatedProduct.map((p, i) => {
          return (
            <Grid key={i} item xs={4}>
              <ProductCard product={p}></ProductCard>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Product;
