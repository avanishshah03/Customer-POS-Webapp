import { ThemeProvider } from "@emotion/react";
import { Grid, Paper, Typography, createTheme } from "@mui/material";
import { CheckoutCart } from "./components/CheckoutCart";
import { MenuItemsDisplay } from "./components/Menu";
import Weather from "./components/WeatherWindow";
import "./Customer.css";


const orange = "#f47b20"
const brown = "#5e4433"

const theme = createTheme({
  palette: {
    primary: {
      main: orange,
    },
    secondary: {
      main: "#FF0000",
    },
    text: {
      primary: "#FFF",
      secondary: "#FFF",
    }
  }
});

export default function App() {
  const paperStyle = {
    padding: "20px",
    margin: "20px",
    textAlign: "center",
    backgroundColor: brown,
  } as any;

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2} style={{
        backgroundColor: "#c7a17a",
        color: orange,
      }}>
        <Grid item xs={12}>
          <Paper style={{ ...paperStyle, display: "flex" }}>
            <Weather />
            <div style={{ margin: "auto", color: orange }}>
              <Typography variant="h4" className="notranslate">Mess Waffles</Typography>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <MenuItemsDisplay showImage={true} backgroundColor={brown} addPaddingToImage={true} />
        </Grid>
        <Grid item xs={4}>
          <CheckoutCart backgroundColor={brown} />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
