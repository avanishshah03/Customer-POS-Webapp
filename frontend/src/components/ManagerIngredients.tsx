import { Paper, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, TextField, MenuItem, Select, Checkbox } from '@mui/material';
import { useMenuStore } from '../store';
import { ItemToAdd } from './ItemToAdd';
import { useState } from 'react';



export const ManagerIngredients = () => {
    const [isAddItemDialogOpen, setAddItemDialogOpen] = useState(true);
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

    const ingredients = useMenuStore(state => state.ingredients);

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
            {/* <Button variant='contained'> Add Item +  </Button> */}
            <ItemToAdd open={isAddItemDialogOpen} onClose={() => setAddItemDialogOpen(false)} />
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
                                <Typography variant="h6">{"Stock"}</Typography>
                            </TableCell>
                            <TableCell style={cellStyle} >
                                <Typography variant="h6">{"Restock"}</Typography>
                            </TableCell>
                            <TableCell style={cellStyle} >
                                <Typography variant="h6">{"Amount Ordered"}</Typography>
                            </TableCell>
                            <TableCell style={cellStyle} >
                                <Typography variant="h6">{"Prize"}</Typography>
                            </TableCell>
                            <TableCell style={cellStyle} >
                                <Typography variant="h6">{"Gluten Free"}</Typography>
                            </TableCell>
                            <TableCell style={cellStyle} >
                                <Typography variant="h6">{"Vegan"}</Typography>
                            </TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ingredients.map((menuItem, itemIndex) => (
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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}