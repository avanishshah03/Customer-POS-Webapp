import React from 'react';
import { Paper, Typography, Grid, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import { useMenuStore } from '../store';

export const CheckoutCart = () => {
    const cart = useMenuStore(state => state.cart);
    const menuitems = useMenuStore(state => state.menuItems);
    const columnStyle = {
        padding: '20px',
        margin: '10px',
        textAlign: 'center',
        backgroundColor: '#f3f3f3',
    };



    const tableStyle = {
        border: '1px solid #ddd',
        width: '100%',
    };

    const cellStyle = {
        border: '1px solid #ddd',
        padding: '8px',
    };

    return (
        <Paper style={columnStyle}>
            <Typography variant="h5">Point of Sale</Typography>
            <TableContainer>
                <Table style={tableStyle}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={cellStyle} >
                                <Typography variant="h6">{"Items"}</Typography>
                            </TableCell>
                            <TableCell style={cellStyle} >
                                <Typography variant="h6">{"Price"}</Typography>
                            </TableCell>
                            <TableCell style={cellStyle} >
                                <Typography variant="h6">{"Quantity"}</Typography>
                            </TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cart.map((item, itemIndex) => (
                            <TableRow key={itemIndex}>
                                <TableCell style={cellStyle} >
                                    {menuitems.find(menuitem => menuitem.id === item.itemId).name}
                                </TableCell>
                                <TableCell style={cellStyle} >
                                    {menuitems.find(menuitem => menuitem.id === item.itemId)?.price}
                                </TableCell>
                                <TableCell style={cellStyle} >
                                    {item.quantity}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
                Checkout
            </Button>
        </Paper>
    );
}
