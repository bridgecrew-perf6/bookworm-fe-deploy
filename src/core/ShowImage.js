import React from "react";
import { API } from "./config";

function ShowImage({ item, url }) {
  return (
    <div className="product-img">
      <img
        src={`${API}/${url}/photo/${item._id}`}
        alt={item.name}
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
        }}
      />
    </div>
  );
}

export default ShowImage;
