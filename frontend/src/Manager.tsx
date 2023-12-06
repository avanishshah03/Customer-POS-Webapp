import { Tab, Tabs } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import { ManagerIngredients } from './components/ManagerIngredients';
import { SalesReport } from './components/SalesReport';
import { ManagerItems } from './components/ManagerItems';
import OrderTable from './components/OrderTable';

export const Manager: React.FC = () => {
    const [value, setValue] = React.useState(0);
    return (
        <>
            <Box>
                <Tabs value={value} onChange={(_, newValue) => setValue(newValue)}>
                    <Tab label="Items" />
                    <Tab label="Inventory" />
                    <Tab label="Sales Report" />
                    <Tab label="Orders" />
                </Tabs>
            </Box>
            <div hidden={value != 0}><ManagerItems /></div>
            <div hidden={value != 1}><ManagerIngredients /></div>
            <div hidden={value != 2}><SalesReport /></div>
            <div hidden={value != 3}><OrderTable /></div>
        </>
    )
}