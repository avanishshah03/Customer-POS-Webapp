import { Paper, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, TextField, MenuItem, Select, Checkbox, Pagination } from '@mui/material';
import { Ingredient, useMenuStore } from '../store';
import { IngredientToAdd } from './IngredientToAdd';
import { useEffect, useState } from 'react';
import { DeleteConfirmIngredient } from './DeleteConfirmIngrdient';
import axios from '../config/axiosConfig';

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
    const setIngredients = useMenuStore(state => state.setIngredients);
    const changeIngredientName = useMenuStore(state => state.changeIngredientName);
    const changeIngredientStock = useMenuStore(state => state.changeIngredientStock);
    const changeIngredientRestock = useMenuStore(state => state.changeIngredientRestock);
    const changeIngredientAmountOrdered = useMenuStore(state => state.changeAmountOrdered);
    const changeIngredientPrice = useMenuStore(state => state.changeIngredientPrice);
    const changeIngredientGF = useMenuStore(state => state.changeIngredientGF);
    const changeIngredientVegan = useMenuStore(state => state.changeIngredientVegan);
    const deleteIngredient = useMenuStore(state => state.deleteIngredient);
    const [searchText, setSearchText] = useState("");
    const filteredIngredients = ingredients.filter(v => v.name.toLowerCase().includes(searchText.toLowerCase()));
    const tableStyle = { width: '100%', };
    const cellStyle = { padding: '8px', };

    useEffect(() => {
        axios.get("/ingredients").then((res) => {
            return res.data;
        }).then((data) => {
            setIngredients(data)
        }, (error) => {
            console.log(error);
        });
    }, [])

    return (
        <Paper style={{
            padding: '20px',
            margin: '10px',
            backgroundColor: '#f3f3f3',
            fontSize: "2.9em",
        }}>
            <IngredientToAdd open={isAddItemDialogOpen} onClose={() => setAddItemDialogOpen(false)} />
            <TextField variant="outlined" label="Search" onChange={(e) => setSearchText(e.target.value)} value={searchText} margin="dense" />
            <Typography variant="h5" style={{ textAlign: 'center' }}>Ingredients</Typography>
            <Pagination count={Math.ceil(filteredIngredients.length / pageSize)} onChange={(e, v) => setPage(v)} />
            {/* <Pagination count={Math.ceil(ingredients.length / pageSize)} onChange={(e, v) => setPage(v)} /> */}
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

                        {paginate(filteredIngredients, pageSize, page).map((Ingredients, itemIndex) => (
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
                                    <DeleteConfirmIngredient
                                        id={Ingredients.id}
                                        name={Ingredients.name}
                                        open={isAddItemDialogOpen}
                                        onClose={() => setAddItemDialogOpen(false)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}