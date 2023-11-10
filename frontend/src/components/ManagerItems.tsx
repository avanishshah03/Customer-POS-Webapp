import { Paper, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, TextField, Checkbox, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useMenuStore } from '../store';
import React from 'react';

export const ManagerItems = () => {
    const cart = useMenuStore(state => state.cart);
    const menuitems = useMenuStore(state => state.menuItems);
    const decrement = useMenuStore(state => state.decrementCartEntryQuantity);
    const increment = useMenuStore(state => state.incrementCartEntryQuantity);
    const changeItemPrice = useMenuStore(state => state.changeItemPrice);
    const changeGF = useMenuStore(state => state.changeGF);
    const changeVegan = useMenuStore(state => state.changeVegan);
    const changeExtraSauce = useMenuStore(state => state.changeExtraSauce);
    const changeSize = useMenuStore(state => state.changeSize);
    const changeItemName = useMenuStore(state => state.changeItemName);
    const tableStyle = {
        border: '1px solid #ddd',
        width: '100%',
    };

    const cellStyle = {
        border: '1px solid #ddd',
        padding: '8px',
    };

    const buttonStyleplus = {
        backgroundColor: 'black',
        color: 'white',
        padding: '8px 12px',
        fontSize: '12px',
    };

    const buttonStyleminus = {
        backgroundColor: 'white',
        color: 'black',
        padding: '1px 1px',
        margin: '1px',
        border: '1px solid black',
        fontSize: '15px',
    };



    const handleChange = (value: string, menuId: number) => {
        changeSize(menuId, value);
    };

    // };

    return (
        <Paper style={{
            padding: '20px',
            margin: '10px',
            backgroundColor: '#f3f3f3',
        }}>
            <Button variant='contained'> Add Item +  </Button>
            <Typography variant="h5" style={{ textAlign: 'center' }}>Point of Sale</Typography>
            <TableContainer>
                <Table style={tableStyle}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={cellStyle} >
                                <Typography variant="h6">{"ID"}</Typography>
                            </TableCell>
                            <TableCell style={cellStyle} >
                                <Typography variant="h6">{"Names"}</Typography>
                            </TableCell>
                            <TableCell style={cellStyle} >
                                <Typography variant="h6">{"Price"}</Typography>
                            </TableCell>
                            <TableCell style={cellStyle} >
                                <Typography variant="h6">{"Gluten Free"}</Typography>
                            </TableCell>
                            <TableCell style={cellStyle} >
                                <Typography variant="h6">{"Vegan"}</Typography>
                            </TableCell>
                            <TableCell style={cellStyle} >
                                <Typography variant="h6">{"Size"}</Typography>
                            </TableCell>
                            <TableCell style={cellStyle} >
                                <Typography variant="h6">{"Extra Sauce"}</Typography>
                            </TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {menuitems.map((menuItem, itemIndex) => (
                            <TableRow key={itemIndex}>
                                <TableCell style={cellStyle} >
                                    {menuItem.id}
                                </TableCell>
                                <TableCell style={cellStyle} >
                                    <TextField
                                        variant="outlined"
                                        type="string"
                                        value={menuItem.name}
                                        onChange={(e) => changeItemName(menuItem.id, e.target.value as any)}
                                    />
                                </TableCell>
                                <TableCell style={cellStyle} >
                                    <TextField
                                        variant="outlined"
                                        type="number"
                                        value={menuItem.price}
                                        onChange={(e) => changeItemPrice(menuItem.id, e.target.value as any)}
                                    />
                                </TableCell>
                                <TableCell style={cellStyle} >
                                    <Checkbox checked={menuItem.glutenFree}
                                        onChange={(e) => changeGF(menuItem.id)} />
                                </TableCell>
                                <TableCell style={cellStyle} >
                                    <Checkbox checked={menuItem.vegan}
                                        onChange={(e) => changeVegan(menuItem.id)} />
                                </TableCell>
                                <TableCell style={cellStyle} >
                                    <Select
                                        labelId="size-select-label"
                                        id="size-select-label"
                                        value={menuItem.size}
                                        label="menuitem.size"
                                        onChange={(e) => changeSize(menuItem.id, e.target.value)}
                                    >
                                        <MenuItem value={"single"}>single</MenuItem>
                                        <MenuItem value={"double"}>double</MenuItem>
                                        <MenuItem value={"large"}>large</MenuItem>
                                        <MenuItem value={"regular"}>regular</MenuItem>
                                        <MenuItem value={"snack"}>snack</MenuItem>
                                        <MenuItem value={"plus"}>plus</MenuItem>
                                        <MenuItem value={""}>one piece</MenuItem>
                                        <MenuItem value={"none"}>none</MenuItem>
                                        <MenuItem value={"Medium"}>Medium</MenuItem>
                                        <MenuItem value={"two piece"}>two piece</MenuItem>
                                        <MenuItem value={"three piece"}>three piece</MenuItem>
                                    </Select>
                                </TableCell>
                                <TableCell style={cellStyle} >
                                    <Checkbox checked={menuItem.extrasauce}
                                        onChange={(e) => changeExtraSauce(menuItem.id)} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

