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
import { useMenuStore } from "../store";
import { ItemToAdd } from "./ItemToAdd";
import { useState } from "react";

// https://stackoverflow.com/questions/42761068/paginate-javascript-array
function paginate<T>(array: T[], pageSize: number, pageNumber: number): T[] {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
}

const pageSize = 10;

export const ManagerItems = () => {
    const [isAddItemDialogOpen, setAddItemDialogOpen] = useState(true);
    const cart = useMenuStore((state) => state.cart);
    const menuitems = useMenuStore((state) => state.menuItems);
    const [page, setPage] = useState(1);
    const changeItemPrice = useMenuStore((state) => state.changeItemPrice);
    const changeGF = useMenuStore((state) => state.changeGF);
    const changeVegan = useMenuStore((state) => state.changeVegan);
    const changeExtraSauce = useMenuStore((state) => state.changeExtraSauce);
    const changeSize = useMenuStore((state) => state.changeSize);
    const changeItemName = useMenuStore((state) => state.changeItemName);
    const deleteMenuItem = useMenuStore((state) => state.deleteMenuItem);

    const tableStyle = { width: "100%", };
    const cellStyle = { padding: "8px", };


    return (
        <Paper
            style={{
                padding: "20px",
                margin: "10px",
                backgroundColor: "#f3f3f3",
            }}
        >
            <ItemToAdd
                open={isAddItemDialogOpen}
                onClose={() => setAddItemDialogOpen(false)}
            />
            <Typography variant="h5" style={{ textAlign: "center" }}>
                Point of Sale
            </Typography>
            <Pagination count={Math.ceil(menuitems.length / pageSize)} onChange={(e, v) => setPage(v)} />
            <TableContainer>
                <Table style={tableStyle}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={cellStyle}>
                                <Typography variant="h6">{"ID"}</Typography>
                            </TableCell>
                            <TableCell style={cellStyle}>
                                <Typography variant="h6">{"Names"}</Typography>
                            </TableCell>
                            <TableCell style={cellStyle}>
                                <Typography variant="h6">{"Price"}</Typography>
                            </TableCell>
                            <TableCell style={cellStyle}>
                                <Typography variant="h6">{"Gluten Free"}</Typography>
                            </TableCell>
                            <TableCell style={cellStyle}>
                                <Typography variant="h6">{"Vegan"}</Typography>
                            </TableCell>
                            <TableCell style={cellStyle}>
                                <Typography variant="h6">{"Size"}</Typography>
                            </TableCell>
                            <TableCell style={cellStyle}>
                                <Typography variant="h6">{"Extra Sauce"}</Typography>
                            </TableCell>
                            <TableCell style={cellStyle}>
                                <Typography variant="h6">{"Delete Item"}</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginate(menuitems, pageSize, page).map((menuItem, itemIndex) => (
                            <TableRow key={itemIndex}>
                                <TableCell style={cellStyle}>{menuItem.id}</TableCell>
                                <TableCell style={cellStyle}>
                                    <TextField
                                        variant="outlined"
                                        type="string"
                                        value={menuItem.name}
                                        onChange={(e) =>
                                            changeItemName(menuItem.id, e.target.value as any)
                                        }
                                    />
                                </TableCell>
                                <TableCell style={cellStyle}>
                                    <TextField
                                        variant="outlined"
                                        type="number"
                                        value={menuItem.price}
                                        onChange={(e) =>
                                            changeItemPrice(menuItem.id, e.target.value as any)
                                        }
                                    />
                                </TableCell>
                                <TableCell style={cellStyle}>
                                    <Checkbox
                                        checked={menuItem.glutenFree}
                                        onChange={(e) => changeGF(menuItem.id)}
                                    />
                                </TableCell>
                                <TableCell style={cellStyle}>
                                    <Checkbox
                                        checked={menuItem.vegan}
                                        onChange={(e) => changeVegan(menuItem.id)}
                                    />
                                </TableCell>
                                <TableCell style={cellStyle}>
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
                                <TableCell style={cellStyle}>
                                    <Checkbox
                                        checked={menuItem.extrasauce}
                                        onChange={(e) => changeExtraSauce(menuItem.id)}
                                    />
                                </TableCell>
                                <TableCell style={cellStyle}>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => deleteMenuItem(menuItem.id)}
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
};
