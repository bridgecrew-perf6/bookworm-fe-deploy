import React, { useEffect, useState } from "react";
import moment from "moment";

import { read } from "./apiCore";
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

import Divider from "@mui/material/Divider";

const TypographyFeature = styled("Typography")(() => ({
  fontWeight: 600,
  fontSize: "16px",
  fontFamily: "Lato",
}));

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const productId = useParams().productId;

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
      }
    });
  };

  // console.log(product.category.name);

  useEffect(() => {
    loadSingleProduct(productId);
  }, []);

  return (
    <Container
      maxWidth="md"
      sx={{ display: "flex", flexDirection: "row", marginTop: "100px" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          paddingRight: "40px",
          width: "50%",
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
            label={`Created at ${moment(product.createdAt).fromNow()}`}
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

        <Box sx={{ maxWidth: "400px", display: "flex", marginBottom: "20px" }}>
          <TextField
            size="small"
            type="number"
            value={quantity}
            variant="outlined"
            inputProps={{
              min: 1,
              max: 13,
              step: 1,
            }}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            sx={{ maxWidth: "70px", textAlign: "center", paddingRight: "10px" }}
          />
          <Button variant="contained">Add to cart</Button>
        </Box>
        <Divider sx={{ marginBottom: "20px" }} />

        <Grid container spacing={2} sx={{ alignSelf: "flex-end" }}>
          <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
            <GppGoodIcon fontSize="large" />
            <Box sx={{ marginLeft: "10px" }}>
              <TypographyFeature>60-Days Protection</TypographyFeature>
              <Typography sx={{ fontSize: "14px" }}>
                Money back guarantee
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
            <PaymentIcon fontSize="large" />
            <Box sx={{ marginLeft: "10px" }}>
              <TypographyFeature>Easy Payment</TypographyFeature>
              <Typography sx={{ fontSize: "14px" }}>
                Debit/Credit Cards
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
            <SupportAgentIcon fontSize="large" />
            <Box sx={{ marginLeft: "10px" }}>
              <TypographyFeature>Aftersales Support</TypographyFeature>
              <Typography sx={{ fontSize: "14px" }}>
                24/7 product aftersales support
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
            <LocalShippingIcon fontSize="large" />
            <Box sx={{ marginLeft: "10px" }}>
              <TypographyFeature>Worldwide Shipment</TypographyFeature>
              <Typography sx={{ fontSize: "14px" }}>
                Shipping all around nations
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Product;
