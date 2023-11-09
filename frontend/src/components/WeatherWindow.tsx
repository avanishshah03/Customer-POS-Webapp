import * as React from "react";
import axios from 'axios';
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";
import { TableContainer } from "@mui/material";

const API_URL = 'https://api.openweathermap.org/data/2.5/weather?lat=30.626310&lon=-96.337876&appid=5672abd6804fb54e885e9c6c6246e716';

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
        const response = await axios.get(API_URL);
        const apiData = response.data;

        // Update the rows with real data from the API
        const updatedRows = [
            createData('Temperature', (apiData.main.temp - 273.15) * 9/5 + 32),
            createData('Feels like', (apiData.main.feels_like - 273.15) * 9/5 + 32),
            createData('Today\'s max', (apiData.main.temp_max - 273.15) * 9/5 + 32),
            createData('Today\'s min', (apiData.main.temp_min - 273.15) * 9/5 + 32),
            createData('Wind speed', apiData.wind.speed * 2.237),
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
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
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
