import { useState, useEffect } from "react";
import axios from "../config/axiosConfig";
import {
  Paper,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Button,
} from "@mui/material";

export const RestockReport = () => {
  const [restockData, setRestockData] = useState([]);

  useEffect(() => {
    axios.get("/restockReport").then((res) => {
      setRestockData(res.data);
      console.log(res.data);
    });
  }, []);

  const tableStyle = { width: "100%" };
  const cellStyle = { padding: "8px" };

  return (
    <Paper
      style={{
        padding: "20px",
        margin: "10px",
        backgroundColor: "#f3f3f3",
        fontSize: "2.9em",
      }}
    >
      <Typography variant="h5" style={{ textAlign: "center" }}>
        Restock Report
      </Typography>
      <TableContainer>
        <Table style={tableStyle}>
          <TableHead>
            <TableRow>
              <TableCell style={cellStyle}>
                <Typography variant="h6">Ingredient</Typography>
              </TableCell>
              <TableCell style={cellStyle}>
                <Typography variant="h6">Stock ammount</Typography>
              </TableCell>
              <TableCell style={cellStyle}>
                <Typography variant="h6">Restock ammount</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {restockData.map((rowData) => (
              <TableRow key={rowData.restockAmmount}>
                <TableCell style={cellStyle}>{rowData.ingredient.name}</TableCell>
                <TableCell style={cellStyle}>
                  {rowData.ingredient.stock}
                </TableCell>
                <TableCell style={cellStyle}>
                  {rowData.ingredient.restock}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
