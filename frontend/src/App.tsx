import { useState } from "react";
import { Box, Button, Grid, Paper, Tab, Tabs, Typography } from "@mui/material";
import { CheckoutCart } from "./components/CheckoutCart";
import { MenuItemsDisplay } from "./components/Menu";



function App() {
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const paperStyle = {
    padding: "20px",
    margin: "20px",
    textAlign: "center",
    backgroundColor: "#f3f3f3",
  };

  const tabContainerStyle = {
    marginTop: "20px",
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper style={paperStyle}>
          <Typography variant="h4">Flower Shop</Typography>
          <Typography variant="subtitle1">
            Choose an option from the tabs below:
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <CheckoutCart />
      </Grid>
      <Grid item xs={6}>
        <Paper style={paperStyle}>
          <Tabs
            value={tabValue}
            onChange={handleChange}
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
