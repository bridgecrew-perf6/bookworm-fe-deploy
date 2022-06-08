import { Box, Container, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCart } from "./cartHelpers";
import CartProducts from "./CartProducts";
// import Checkout from './Checkout';
import Grid from "@mui/material/Grid";
import Checkout from "./Checkout";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItems = (items) => {
    return (
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
          Your cart has {`${items.length} item(s).`}
        </Typography>
        {items.map((product, i) => {
          return (
            <CartProducts
              key={i}
              product={product}
              cartUpdate={true}
              showRemoveProductButton={true}
              setRun={setRun}
              run={run}
            />
          );
        })}
      </Box>
    );
  };

  const noItemsMessage = () => {
    return (
      <Typography
        variant="h5"
        sx={{ margin: "auto", textAlign: "center", marginTop: "100px" }}
      >
        Your cart is empty. <Link to="/shop">Continue shopping</Link>.
      </Typography>
    );
  };

  return (
    <Container maxWidth="lg">
      {items.length > 0 ? (
        <Grid container spacing={2}>
          <Grid item xs={6}>
            {items.length > 0 ? showItems(items) : noItemsMessage()}
          </Grid>
          <Grid item xs={6}>
            <Checkout products={items} setRun={setRun} run={run} />
          </Grid>
        </Grid>
      ) : (
        noItemsMessage()
      )}
    </Container>
  );
};

export default Cart;
