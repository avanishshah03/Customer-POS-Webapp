import { useState, useEffect } from 'react';
import axios from '../config/axiosConfig';
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
        axios.get("/restockReport", {
            // params: {
            //     name: new Date(startDate).toISOString(),
            //     stock: new Date(endDate).toISOString(),
            //     restock: new Date(endDate).toISOString(),
            // }
        }).then((res) => {
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
            <div style={{ marginBottom: '10px' }}>
                {/* <TextField
                    label="Start Date"
                    type="date"
                    defaultValue={startDate}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={handleStartDateChange}
                />
                <TextField
                    label="End Date"
                    type="date"
                    defaultValue={endDate}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={handleEndDateChange}
                /> */}
            </div>
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
                        {restockData.map((ingredient: { restock: number, stock: number, name: string }, restockAmmount: number) => (
                            <TableRow key={restockAmmount}>
                                <TableCell style={cellStyle}>
                                    {ingredient.name}
                                </TableCell>
                                <TableCell style={cellStyle}>
                                    {ingredient.stock}
                                </TableCell>
                                <TableCell style={cellStyle}>
                                    {ingredient.restock}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};
