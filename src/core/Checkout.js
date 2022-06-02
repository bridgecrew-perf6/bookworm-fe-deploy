import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import ProductCard from "./ProductCard";
import { Box, Container, Typography, Button } from "@mui/material";
import { isAuthenticated } from "../auth";
import { useNavigate } from "react-router-dom";

const Checkout = ({ products, setRun = (f) => f, run = undefined }) => {
  const navigate = useNavigate();

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const showCheckout = () => {
    return (
      <Box>
        {isAuthenticated() ? (
          <Button>Checkout</Button>
        ) : (
          <Button onClick={() => navigate("/signin", { replace: true })}>
            Sign In
          </Button>
        )}
      </Box>
    );
  };
  return (
    // <div>{JSON.stringify(products)}</div>
    <Container>
      <Box>Total: ${getTotal()}</Box>
      {showCheckout()}
    </Container>
  );
};

export default Checkout;
