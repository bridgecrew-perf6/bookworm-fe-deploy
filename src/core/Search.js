import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { list, getCategories } from "./apiCore";
import ProductCard from "./ProductCard";
import { Input, Box, Button, Typography, Container, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import ButtonGroup from "@mui/material/ButtonGroup";

function Search() {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false,
  });

  const { categories, category, search, results, searched } = data;
  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const searchData = () => {
    // console.log(search, category);
    if (search) {
      list({ search: search || undefined, category: category }).then(
        (response) => {
          if (response.error) {
            console.log(response.error);
          } else {
            setData({ ...data, results: response, searched: true });
          }
        }
      );
    }
  };

  const [value, setValue] = React.useState(null);

  const handleTitleChange = (event) => {
    setData({
      ...data,
      search: event.target.value,
    });
  };

  const handleCategoryChange = (value) => {
    setData({
      ...data,
      category: value._id,
    });
  };

  const searchedMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} products`;
    } else if (searched && results.length < 1) {
      return `No products found!`;
    }
  };

  const searchSubmit = (event) => {
    event.preventDefault();
    searchData();
  };

  const searchedProducts = (results = []) => {
    return (
      <Box>
        <Typography variant="h5" textAlign="center">
          {searchedMessage(searched, results)}
        </Typography>
        <Grid container spacing={4}>
          {results.map((product, i) => {
            return (
              <Grid item xs={4}>
                <ProductCard key={i} product={product} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    );
  };

  const categoryRender = {
    options: categories,
    getOptionLabel: (option) => option.name,
  };

  const searchForm = () => {
    return (
      // <Container
      //   maxWidth="md"
      //   sx={{ margin: "0", marginBottom: "50px", paddingLeft: "0px" }}
      // >
      <Box
        component="form"
        sx={{
          display: "flex",
          width: "100%",
          // backgroundColor: "gray",
          justifyContent: "space-between",
          padding: "10px 0",
          marginBottom: "30px",
        }}
      >
        <Autocomplete
          {...categoryRender}
          isOptionEqualToValue={(option, value) => option.name === value.name}
          id="controlled-demo"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            handleCategoryChange(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Category"
              variant="outlined"
              sx={{ width: "200px" }}
            />
          )}
        />

        <TextField
          id="outlined-title"
          label="Title"
          onChange={handleTitleChange}
          sx={{ width: "500px" }}
        />

        <Button variant="contained" onClick={searchSubmit}>
          Search
        </Button>
        {/* {JSON.stringify(results)} */}
      </Box>
      // </Container>
    );
  };

  return (
    <Box
      sx={{
        width: "100%",
        marginBottom: "70px",
      }}
    >
      {searchForm()}
      {searchedProducts(results)}
    </Box>
  );
}

export default Search;
