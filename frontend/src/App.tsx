import { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  Tab,
  Tabs,
  Typography
} from "@mui/material";
import { CheckoutCart } from "./components/CheckoutCart";
import { MenuItemsDisplay } from "./components/Menu";

const mockMenuItems = [
  {
    id: 1,
    name: "Chicken",
    price: 12.99,
    imageUrl: "https://assets.epicurious.com/photos/62f16ed5fe4be95d5a460eed/3:2/w_6948,h_4632,c_limit/RoastChicken_RECIPE_080420_37993.jpg",
  },
  {
    id: 2,
    name: "Waffles",
    price: 12.99,
    imageUrl: "https://assets.epicurious.com/photos/62f16ed5fe4be95d5a460eed/3:2/w_6948,h_4632,c_limit/RoastChicken_RECIPE_080420_37993.jpg",
  },
  {
    id: 3,
    name: "Lettuce",
    price: 12.99,
    imageUrl: "https://assets.epicurious.com/photos/62f16ed5fe4be95d5a460eed/3:2/w_6948,h_4632,c_limit/RoastChicken_RECIPE_080420_37993.jpg",
  },
  {
    id: 4,
    name: "Kid's Meal",
    price: 12.99,
    imageUrl: "https://assets.epicurious.com/photos/62f16ed5fe4be95d5a460eed/3:2/w_6948,h_4632,c_limit/RoastChicken_RECIPE_080420_37993.jpg",
  },
  {
    id: 5,
    name: "Cow Brain",
    price: 12.99,
    imageUrl: "https://assets.epicurious.com/photos/62f16ed5fe4be95d5a460eed/3:2/w_6948,h_4632,c_limit/RoastChicken_RECIPE_080420_37993.jpg",
  },
  {
    id: 6,
    name: "Juice",
    price: 12.99,
    imageUrl: "https://assets.epicurious.com/photos/62f16ed5fe4be95d5a460eed/3:2/w_6948,h_4632,c_limit/RoastChicken_RECIPE_080420_37993.jpg",
  },
  {
    id: 7,
    name: "Soda",
    price: 12.99,
    imageUrl: "https://assets.epicurious.com/photos/62f16ed5fe4be95d5a460eed/3:2/w_6948,h_4632,c_limit/RoastChicken_RECIPE_080420_37993.jpg",
  },
  {
    id: 8,
    name: "Tomato",
    price: 12.99,
    imageUrl: "https://assets.epicurious.com/photos/62f16ed5fe4be95d5a460eed/3:2/w_6948,h_4632,c_limit/RoastChicken_RECIPE_080420_37993.jpg",
  },
];


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
            <Tab label="Search Flower" />
            <Tab label="Quit" />
          </Tabs>
        </Paper>
        <Box style={tabContainerStyle}>
          <TabPanel value={tabValue} index={3}>
            <Button variant="contained" color="primary">
              Search Flower
            </Button>
          </TabPanel>
          <TabPanel value={tabValue} index={4}>
            <Button variant="contained" color="primary">
              Quit
            </Button>
          </TabPanel>
          <MenuItemsDisplay menuItems={mockMenuItems} showImage={true}></MenuItemsDisplay>
        </Box>
      </Grid>
    </Grid>
  );
}

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

export default App;
