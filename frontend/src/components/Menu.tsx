// import React from "react";
// import Grid from "@mui/material/Grid";
// import Paper from "@mui/material/Paper";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import { useMenuStore } from "../store";
// import { Box, Tab, Tabs } from "@mui/material";
// import { useState } from "react";

// export const MenuItemsDisplay = (props: { showImage: boolean }) => {
//   const menuItems = useMenuStore((state) => state.menuItems);
//   const addtoCart = useMenuStore(state => state.addCartEntry);
//   const [tabValue, setTabValue] = useState(0);
//   const tabContainerStyle = {
//     marginTop: "20px",
//   };
//   const paperStyle = {
//     padding: "20px",
//     margin: "20px",
//     textAlign: "center",
//     backgroundColor: "#f3f3f3",
//   } as any;

//   // Assuming you have tabs with labels such as "Tab 1", "Tab 2", etc.
//   const tabs = ["Tab 1", "Tab 2", "Tab 3"]; // Replace with your tab labels

//   return (
//     <div>
//       <Paper style={paperStyle}>
//         <Tabs
//           value={tabValue}
//           onChange={(_, newValue) => setTabValue(newValue)}
//           indicatorColor="primary"
//           textColor="primary"
//           variant="fullWidth"
//           aria-label="basic tabs example"
//         >
//           {tabs.map((tab, index) => (
//             <Tab label={tab} key={index} />
//           ))}
//         </Tabs>

//         {tabs.map((tab, index) => (
//           <div key={index} style={{ display: tabValue === index ? "block" : "none" }}>
//             <Grid container spacing={2}>
//               {menuItems
//                 .filter((menuItem) => menuItem.categoryId === tab) // Adjust this condition based on your data structure
//                 .map((menuItem) => (
//                   <Grid item key={menuItem.id} xs={12} sm={6} md={4}>
//                     <Button
//                       variant="text"
//                       color="secondary"
//                       onClick={() => {
//                         addtoCart(menuItem.id);
//                       }}
//                     >
//                       <Paper
//                         elevation={3}
//                         style={{
//                           padding: "30px",
//                           textAlign: "center",
//                           backgroundImage: props.showImage
//                             ? `url(${menuItem.imageUrl})`
//                             : "none",
//                           backgroundSize: "cover",
//                         }}
//                       >
//                         {props.showImage && (
//                           <div style={{ height: "100px", width: "100px" }}></div>
//                         )}
//                         <Typography variant="h6">
//                           <Box style={{ backgroundColor: "white" }}>
//                             {menuItem.name} ${menuItem.price.toFixed(2)}
//                           </Box>
//                         </Typography>
//                       </Paper>
//                     </Button>
//                   </Grid>
//                 ))}
//             </Grid>
//           </div>
//         ))}
//       </Paper>
//     </div>
//   );
// };



import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useMenuStore } from "../store";
import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";

export const MenuItemsDisplay = (props: { showImage: boolean }) => {
  const menuItems = useMenuStore((state) => state.menuItems);
  const addtoCart = useMenuStore((state) => state.addCartEntry);
  const [tabValue, setTabValue] = useState(2);
  const itemCategories = useMenuStore((state) => state.itemCategories);

  const paperStyle = {
    padding: "20px",
    margin: "20px",
    textAlign: "center",
    backgroundColor: "#f3f3f3",
  } as any;


  return (
    <div>
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
          <div key={category.id} style={{ display: tabValue === category.id ? "block" : "none" }}>
            <Grid container spacing={2}>
              {menuItems
                .filter((menuItem) => menuItem.categoryId === category.id)
                .map((menuItem) => (
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
        ))}
      </Paper>
    </div>
  );
};
