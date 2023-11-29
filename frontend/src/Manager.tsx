import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import { Tab, Tabs } from '@mui/material';
import { ManagerItems } from './components/ManagerItems';
import { ManagerIngredients } from './components/ManagerIngredients';

export const Manager: React.FC = () => {
    const [value, setValue] = React.useState(0);
    return (
        <>
            <Box>
                <Tabs value={value} onChange={(_, newValue) => setValue(newValue)}>
                    <Tab label="Items" />
                    <Tab label="Inventory" />
                    <Tab label="Reports" />
                </Tabs>
            </Box>
            <div hidden={value != 0}><ManagerItems /></div>
            <div hidden={value != 1}><ManagerIngredients /></div>
        </>
    )

}