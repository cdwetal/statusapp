import React, { useContext } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ThemeContext } from '../App';

const BaseTheme = ({ children }) => {
    const { theme } = useContext(ThemeContext)
    const theme1 = createTheme(
        {
            palette:
                { mode: theme }
        }
    );

    return (
        <ThemeProvider theme={theme1} >
            {children}
        </ThemeProvider>
    )
}

export default BaseTheme;