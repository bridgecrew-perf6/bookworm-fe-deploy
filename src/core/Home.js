import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import ProductCard from "./ProductCard";
import { Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Search from "./Search";

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) + :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

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
      <CssBaseline />
      <Container maxWidth="md" sx={{ marginBottom: "100px" }}>
        <Divider sx={{ marginBottom: "30px" }}>
          <Chip
            sx={{
              fontSize: "20px",
              padding: "25px 10px",
              borderRadius: "50px",
            }}
            label="Book Search"
          />
        </Divider>
        <Search></Search>
        {/* {JSON.stringify(productsBySell)} */}
        <Divider sx={{ marginBottom: "30px" }}>
          <Chip
            sx={{
              fontSize: "20px",
              padding: "25px 10px",
              borderRadius: "50px",
            }}
            label="New Arrival"
          />
        </Divider>
        <Grid container spacing={4}>
          {productsByArrival.map((product, i) => (
            <Grid item xs={4}>
              <ProductCard key={i} product={product} />
            </Grid>
          ))}
        </Grid>

        {/* {JSON.stringify(productsByArrival)} */}
        <Divider sx={{ marginTop: "100px", marginBottom: "30px" }}>
          <Chip
            sx={{
              fontSize: "20px",
              padding: "25px 10px",
              borderRadius: "50px",
            }}
            label="Best Seller"
          />
        </Divider>
        <Grid container spacing={4}>
          {productsBySell.map((product, i) => (
            <Grid item xs={4}>
              <ProductCard key={i} product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Layout>
  );
}

export default Home;
