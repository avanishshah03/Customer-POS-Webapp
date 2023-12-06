import { Tab, Tabs } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import UserTable from './components/UserTable';

export const Admin: React.FC = () => {
    const [value, setValue] = React.useState(0);
    return (
        <React.Fragment>
            <Box>
                <Tabs value={value} onChange={(_, newValue) => setValue(newValue)}>
                    <Tab label="Users" />
                </Tabs>
            </Box>
            <div hidden={value != 0}><UserTable /></div>
        </React.Fragment>
    )
}