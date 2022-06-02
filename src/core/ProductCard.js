import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ShowImage from "./ShowImage";
import { Link, Navigate } from "react-router-dom";
import { TextField } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { addItem, updateItem, removeItem } from "./cartHelpers";

export default function ProductCard({
  product,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = (f) => f,
  run = undefined,
}) {
  const [redirect, setRedirect] = React.useState(false);
  const [count, setCount] = React.useState(product.count);

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Navigate to="/cart" replace />;
    }
  };

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <TextField
          size="small"
          type="number"
          value={count}
          variant="outlined"
          inputProps={{
            min: 1,
            max: 13,
            step: 1,
          }}
          onChange={handleChange(product._id)}
          sx={{
            maxWidth: "70px",
            textAlign: "center",
            paddingRight: "10px",
          }}
        />
      )
    );
  };

  const showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <Button
          variant="contained"
          onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
        >
          Remove
        </Button>
      )
    );
  };

  const handleChange = (productId) => (event) => {
    setRun(!run); // run useEffect in parent Cart
    setCount(parseInt(event.target.value < 1 ? 1 : event.target.value));
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      {shouldRedirect(redirect)}
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
        <Button variant="contained" size="medium" onClick={addToCart}>
          + <ShoppingCartIcon fontSize="small" />
        </Button>
        {showRemoveButton(showRemoveProductButton)}
        {showCartUpdateOptions(cartUpdate)}
      </CardActions>
    </Card>
  );
}
