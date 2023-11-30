import { Tab, Tabs } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useMenuStore } from "../store";


export const MenuItemsDisplay = (props: { showImage: boolean, fontSize?: string, backgroundColor?: string }) => {
  const menuItems = useMenuStore((state) => state.menuItems);
  const addtoCart = useMenuStore((state) => state.addCartEntry);
  const [tabValue, setTabValue] = useState(2);
  const itemCategories = useMenuStore((state) => state.itemCategories);

  const paperStyle = {
    padding: "20px",
    backgroundColor: props.backgroundColor ?? "#f3f3f3",
  } as any;

  return (
    <Paper style={paperStyle}>
      <Tabs
        value={tabValue}
        onChange={(_, newValue) => setTabValue(newValue)}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        aria-label="basic tabs example"
      >
        {itemCategories.map((category) => (
          <Tab label={category.name} key={category.id} />
        ))}
      </Tabs>

      {itemCategories.map((category) => (
        <div
          key={category.id}
          style={{ display: tabValue === category.id ? "block" : "none" }}
        >
          <Grid
            container
            spacing={4}
            rowGap={4}
            sx={{ height: "90vh", overflowY: "scroll" }}
            alignItems="stretch"
          >
            {menuItems
              .filter((menuItem) => menuItem.categoryId === category.id + 1)
              .filter((v, i, a) => a.map(v => v.name).indexOf(v.name) === i) // https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
              .map((menuItem) => (
                <Grid item key={menuItem.id} xs={3} style={{ height: "250px" }} >
                  <Button
                    variant="text"
                    color="primary"
                    style={{ height: "100%" }}
                    onClick={() => {
                      addtoCart(menuItem.id);
                    }}
                  >
                    <Paper
                      elevation={3}
                      style={{
                        padding: "30px",
                        height: "100%",
                        textAlign: "center",
                        backgroundImage: props.showImage
                          ? `url(${menuItem.imageUrl})`
                          : "none",
                        backgroundSize: "cover",
                      }}
                    >
                      {props.showImage && (
                        <div
                          style={{ height: "100px", width: "100px" }}
                        ></div>
                      )}
                      <Typography variant="h6" style={{color: 'black',
                                                      backgroundColor: 'white'}}>

                        {menuItem.name} ${menuItem.price.toFixed(2)}
                        {/* {props.fontSize === "small" ?
                            <Box style={{ backgroundColor: "white", width: "100px", height: "50px", fontSize: "12px" }}>
                              {menuItem.name} ${menuItem.price.toFixed(2)}
                            </Box>
                            :
                            <Box style={{ backgroundColor: "white" }}>
                              {menuItem.name} ${menuItem.price.toFixed(2)}
                            </Box>
                          } */}
                          
                      </Typography>
                    </Paper>
                  </Button>
                </Grid>
              ))}
          </Grid>
        </div>
      ))}
    </Paper>
  );
};
