import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import {
  getProducts,
  getBraintreeClientToken,
  processPayment,
} from "./apiCore";
import { emptyCart } from "./cartHelpers";
import ProductCard from "./ProductCard";
import { Box, Container, Typography, Button, fabClasses } from "@mui/material";
import { isAuthenticated } from "../auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";

const Checkout = ({ products, setRun = (f) => f, run = undefined }) => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
    address: "",
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;

  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then((data) => {
      if (data.error) {
        setData({ ...data, error: data.error });
      } else {
        setData({ clientToken: data.clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const showCheckout = () => {
    return (
      <Box>
        {isAuthenticated() ? (
          showDropIn()
        ) : (
          <Button onClick={() => navigate("/signin", { replace: true })}>
            Sign In
          </Button>
        )}
      </Box>
    );
  };

  const buy = () => {
    setData({ ...data, loading: true });
    // send the nonce (data.instance.requestPaymentMethod) to the server
    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((data) => {
        // console.log(data);
        nonce = data.nonce;
        // once you have nonce (card type, card number) send nonce as 'paymentMethodNonce' and also total to be charged
        // console.log(
        //   "send nonce and total to process: ",
        //   nonce,
        //   getTotal(products)
        // );
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products),
        };

        processPayment(userId, token, paymentData)
          .then((response) => {
            console.log(response);
            setData({ ...data, success: response.success });
            emptyCart(() => {
              setRun(!run); // update parent state
              console.log("Payment success and empty cart");
              setData({
                loading: false,
                success: true,
              });
            });
            // empty cart and create order
          })
          .catch((error) => {
            console.log(error);
            setData({ loading: false });
          });
      })
      .catch((error) => {
        // console.log("dropin error: ", error);
        setData({ ...data, error: error.message });
      });
    // getNonce();
  };

  const showDropIn = () => {
    return (
      <Box onBlur={() => setData({ ...data, error: "" })}>
        {data.clientToken !== null && products.length > 0 ? (
          <Box>
            <DropIn
              options={{
                authorization: data.clientToken,
                paypal: {
                  flow: "vault",
                },
              }}
              onInstance={(instance) => (data.instance = instance)}
            ></DropIn>
            <Button variant="contained" onClick={buy}>
              Pay
            </Button>
          </Box>
        ) : null}
      </Box>
    );
  };

  const showError = (error) => {
    console.log(error);
    return <Box sx={{ display: error ? "" : "none" }}>{error}</Box>;
  };

  const showSuccess = (success) => {
    console.log(success);
    return (
      <Box sx={{ display: success ? "" : "none" }}>
        Thanks! Your payment was successful.
      </Box>
    );
  };

  const showLoading = (loading) => {
    return <Box sx={{ display: loading ? "" : "none" }}>Loading...</Box>;
  };

  return (
    // <div>{JSON.stringify(products)}</div>
    <Container>
      <Box>Total: ${getTotal()}</Box>
      {showLoading(data.loading)}
      {showSuccess(data.success)}
      {showError(data.error)}
      {showCheckout()}
    </Container>
  );
};

export default Checkout;
