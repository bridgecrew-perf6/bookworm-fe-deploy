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
import BookIcon from "@mui/icons-material/Book";
import { isAuthenticated } from "../auth";

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
  const [role, setRole] = useState(0);

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

  // let role = 0;
  // Saat mount
  useEffect(() => {
    if (isAuthenticated().user) {
      const { user } = isAuthenticated();
      setRole(user.role);
    }
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <Layout
      title="Homepage"
      description="One-Stop Shop to Fulfill Your Daily Read"
    >
      <CssBaseline />
      <Box sx={{ width: "100%", height: "250px", position: "relative" }}>
        <img
          src="bannerBook.jpg"
          alt="banner"
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            marginBottom: "40px",
            filter: "grayscale(80%) opacity(50%)",
            borderRadius: "40px  0 40px 0",
          }}
        />
        <Typography
          variant="h5"
          sx={{
            position: "absolute",
            color: "white",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            padding: "10px 20px",
            borderRadius: "20px",
          }}
        >
          Let's find your book!
        </Typography>
      </Box>
      <Container maxWidth="md" sx={{ marginBottom: "100px" }}>
        <Divider sx={{ marginBottom: "30px", marginTop: "40px" }}>
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
            <Grid key={i} item xs={4}>
              <ProductCard
                product={product}
                showAddToCartButton={
                  isAuthenticated().user && role == 0 ? true : false
                }
              />
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
            <Grid key={i} item xs={4}>
              <ProductCard
                product={product}
                showAddToCartButton={
                  isAuthenticated().user && role == 0 ? true : false
                }
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Layout>
  );
}

export default Home;
