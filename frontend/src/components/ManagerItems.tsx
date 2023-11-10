import { Paper, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, TextField } from '@mui/material';
import { MenuItem, useMenuStore } from '../store';

export const ManagerItems = () => {
    const cart = useMenuStore(state => state.cart);
    const menuitems = useMenuStore(state => state.menuItems);
    const decrement = useMenuStore(state => state.decrementCartEntryQuantity);
    const increment = useMenuStore(state => state.incrementCartEntryQuantity);
    const changeItemPrice = useMenuStore(state => state.changeItemPrice);
    const checkout = useMenuStore(state => state.checkout);
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

    // const [inputValue, setInputValue] = useState('');
    // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setInputValue(event.target.value);
    // };

    // const handleButtonClick = (menuId: number) => {
    //     clickCalled = true;
    //     // Convert the entered value to a float
    //     const floatValue = parseFloat(inputValue);

    //     // Check if it's a valid float
    //     if (!isNaN(floatValue)) {
    //         // Call your function with the float value
    //         changeItemPrice(menuId, floatValue);
    //     } else {
    //         // Handle invalid input (optional)
    //         console.error('Invalid float input');
    //     }
    // };

    return (
        <Paper style={{
            padding: '20px',
            margin: '10px',
            backgroundColor: '#f3f3f3',
        }}>
            <Button variant='contained'> Add Item +  </Button>
            <Typography variant="h5" style={{textAlign: 'center'}}>Point of Sale</Typography>
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
                                    {menuItem.name}
                                </TableCell>
                                <TableCell style={cellStyle} >
                                    {menuItem.price}
                                    <TextField
                                        label="Edit Price"
                                        variant="outlined"
                                        type="number"
                                        value={menuItem.price}
                                        onChange={(e) => changeItemPrice(menuItem.id, e.target.value as any)}
                                    />
                                    {/* <Button variant="contained" color="primary" onClick={() => handleButtonClick(menuItem.id)}>
                                        Call Function
                                    </Button> */}
                                </TableCell>
                                <TableCell style={cellStyle} >
                                    {menuItem.glutenFree ? "Yes" : "No"}
                                </TableCell><TableCell style={cellStyle} >
                                    {menuItem.vegan ? "Yes" : "No"}
                                </TableCell>
                                <TableCell style={cellStyle} >
                                    {menuItem.size}
                                </TableCell>
                                <TableCell style={cellStyle} >
                                    {menuItem.extrasauce ? "Yes" : "No"}
                                </TableCell>
                                <TableCell style={cellStyle} >

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
