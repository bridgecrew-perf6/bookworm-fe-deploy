import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { getCategories } from "./apiCore";
import ProductCheckbox from "./ProductCheckbox";
import { Typography } from "@mui/material";
import { prices } from "./fixedPrices";
import ProductRadio from "./ProductRadio";

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
    if (filterBy == "price") {
      let priceValues = handlePrice(filters);
      newFilters.filtersData["price"] = priceValues;
    }
    setMyFilters(newFilters);
  };

  const handlePrice = (value) => {
    const data = prices;
    let arrayFilter = [];
    for (let key in data) {
      if (data[key]._id == parseInt(value)) {
        arrayFilter = data[key].array;
      }
    }
    return arrayFilter;
  };

  return (
    <Layout title="Shop Page" description="Find your book">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography variant="h6">Filter by Category</Typography>
            {/* {JSON.stringify(categories)} */}
            <ProductCheckbox
              categories={categories}
              handleFilters={(filters) => handleFilters(filters, "category")}
            />
            <Typography variant="h6">Filter by Price</Typography>

            <ProductRadio
              prices={prices}
              handleFilters={(filters) => handleFilters(filters, "price")}
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
