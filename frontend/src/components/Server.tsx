import { Grid } from "@mui/material";
import { CheckoutCart } from "./CheckoutCart";
import { MenuItemsDisplay } from "./Menu";

export const Server = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <MenuItemsDisplay showImage={true} />
      </Grid>
      <Grid item xs={4}>
        <CheckoutCart />
      </Grid>
    </Grid>
  );
};
