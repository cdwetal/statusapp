import React, { useContext } from 'react';
import { Box, Chip, Toolbar, Drawer, Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import PeopleIcon from '@mui/icons-material/People';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import AccountCircle from '@mui/icons-material/AccountCircle';

const SideBar = ({ drawerWidth, joinRoom }) => {
    const appContext = useContext(AppContext);

    return (
        <React.Fragment>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    }
                }}
                variant="permanent"
                anchor="left">
                <Toolbar />
                <Divider />
                <Box 
                    p={1}
                    display="flex" 
                    alignItems="center" 
                    justifyContent="center" 
                    flexDirection="column">
                    <Box
                        display="flex" 
                        alignItems="center" 
                        sx={{
                            fontSize: "6.5rem"
                        }}>
                        <AccountCircle 
                            fontSize="6.5rem" />
                    </Box>
                    <Typography
                        variant="body2" 
                        component="span">
                        {appContext.state.user.username}
                    </Typography>
                </Box>                
                <Divider />
                <List>
                {
                    appContext.state.rooms.map((room) => (
                        <ListItem
                            key={room.id}
                            button
                            component={Link}
                            to={room.path}
                            selected={appContext.state.activeRoom ? appContext.state.activeRoom.path === room.path : false }
                            onClick={() => {
                                appContext.dispatch({ type: "START_ACTIVE_ROOM_LOADING" });
                                if (appContext.state.activeRoom !== null) 
                                    appContext.state.socket.emit("leaveRoom", { id: appContext.state.activeRoom.id });
                                appContext.state.socket.emit("joinRoom", { id: room.id });
                            }}>
                            <ListItemIcon>
                            {
                                room.default
                                ?
                                <HomeIcon />
                                :
                                <PeopleIcon />
                            }
                            </ListItemIcon>
                            <ListItemText 
                            primary={room.name} />
                            <Chip 
                                size="small" 
                                label={room.users.length} />
                        </ListItem>
                    ))
                }
                </List>
                <Divider />
                <List>
                    <ListItem
                        button
                        onClick={() => appContext.dispatch({ type: "OPEN_CREATE_ROOM_MODAL" })}>
                        <ListItemIcon>
                            <AddIcon />
                        </ListItemIcon>
                        <ListItemText primary="Create Room" />
                    </ListItem>
                </List>
            </Drawer>

        </React.Fragment>
    )
}

export default SideBar;