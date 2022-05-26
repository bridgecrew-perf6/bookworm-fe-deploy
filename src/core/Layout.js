import React from "react";

import { Container, Typography } from "@mui/material";

function Layout({
  title = "Title",
  description = "Description",
  className,
  children,
}) {
  return (
    <Container maxWidth="lg">
      <div className="jumbotron">
        <Typography variant="h4" textAlign="center">
          {title}
        </Typography>
        <Typography variant="h6" textAlign="center">
          {description}
        </Typography>
      </div>
      <div className={className}>{children}</div>
    </Container>
  );
}

export default Layout;
