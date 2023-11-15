import { Paper, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, TextField, MenuItem, Select, Checkbox } from '@mui/material';
import { useMenuStore } from '../store';
import { ItemToAdd } from './ItemToAdd';
import { useState } from 'react';



export const ManagerIngredients = () => {
    const [isAddItemDialogOpen, setAddItemDialogOpen] = useState(true);
    const ingredients = useMenuStore(state => state.ingredients);
    const changeIngredientName = useMenuStore(state => state.changeIngredientName);
    const changeIngredientStock = useMenuStore(state => state.changeIngredientStock);
    const changeIngredientRestock = useMenuStore(state => state.changeIngredientRestock);
    const changeIngredientAmountOrdered = useMenuStore(state => state.changeAmountOrdered);
    const changeIngredientPrice = useMenuStore(state => state.changeIngredientPrice);
    const changeIngredientGF = useMenuStore(state => state.changeIngredientGF);
    const changeIngredientVegan = useMenuStore(state => state.changeIngredientVegan);
    const deleteIngredient = useMenuStore(state => state.deleteIngredient);

    const tableStyle = { width: '100%', };
    const cellStyle = { padding: '8px', };

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
                        {ingredients.map((Ingredients, itemIndex) => (
                            <TableRow key={itemIndex}>
                                <TableCell style={cellStyle} >
                                    {Ingredients.id}
                                </TableCell>
                                <TableCell style={cellStyle} >
                                    <TextField
                                        variant="outlined"
                                        type="string"
                                        value={Ingredients.name}
                                        onChange={(e) => changeIngredientName(Ingredients.id, e.target.value as any)}
                                    />
                                </TableCell>
                                <TableCell style={cellStyle} >
                                    <TextField
                                        variant="outlined"
                                        type="number"
                                        value={Ingredients.stock}
                                        onChange={(e) => changeIngredientStock(Ingredients.id, e.target.value as any)}
                                    />
                                </TableCell>
                                <TableCell style={cellStyle} >
                                    <TextField
                                        variant="outlined"
                                        type="number"
                                        value={Ingredients.restock}
                                        onChange={(e) => changeIngredientRestock(Ingredients.id, e.target.value as any)}
                                    />
                                </TableCell>
                                <TableCell style={cellStyle} >
                                    <TextField
                                        variant="outlined"
                                        type="number"
                                        value={Ingredients.amountOrdered}
                                        onChange={(e) => changeIngredientAmountOrdered(Ingredients.id, e.target.value as any)}
                                    />
                                </TableCell>
                                <TableCell style={cellStyle} >
                                    <TextField
                                        variant="outlined"
                                        type="number"
                                        value={Ingredients.price}
                                        onChange={(e) => changeIngredientPrice(Ingredients.id, e.target.value as any)}
                                    />
                                </TableCell>
                                <TableCell style={cellStyle} >
                                    <Checkbox checked={Ingredients.glutenFree}
                                        onChange={(e) => changeIngredientGF(Ingredients.id)} />
                                </TableCell>
                                <TableCell style={cellStyle} >
                                    <Checkbox checked={Ingredients.vegan}
                                        onChange={(e) => changeIngredientVegan(Ingredients.id)} />
                                </TableCell>
                                <TableCell style={cellStyle}>
                                    <Button
                                        variant='contained'
                                        color='error'
                                        onClick={() => deleteIngredient(Ingredients.id)}
                                    >
                                        {"Delete"}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}