import { useState } from "react";
import { Box, Button, Grid, Paper, Tab, Tabs, Typography } from "@mui/material";
import { CheckoutCart } from "./components/CheckoutCart";
import { MenuItemsDisplay } from "./components/Menu";
import { Link, Route } from "wouter";
import SignIn from "./LoginPage";



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
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper style={{ ...paperStyle, display: "flex" }}>
            <div style={{ margin: 'auto' }}>
              <Typography variant="h4">Mess Waffles</Typography>
              <Typography variant="subtitle1">
                MESSin around with waffles
              </Typography>
            </div>
            <Link href="/login">
              <Button variant="contained">
                Login
              </Button>
            </Link>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <CheckoutCart />
        </Grid>
        <Grid item xs={6}>
          <MenuItemsDisplay showImage={true} />
        </Grid>
      </Grid>
    </div>
  );
}