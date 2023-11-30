import { ThemeProvider } from "@emotion/react";
import { TableContainer, createTheme } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from "react";

const API_URL = 'https://api.openweathermap.org/data/2.5/weather?lat=30.626310&lon=-96.337876&appid=5672abd6804fb54e885e9c6c6246e716';

const theme = createTheme({
  palette: {
    text: {
      primary: "#000",
      secondary: "#000",
    }
  }
});


function createData(
  name: string,
  number: number,
) {
  return { name, number };
}

const initialRows = [
  createData('Temperature', 0),
  createData('Feels like', 0),
  createData('Today\'s max', 0),
  createData('Today\'s min', 0),
  createData('Wind speed', 0),
  createData('Humidity', 0),

  // Add more rows as needed
];

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;
  const [rows, setRows] = React.useState(initialRows); // State to store the API data

  const handleClose = () => {
    onClose(selectedValue);
  };

  React.useEffect(() => {
    // Function to make the API call and update the rows
    const fetchData = async () => {
      try {
        const apiData = await (await fetch(API_URL)).json();

        // Update the rows with real data from the API
        const updatedRows = [
          createData('Temperature', Math.round((apiData.main.temp - 273.15) * 9 / 5 + 32)),
          createData('Feels like', Math.round((apiData.main.feels_like - 273.15) * 9 / 5 + 32)),
          createData('Today\'s max', Math.round((apiData.main.temp_max - 273.15) * 9 / 5 + 32)),
          createData('Today\'s min', Math.round((apiData.main.temp_min - 273.15) * 9 / 5 + 32)),
          createData('Wind speed', Math.round(apiData.wind.speed * 2.237)),
          createData('Humidity', apiData.main.humidity),
          // Add more rows as needed
        ];

        setRows(updatedRows);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    // Call the API when the dialog is opened
    if (open) {
      fetchData();
    }
  }, [open]);

  return (
    <ThemeProvider theme={theme}>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Weather in College Station, TX</DialogTitle>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="left">Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.number}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Dialog>
    </ThemeProvider>
  );
}

export default function SimpleDialogDemo() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState('');

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Weather
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
