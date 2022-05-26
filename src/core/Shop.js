import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { getCategories } from "./apiCore";
import ProductCheckbox from "./ProductCheckbox";
import { Typography } from "@mui/material";

function Shop() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [myFilters, setMyFilters] = useState({
    filtersData: {
      category: [],
      price: [],
    },
  });

  // Load categories
  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleFilters = (filters, filterBy) => {
    // console.log(filters, filterBy);
    const newFilters = { ...myFilters };
    newFilters.filtersData[filterBy] = filters;
    setMyFilters(newFilters);
  };

  return (
    <Layout title="Shop Page" description="Find your book">
      <Typography variant="h6">Filter by Category</Typography>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            {/* {JSON.stringify(categories)} */}
            <ProductCheckbox
              categories={categories}
              handleFilters={(filters) => handleFilters(filters, "category")}
            />
          </Grid>
          <Grid item xs={8}>
            {JSON.stringify(myFilters)}
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
}

export default Shop;
