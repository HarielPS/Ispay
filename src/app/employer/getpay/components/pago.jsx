import React from 'react';
import { TextField,Typography, Button, Grid, Checkbox, FormControlLabel, Box } from '@mui/material';
import getColor from '@/themes/colorUtils';
import { useTheme } from '@mui/material';
// import QrReaderComponent from './getpayqr';

const PaymentForm = () => {
    const theme=useTheme();
    return (
        <Box sx={{ height: "100vh", display: "flex", alignItems: "center", backgroundColor: getColor(theme, 'background') }}>
            {/* <QrReaderComponent/> */}
        </Box>
      );
    };
    

export default PaymentForm;
