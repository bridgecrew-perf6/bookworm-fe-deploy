import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { getCategories, getFilteredProducts } from "./apiCore";
import ProductCheckbox from "./ProductCheckbox";
import { Typography, Button } from "@mui/material";
import { prices } from "./fixedPrices";
import ProductRadio from "./ProductRadio";
import ProductCard from "./ProductCard";

function Shop() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);
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

  const loadFilteredResults = (newFilters) => {
    // console.log(newFilters);
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data.data);
        setSize(data.size);
        setSkip(0);
      }
    });
  };

  const loadMore = () => {
    let toSkip = skip + limit;
    getFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults([...filteredResults, ...data.data]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <Box textAlign="center">
          <Button
            onClick={loadMore}
            variant="contained"
            sx={{
              margin: "40px 0",
            }}
          >
            Load more ...
          </Button>
        </Box>
      )
    );
  };

  useEffect(() => {
    init();
    loadFilteredResults(skip, limit, myFilters.filtersData);
  }, []);

  const handleFilters = (filters, filterBy) => {
    // console.log(filters, filterBy);
    const newFilters = { ...myFilters };
    newFilters.filtersData[filterBy] = filters;
    if (filterBy == "price") {
      let priceValues = handlePrice(filters);
      newFilters.filtersData["price"] = priceValues;
    }
    loadFilteredResults(myFilters.filtersData);
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
      <Box sx={{ flexGrow: 1, marginBottom: "25px" }}>
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
            <Grid container spacing={4}>
              {filteredResults.map((product, i) => (
                <Grid item xs={4}>
                  <ProductCard key={i} product={product} />
                </Grid>
              ))}
            </Grid>
            {loadMoreButton()}
          </Grid>
          {/* <hr /> */}
        </Grid>
      </Box>
    </Layout>
  );
}

export default Shop;
