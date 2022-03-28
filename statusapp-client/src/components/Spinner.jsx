import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

const Spinner = () => {
    return (
        <Box 
            display="flex" 
            alignItems="center" 
            justifyContent="center">
            <CircularProgress 
                size="2.5rem" />
            <Typography
                sx={{
                    marginLeft: "1rem"
                }} 
                variant="h5">
                Loading...
            </Typography>
        </Box>
    );
}

export default Spinner;