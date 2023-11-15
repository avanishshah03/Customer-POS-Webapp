import { Paper, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, TextField, MenuItem, Select, Checkbox, Pagination } from '@mui/material';
import { useMenuStore } from '../store';
import { IngredientToAdd } from './IngredientToAdd';
import { useState } from 'react';

// https://stackoverflow.com/questions/42761068/paginate-javascript-array
function paginate<T>(array: T[], pageSize: number, pageNumber: number): T[] {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
}

const pageSize = 10;



export const ManagerIngredients = () => {
    const [isAddItemDialogOpen, setAddItemDialogOpen] = useState(true);
    const [page, setPage] = useState(1);
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
            <IngredientToAdd open={isAddItemDialogOpen} onClose={() => setAddItemDialogOpen(false)} />
            <Typography variant="h5" style={{ textAlign: 'center' }}>Ingredients</Typography>
            <Pagination count={Math.ceil(ingredients.length / pageSize)} onChange={(e, v) => setPage(v)} />
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
                                <Typography variant="h6">{"Price"}</Typography>
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

                        {paginate(ingredients, pageSize, page).map((Ingredients, itemIndex) => (
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
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
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