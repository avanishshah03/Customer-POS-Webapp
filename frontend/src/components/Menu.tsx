import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { MenuItem, useMenuStore } from "../store";
import { Box } from "@mui/material";

export const MenuItemsDisplay = (props: { showImage: boolean }) => {
  const menuItems = useMenuStore((state) => state.menuItems);
  const addtoCart = useMenuStore(state => state.addCartEntry);
  return (
    <div>
      <Grid container spacing={2}>
        {menuItems.map((menuItem) => (
          <Grid item key={menuItem.id} xs={12} sm={6} md={4}>
            <Button
              variant="text"
              color="secondary"
              onClick={() => {
                addtoCart(menuItem.id);
              }}
            >
              <Paper
                elevation={3}
                style={{
                  padding: "30px",
                  textAlign: "center",
                  backgroundImage: props.showImage
                    ? `url(${menuItem.imageUrl})`
                    : "none",
                  backgroundSize: "cover",
                }}
              >
                {props.showImage && (
                  <div style={{ height: "100px", width: "100px" }}></div>
                )}
                <Typography variant="h6">
                  <Box style={{ backgroundColor: "white" }}>
                    {menuItem.name} ${menuItem.price.toFixed(2)}
                  </Box>
                </Typography>
              </Paper>
            </Button>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
