import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { MenuItem, useMenuStore } from "../store";

export const MenuItemsDisplay = (props: { showImage: boolean }) => {
  const menuItems = useMenuStore((state) => state.menuItems);
  return (
    <div>
      <Grid container spacing={2}>  
        {menuItems.map((menuItem) => (
          <Grid item key={menuItem.id} xs={12} sm={6} md={4}>
            <Paper
              elevation={3}
              style={{
                padding: "16px",
                textAlign: "center",
                backgroundImage: props.showImage
                  ? `url(${menuItem.imageUrl})`
                  : "none",
                backgroundSize: "cover",
              }}
            >
              {props.showImage && (
                <Box style={{ height: "100px", width: "100px" }}></Box>
              )}
              <Typography variant="h6">
                <Box style={{ backgroundColor: "white" }}>
                  {menuItem.name} ${menuItem.price.toFixed(2)}
                </Box>
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
