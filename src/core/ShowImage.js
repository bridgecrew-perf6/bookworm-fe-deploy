import React from "react";
import { API } from "./config";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function ShowImage({ item, url }) {
  return (
    <div className="product-img">
      <img
        src={`${API}/${url}/photo/${item._id}`}
        // alt={item.name}
        alt=""
        style={{
          // maxHeight: "100%",
          maxHeight: "350px",

          maxWidth: "100%",
          minHeight: "350px",
          objectFit: "cover",
          alignItems: "center",
          display: "block",
          margin: "auto",
          // padding: "10px",
          background: `transparent url(/loading.gif) no-repeat scroll center center`,
        }}
      />

      {/* <Box sx={{ display: "flex", border: "1px solid", height: "350px" }}>
          <CircularProgress sx={{ margin: "auto" }} />
        </Box> */}
    </div>
  );
}

export default ShowImage;
