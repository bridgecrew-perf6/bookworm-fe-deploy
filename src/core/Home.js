import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import ProductCard from "./ProductCard";
import { Typography } from "@mui/material";

function Home() {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts("createdAt").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  // Saat mount
  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  console.log(productsByArrival);
  // console.log(productsBySell);

  return (
    <Layout title="Homepage" description="Node React E-commerce App">
      {/* {JSON.stringify(productsBySell)} */}
      <Typography variant="h4">New Arrival</Typography>
      {productsByArrival.map((product, i) => (
        <ProductCard key={i} product={product} />
      ))}
      <hr />
      {/* {JSON.stringify(productsByArrival)} */}
      <Typography variant="h4">Best Seller</Typography>
      {productsBySell.map((product, i) => (
        <ProductCard key={i} product={product} />
      ))}
    </Layout>
  );
}

export default Home;
