import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { isAuthenticated } from "../../auth";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function DashboardProfile() {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();
  return (
    <Box sx={{ width: "80%", margin: "auto" }}>
      <Stack
        // direction="column"
        // justifyContent="center"
        // alignItems="center"
        spacing={2}
      >
        <Item>{name}</Item>
        <Item>{email}</Item>
        <Item>{role == 1 ? "Admin " : "Registered User"}</Item>
      </Stack>
    </Box>
  );
}

export default DashboardProfile;
