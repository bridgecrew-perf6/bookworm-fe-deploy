import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ShowImage from "./ShowImage";
import { Link } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function ProductCard({ product }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <ShowImage item={product} url="product" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description.substring(0, 100)}
        </Typography>
      </CardContent>
      <CardActions
        style={{
          justifyContent: "left",
          marginBottom: "10px",
          marginLeft: "10px",
        }}
      >
        <Link to={`/product/${product._id}`} style={{ textDecoration: "none" }}>
          <Button variant="outlined" size="medium" sx={{ marginRight: "10px" }}>
            View
          </Button>
        </Link>
        <Button variant="contained" size="medium">
          + <ShoppingCartIcon fontSize="small" />
        </Button>
      </CardActions>
    </Card>
  );
}
