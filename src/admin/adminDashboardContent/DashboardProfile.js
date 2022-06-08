import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { isAuthenticated } from "../../auth";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/material";
import DashboardLayout from "../../core/DashboardLayout";

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));

// function DashboardProfile() {
// const {
//   user: { _id, name, email, role },
// } = isAuthenticated();
//   return (
//     <Box sx={{ width: "80%", margin: "auto" }}>
//       <Stack
//         // direction="column"
//         // justifyContent="center"
//         // alignItems="center"
//         spacing={2}
//       >
//         <Item>{name}</Item>
//         <Item>{email}</Item>
//         <Item>{role == 1 ? "Admin " : "Registered User"}</Item>
//       </Stack>
//     </Box>
//   );
// }

function DashboardProfile() {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  function createData(attribute, value) {
    return { attribute, value };
  }

  const rows = [
    createData("User ID", _id),
    createData("Username", name),
    createData("Email", email),
    createData("Role", role == 1 ? "Admin" : "Regular User"),
  ];

  return (
    <DashboardLayout title="Admin Information" description="">
      <Container maxWidth="sm" sx={{ marginTop: "40px" }}>
        <TableContainer component={Paper} sx={{ padding: "20px 40px" }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Attribute</TableCell>
                <TableCell align="left">Admin Data</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.attribute}
                  </TableCell>
                  <TableCell align="left">{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </DashboardLayout>
  );
}

export default DashboardProfile;
