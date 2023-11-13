import { Button, Grid, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "wouter";
import { CheckoutCart } from "./components/CheckoutCart";
import { MenuItemsDisplay } from "./components/Menu";
import Weather from "./components/WeatherWindow"; // Import the WeatherWindow component

export default function App() {
  const [tabValue, setTabValue] = useState(0);
  const paperStyle = {
    padding: "20px",
    margin: "20px",
    textAlign: "center",
    backgroundColor: "#f3f3f3",
  } as any;

  const tabContainerStyle = {
    marginTop: "20px",
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper style={{ ...paperStyle, display: "flex" }}>
          <Weather />
          <div style={{ margin: "auto" }}>
            <Typography variant="h4">Mess Waffles</Typography>
            <Typography variant="subtitle1">
              MESSin around with waffles
            </Typography>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={8}>
        <MenuItemsDisplay showImage={true} />
      </Grid>
      <Grid item xs={4}>
        <CheckoutCart />
      </Grid>
    </Grid>
  );
}
