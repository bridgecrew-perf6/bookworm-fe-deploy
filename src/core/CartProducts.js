import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ShowImage from "./ShowImage";
import { Link, Navigate } from "react-router-dom";
import { TextField, Box } from "@mui/material";

import { updateItem, removeItem } from "./cartHelpers";
import { API } from "./config";

export default function CartProducts({
  product,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = (f) => f,
  run = undefined,
}) {
  const [count, setCount] = React.useState(product.count);

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
            max: product.quantity,
            step: 1,
            style: { fontSize: 12 },
          }}
          onChange={handleChange(product._id)}
          sx={{
            maxWidth: "70px",
            textAlign: "center",
            paddingRight: "10px",
            fontSize: "12px",
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
          sx={{ fontSize: "12px" }}
          color="secondary"
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

  // console.log(product);

  return (
    <Card
      sx={{
        maxWidth: "50vw",
        marginBottom: "20px",
        boxShadow:
          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <img
          src={`${API}/product/photo/${product._id}`}
          alt={product.name}
          style={{
            maxHeight: "100px",
            maxWidth: "100%",
            minHeight: "100px",
            objectFit: "cover",
            alignItems: "center",
            display: "block",
            margin: "auto",
          }}
        />
        <Box sx={{ paddingRight: "20px" }}>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ fontSize: "16px" }}
            >
              {product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.description}
              {/* {product.description.substring(0, 100)} */}
            </Typography>
          </CardContent>
          <CardActions
            style={{
              justifyContent: "left",
              marginBottom: "10px",
              marginLeft: "10px",
            }}
          >
            {showCartUpdateOptions(cartUpdate)}
            <Link
              to={`/product/${product._id}`}
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="outlined"
                size="medium"
                sx={{ marginRight: "10px", fontSize: "12px" }}
              >
                View
              </Button>
            </Link>

            {showRemoveButton(showRemoveProductButton)}
          </CardActions>
        </Box>
      </Box>
    </Card>
  );
}
