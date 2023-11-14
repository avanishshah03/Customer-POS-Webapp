import React, { useState } from "react";
import {
  Button,
  // ButtonGroup,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useMenuStore } from "../store";

interface ItemToAddProps {
  open: boolean;
  onClose: () => void;
}

export const ItemToAdd: React.FC<ItemToAddProps> = () => {
  // const [isAddItemDialogOpen, setAddItemDialogOpen] = useState(true);
  const menuitems = useMenuStore((state) => state.menuItems);
  const changeSize = useMenuStore((state) => state.changeSize);
  // const tableStyle = {
  //   border: "1px solid #ddd",
  //   width: "100%",
  // }

  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");

  const [glutenFree, setGlutenFree] = useState(false);
  const [vegan, setVegan] = useState(false);
  const [size, setSize] = useState<string | undefined>("");
  return (
    <>
      <Button onClick={() => setOpen(true)}>Add Item +</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Button
          onClick={() => {
            console.log(glutenFree);
            console.log(vegan);
            console.log(size);
          }}
        >
          Test
        </Button>
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
          <Typography>
            Gluten Free?
            <Checkbox onChange={() => setGlutenFree(!glutenFree)} />
          </Typography>
          <Typography>
            Vegan?
            <Checkbox onChange={() => setVegan(!vegan)} />
          </Typography>
          <Typography>
            Size?
            <Select
              labelId="size-select-label"
              id="size-select-label"
              value={undefined}
              label="menuitem.size"
              onChange={(e) => setSize(e.target.value)} //idk what this useState does but it works
            >
              <MenuItem value={"single"}>single</MenuItem>
              <MenuItem value={"double"}>double</MenuItem>
              <MenuItem value={"large"}>large</MenuItem>
              <MenuItem value={"regular"}>regular</MenuItem>
              <MenuItem value={"snack"}>snack</MenuItem>
              <MenuItem value={"plus"}>plus</MenuItem>
              <MenuItem value={"one piece"}>one piece</MenuItem>
              <MenuItem value={"none"}>none</MenuItem>
              <MenuItem value={"Medium"}>Medium</MenuItem>
              <MenuItem value={"two piece"}>two piece</MenuItem>
              <MenuItem value={"three piece"}>three piece</MenuItem>
            </Select>
          </Typography>

          <Typography>
            Extra Sauce?
            <Checkbox />
          </Typography>
          {/* Add more fields as needed */}

          <Button variant="contained" color="primary">
            Save
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};
