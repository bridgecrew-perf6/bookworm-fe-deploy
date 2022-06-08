import React, { useState, useEffect } from "react";
import {
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  TextField,
  Button,
  Modal,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { createCategory } from "./apiAdmin";

import DashboardLayout from "../core/DashboardLayout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "./apiAdmin";

function ManageProducts() {
  const { user, token } = isAuthenticated();
  const [products, setProducts] = useState([]);

  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  const destroy = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadProducts();
      }
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Box sx={{ margin: "auto", textAlign: "center" }}>
      <DashboardLayout title="Manage Products" description="">
        <div className="row">
          <div className="col-12">
            <h2 className="text-center">Total {products.length} products</h2>
            <hr />
            <ul className="list-group">
              {products.map((p, i) => (
                <li
                  key={i}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <strong>{p.name}</strong>
                  <Link to={`/admin/dashboard/products/update/${p._id}`}>
                    <span className="badge badge-warning badge-pill">
                      Update
                    </span>
                  </Link>
                  <span
                    onClick={() => destroy(p._id)}
                    className="badge badge-danger badge-pill"
                  >
                    Delete
                  </span>
                </li>
              ))}
            </ul>
            <br />
          </div>
        </div>
      </DashboardLayout>
    </Box>
  );
}

export default ManageProducts;
