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
} from "@mui/material";
import { MenuItem, useMenuStore } from "../store";

export const CheckoutCart = ({ backgroundColor }: { backgroundColor?: string }) => {
    const cart = useMenuStore((state) => state.cart);
    const menuitems = useMenuStore((state) => state.menuItems);
    const decrement = useMenuStore((state) => state.decrementCartEntryQuantity);
    const increment = useMenuStore((state) => state.incrementCartEntryQuantity);
    const checkout = useMenuStore((state) => state.checkout);
    let totalPrice = 0;
    for (const item of cart) {
        const menuItem = menuitems.find((menuitem) => menuitem.id === item.itemId);
        if (menuItem) {
            totalPrice += menuItem.price * item.quantity;
        }
    }
    const tableStyle = {
        border: "1px solid #ddd",
        width: "100%",
    };
    const cellStyle = {
        border: "1px solid #ddd",
        padding: "8px",
    };
    return (
        <Paper
            style={{
                padding: "20px",
                textAlign: "center",
                backgroundColor: backgroundColor ?? "#f3f3f3",
            }}
        >
            <Typography variant="h5">Point of Sale</Typography>
            <TableContainer>
                <Table style={tableStyle}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={cellStyle}>
                                <Typography variant="h6">{"Items"}</Typography>
                            </TableCell>
                            <TableCell style={cellStyle}>
                                <Typography variant="h6">{"Price"}</Typography>
                            </TableCell>
                            <TableCell style={cellStyle}>
                                <Typography variant="h6">{"Quantity"}</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cart.map((item, itemIndex) => (
                            <TableRow key={itemIndex}>
                                <TableCell style={cellStyle}>
                                    {
                                        (
                                            menuitems.find(
                                                (menuitem) => menuitem.id === item.itemId
                                            ) as MenuItem
                                        ).name
                                    }
                                </TableCell>
                                <TableCell style={cellStyle}>
                                    {(
                                        (menuitems.find((menuitem) => menuitem.id === item.itemId)
                                            ?.price as number) * item.quantity
                                    )?.toFixed(2)}
                                </TableCell>
                                <TableCell style={cellStyle}>
                                    <Button
                                        color="error"
                                        size="small"
                                        variant="outlined"
                                        onClick={() => decrement(item.itemId)}
                                    >
                                        -
                                    </Button>
                                    {item.quantity}
                                    <Button
                                        color="success"
                                        size="small"
                                        variant="outlined"
                                        onClick={() => increment(item.itemId)}
                                    >
                                        +
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Typography variant="h6">
                Total Price: ${totalPrice.toFixed(2)}
            </Typography>
            <Button
                variant="contained"
                color="primary"
                style={{ marginTop: "20px" }}
                onClick={checkout}
            >
                Checkout
            </Button>
        </Paper>
    );
};
