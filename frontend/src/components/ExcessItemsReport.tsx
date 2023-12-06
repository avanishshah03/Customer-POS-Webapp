import { Paper } from '@mui/material';
import { useEffect } from 'react';
import axios from '../config/axiosConfig';




export const ExcessItemsReport = () => {

    useEffect(() => {
        axios.get("/salesReport", {
            params: {
                startDate: new Date("2021-10-01").toISOString(),
                endDate: new Date().toISOString(),
            }
        }).then((res) => {
            console.log(res.data);
        });
    }, [])

    return (
        <Paper style={{
            padding: '20px',
            margin: '10px',
            backgroundColor: '#f3f3f3',
        }}>hello</Paper>
    );
}