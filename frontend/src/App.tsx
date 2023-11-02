import { useState } from "react";
import { Box, Button, Grid, Paper, Tab, Tabs, Typography } from "@mui/material";
import { CheckoutCart } from "./components/CheckoutCart";
import { MenuItemsDisplay } from "./components/Menu";
import { Link, Route } from "wouter";
import SignIn from "./LoginPage";



function App() {
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
      <Route path="/login"><SignIn /></Route>
      <Route path="/">
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
            <Paper style={paperStyle}>
              <Tabs
                value={tabValue}
                onChange={setTabValue as any}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="basic tabs example"
              >
                <Tab label="Breakfast" />
                <Tab label="Dinner" />
              </Tabs>
            </Paper>
            <Box style={tabContainerStyle}>
              <TabPanel value={tabValue} index={0}>
                <MenuItemsDisplay showImage={true} />
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <MenuItemsDisplay showImage={true} />
              </TabPanel>
            </Box>
          </Grid>
        </Grid>
      </Route>
    </div>
  );
}

const TabPanel = ({ children, value, index }: any) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

export default App;
