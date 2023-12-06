
import { useEffect, useState } from 'react';
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
    Button,
    TextField,
    MenuItem,
    Select,
    Checkbox,
    Pagination,
} from "@mui/material";



export const SalesReport = () => {
    const [salesData, setSalesData] = useState([]);
    useEffect(() => {
        axios.get("/salesReport", {
            params: {
                startDate: new Date("2021-10-01").toISOString(),
                endDate: new Date().toISOString(),
            }
        }).then((res) => {
            setSalesData(res.data);
        });
    }, [])



    const tableStyle = { width: "100%", };
    const cellStyle = { padding: "8px", };


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
                Sales Report
            </Typography>
            <TableContainer>
                <Table style={tableStyle}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={cellStyle}>
                                <Typography variant="h6">Order Count</Typography>
                            </TableCell>
                            <TableCell style={cellStyle}>
                                <Typography variant="h6">Item Name</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {salesData.map((item: { orderCount: number, itemName: string }, itemIndex: number) => (
                            <TableRow key={itemIndex}>
                                <TableCell style={cellStyle}>
                                    {item.orderCount}
                                </TableCell>
                                <TableCell style={cellStyle}>
                                    {item.itemName}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>
        </Paper>
    );
}