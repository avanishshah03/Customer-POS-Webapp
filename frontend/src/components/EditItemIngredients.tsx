import {
  Autocomplete,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Pagination,
  TextField,
} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';



import React, { useState } from "react";

import { useMenuStore, type MenuItem } from "../store";

interface EditItemIngredientsProps {
  menuItem: MenuItem
}


export const EditItemIngredients: React.FC<EditItemIngredientsProps> = ({ menuItem }) => {
  const [searchText, setSearchText] = useState("");
  const ingredients = useMenuStore((state) => state.ingredients);
  const filteredIngredients = ingredients.filter(v => v.name.toLowerCase().includes(searchText.toLowerCase()));
  const [page, setPage] = useState(1);

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const saveClose = () => {

  };

  
  

  return (
    <>
      
    
      <Button onClick={() => setOpen(true)} variant="outlined" color="secondary" size="small">Edit Ingredients</Button>
      
      <Dialog
        open={open}
        
        maxWidth="md"
        fullScreen
      >
         <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
                >
                <CloseIcon />
              </IconButton>

              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Editing the ingredients of {menuItem.name}
              </Typography>
            </Toolbar>
          </AppBar>
        
        <DialogContent>
          <Autocomplete
            multiple
            disablePortal
            id="combo-box-demo"
            options={ingredients}
            getOptionLabel={(ingredients) => ingredients.name}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Ingredient" />}
          />

          <Button variant="contained" color="primary" onClick={handleClose}>
            Save
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

