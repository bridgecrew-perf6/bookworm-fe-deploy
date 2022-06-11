import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chart from "./components/Chart";
import Deposits from "./components/Deposits";
import Orders from "./components/Orders";
import DashboardLayout from "../../core/DashboardLayout";
import OrderDetail from "./components/OrderDetail";

function DashboardLanding() {
  return (
    <DashboardLayout title="Report and Summary" description="">
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Chart */}
          {/* <Grid item xs={12} md={8} lg={9}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
            >
              <Chart />
            </Paper>
          </Grid> */}
          {/* Recent Deposits */}
          <Grid item xs={12} md={4} lg={6}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 145,
              }}
            >
              <Deposits />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={6}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 145,
              }}
            >
              <OrderDetail />
            </Paper>
          </Grid>
          {/* Recent Orders */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Orders />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </DashboardLayout>
  );
}

export default DashboardLanding;
