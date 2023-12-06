import { Button, Tab, Tabs } from '@mui/material';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import { positions } from '@mui/system';
import React from 'react';
import { ManagerIngredients } from './components/ManagerIngredients';
import { SalesReport } from './components/SalesReport';
import { ManagerItems } from './components/ManagerItems';
import OrderTable from './components/OrderTable';
import { IngredientUsageReport } from './components/IngredientUsageReport';
import { ExcessItemsReport } from './components/ExcessItemsReport';
import { RestockReport } from './components/RestockReport';
import { OrderedTogetherReport } from './components/OrderedTogetherReport';
import './LandingPage.css';

export const Manager: React.FC = () => {
    const [value, setValue] = React.useState(0);
    const customButtonStyle = {
        zIndex: '999',
        color: 'white',
        top: '40px',
        left: '95%',
        padding: '10px',
        backgroundColor: 'blue'

    };
    return (
        <>
        
                <Link to="/" >
                    <Button style={customButtonStyle} className="button-hover-effect">
                        Home
                    </Button>
                </Link>
                <Box>
                    
                <Tabs value={value} onChange={(_, newValue) => setValue(newValue)}>
                    <Tab label="Items" />
                    <Tab label="Inventory" />
                    <Tab label="Orders" />
                    <Tab label="Sales Report" />
                    <Tab label="Ingredient Usage Report" />
                    <Tab label="Excess Items Report" />
                    <Tab label="Restock Report" />
                    <Tab label="Ordered Together Report" />
                </Tabs>
            </Box>
            <div hidden={value != 0}><ManagerItems /></div>
            <div hidden={value != 1}><ManagerIngredients /></div>
            <div hidden={value != 2}><OrderTable /></div>
            <div hidden={value != 3}><SalesReport /></div>
            <div hidden={value != 4}><IngredientUsageReport /></div>
            <div hidden={value != 5}><ExcessItemsReport /></div>
            <div hidden={value != 6}><RestockReport /></div>
            <div hidden={value != 7}><OrderedTogetherReport /></div>
        </>
    )
}