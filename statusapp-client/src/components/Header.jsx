import React, { useContext } from 'react';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import { Divider, AppBar, Toolbar, Typography, CssBaseline, IconButton, Menu, MenuItem } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import ThemeSwitch from './ThemeSwitch';
import { AppContext } from '../App';

const Header = () => {
    const appContext = useContext(AppContext);
    
    const [anchorSettingsEl, setAnchorSettingsEl] = React.useState(null);

    const handleSettingsMenu = (event) => {
        setAnchorSettingsEl(event.currentTarget);
    };

    const handleSettingsClose = () => {
        setAnchorSettingsEl(null);
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ 
                    zIndex: (theme) => theme.zIndex.drawer + 1 
                }}>
                <Toolbar>
                    <CoPresentIcon 
                        sx={{ 
                            paddingRight: "0.5rem",
                            fontSize: "2rem" 
                        }} />
                    <Typography 
                        sx={{ 
                            flexGrow: 1 
                        }}
                        variant="h6" 
                        noWrap component="div">
                        StatusApp
                    </Typography>
                    <IconButton
                        size="large"
                        aria-controls="settings-menu"
                        aria-haspopup="true"
                        onClick={handleSettingsMenu}
                        color="inherit">
                        <SettingsIcon />
                    </IconButton>
                    <Menu
                        id="setings-menu"
                        anchorEl={anchorSettingsEl}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorSettingsEl)}
                        onClose={handleSettingsClose}>
                        <MenuItem>
                            <ThemeSwitch />
                        </MenuItem>
                        <Divider />
                        <MenuItem
                            onClick={() => {
                                appContext.state.socket.disconnect();
                                appContext.dispatch({
                                    type: "RETURN_TO_DEFAULT_STATE"
                                });
                            }}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}

export default Header;