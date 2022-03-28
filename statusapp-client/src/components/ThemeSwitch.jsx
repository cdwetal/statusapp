import React, { useContext } from 'react';
import { FormGroup, FormControlLabel, Switch } from '@mui/material';
import { ThemeContext } from '../App';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
 
const ThemeSwitch = () => {
    const { theme, setTheme } = useContext(ThemeContext);

    return (
        <FormGroup>
            <FormControlLabel 
                control={
                    <Switch 
                        checked={theme === "dark"} 
                        onChange={e => {
                            cookies.set("theme", e.target.checked ? "dark" : "light", { path: '/' });
                            setTheme(e.target.checked ? "dark" : "light");
                        }} />
                } 
                label="Dark Mode" />
        </FormGroup>
    );
}

export default ThemeSwitch