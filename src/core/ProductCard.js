import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ShowImage from "./ShowImage";

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
      <CardActions>
        <Button variant="outlined" size="small">
          View Product
        </Button>
        <Button variant="contained" size="small">
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
