import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCart } from "./cartHelpers";
import ProductCard from "./ProductCard";
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
      <div>
        <h2>Your cart has {`${items.length} item(s).`}</h2>
        {items.map((product, i) => {
          return (
            <ProductCard
              key={i}
              product={product}
              cartUpdate={true}
              showRemoveProductButton={true}
              setRun={setRun}
              run={run}
            />
          );
        })}
      </div>
    );
  };

  const noItemsMessage = () => {
    return <Typography>Your cart is empty. Continue shopping.</Typography>;
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        {items.length > 0 ? showItems(items) : noItemsMessage()}
      </Grid>
      <Grid item xs={6}>
        <Checkout products={items} setRun={setRun} run={run} />
      </Grid>
    </Grid>
  );
};

export default Cart;
