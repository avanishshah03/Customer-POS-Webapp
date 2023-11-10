import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

interface ItemToAddProps {
  open: boolean;
  onClose: () => void;
}

const ItemToAdd: React.FC<ItemToAddProps> = () => {
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");


  return (
    <>
      <Button onClick={() => setOpen(true)}>
        {" "}
        {/* Updated this line */}
        Add Item +
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Item</DialogTitle>
        <DialogContent>
          <TextField
            label="Item Name"
            variant="outlined"
            fullWidth
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Item Price"
            variant="outlined"
            fullWidth
            value={itemPrice}
            onChange={(e) => setItemPrice(e.target.value)}
            margin="normal"
          />
          {/* Add more fields as needed */}

          <Button variant="contained" color="primary">
            Save
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ItemToAdd;
