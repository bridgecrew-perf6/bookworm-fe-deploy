import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import {
  getProducts,
  getBraintreeClientToken,
  processPayment,
  createOrder,
} from "./apiCore";
import { emptyCart } from "./cartHelpers";
import ProductCard from "./ProductCard";
import {
  Box,
  Container,
  Typography,
  Button,
  fabClasses,
  Card,
  TextField,
} from "@mui/material";
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

  const handleAddress = (event) => {
    setData({ ...data, address: event.target.value });
  };

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
    // console.log(data);
    // send the nonce (data.instance.requestPaymentMethod) to the server
    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((nonceData) => {
        // console.log(nonceData);
        nonce = nonceData.nonce;
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
            // console.log(response);

            // empty cart and create order
            const createOrderData = {
              products: products,
              transaction_id: response.transaction.id,
              amount: response.transaction.amount,
              address: data.address,
            };
            createOrder(userId, token, createOrderData);
            setData({ ...data, success: response.success });
            emptyCart(() => {
              setRun(!run); // update parent state
              console.log("Payment success and empty cart");
              setData({
                loading: false,
                success: true,
              });
            });
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
  };

  const showDropIn = () => {
    return (
      <Box onBlur={() => setData({ ...data, error: "" })}>
        {data.clientToken !== null && products.length > 0 ? (
          <Box>
            {/* <div className="gorm-group mb-3">
              <label className="text-muted">Delivery address:</label>
              <textarea
                onChange={handleAddress}
                className="form-control"
                value={data.address}
                placeholder="Type your delivery address here..."
              />
            </div> */}

            <DropIn
              options={{
                authorization: data.clientToken,
                paypal: {
                  flow: "vault",
                },
              }}
              onInstance={(instance) => (data.instance = instance)}
            ></DropIn>
            <TextField
              label="Delivery Address"
              variant="outlined"
              onChange={handleAddress}
              value={data.address}
              sx={{ width: "100%", paddingBottom: "20px", marginTop: "20px" }}
              inputProps={{
                style: { fontSize: 14 },
              }}
            />

            <Typography
              sx={{
                // textAlign: "center",
                fontSize: "16px",
                fontWeight: 500,
                paddingBottom: "20px",
              }}
            >
              Total Payment: ${getTotal()}
            </Typography>

            <Button variant="contained" onClick={buy} sx={{ width: "100%" }}>
              Pay
            </Button>
          </Box>
        ) : null}
      </Box>
    );
  };

  const showError = (error) => {
    // console.log(error);
    return <Box sx={{ display: error ? "" : "none" }}>{error}</Box>;
  };

  const showSuccess = (success) => {
    // console.log(success);
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
      <Box>
        <Typography
          variant="h2"
          sx={{
            textAlign: "center",
            fontSize: "20px",
            fontWeight: 500,
            padding: "50px 0",
          }}
        >
          Payment Process
        </Typography>
      </Box>
      <Card
        sx={{
          maxWidth: "50vw",
          marginBottom: "20px",
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;",
        }}
      >
        <Box sx={{ padding: "30px" }}>
          {showLoading(data.loading)}
          {showSuccess(data.success)}
          {showError(data.error)}
          {showCheckout()}
        </Box>
      </Card>
    </Container>
  );
};

export default Checkout;
