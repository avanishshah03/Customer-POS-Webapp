import { Grid } from "@mui/material";
import { CheckoutCart } from "./CheckoutCart";
import { MenuItemsDisplay } from "./Menu";
import Box from '@mui/material/Box';
import { Tab, Tabs } from '@mui/material';
import { useState } from "react";
import OrderTable from "./OrderTable";

export const POS = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <MenuItemsDisplay showImage={false} fontSize={"small"} addPaddingToImage={false}/>
      </Grid>
      <Grid item xs={4}>
        <CheckoutCart />
      </Grid>
    </Grid>
  );
};



export const Server = () => {
  const [value, setValue] = useState(0);
  return (
    <>
      <Box>
        <Tabs value={value} onChange={(_, newValue) => setValue(newValue)}>
          <Tab label="Point of Sale" />
          <Tab label="Orders" />
        </Tabs>
      </Box>
      <div hidden={value != 0}><POS /></div>
      <div hidden={value != 1}><OrderTable /></div>
    </>
  )
}