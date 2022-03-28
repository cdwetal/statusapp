import React, { useState, useContext } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box, Grid, Card, CardContent, Button, CardActions, TextField, Typography, IconButton } from '@mui/material';
import { AppContext } from '../App';
import PersonIcon from '@mui/icons-material/Person';

const UserCard = ({ user }) => {
    const appContext = useContext(AppContext);

    const [status, setStatus] = useState("");
    const [editing, setEditing] = useState(false);

    const timeSince = (date) => {
        var seconds = Math.floor((new Date() - date) / 1000);
        var interval = seconds / 31536000;

        if (interval > 1) {
          return Math.floor(interval) + " y ago";
        }

        interval = seconds / 2592000;
        if (interval > 1) {
            return Math.floor(interval) + " m ago";
        }

        interval = seconds / 86400;
        if (interval > 1) {
            return Math.floor(interval) + " d ago";
        }

        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) + " hr ago";
        }

        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + " min ago";
        }

        if (Math.floor(seconds) !== 0) {
            return Math.floor(seconds) + " sec ago";
        }

        return "Now";
    }

    return (
        <React.Fragment>
            <Card 
                variant="outlined">
                <CardContent 
                    sx={{ 
                        paddingBottom: 0,
                    }}>
                    <Grid 
                        container 
                        alignItems="center" 
                        sx={{
                            marginBottom: 1
                        }}>
                        <Grid>
                            <Box 
                                display="flex" 
                                sx={{
                                    fontSize: "1.5rem"
                                }} 
                                alignItems="center" 
                                justifyContent="center">
                                <PersonIcon fontSize="1.5rem" />
                            </Box>
                            
                        </Grid>
                        <Grid>
                            <Typography 
                                sx={{
                                    marginBottom: 0
                                }}
                                variant="h5" 
                                component="div">
                                {appContext.state.user.id === user.id ? "Me" : user.username}
                            </Typography>        
                        </Grid>
                        <Grid 
                            sx={{ 
                                marginLeft: "auto"
                            }}>
                        {
                            appContext.state.user.id === user.id
                            ?
                            <IconButton 
                                sx={{
                                    fontSize: "1rem"
                                }}
                                onClick={e => setEditing(!editing)}>
                                <EditIcon 
                                    fontSize="1rem" />
                            </IconButton>
                            :
                            null
                        }
                        {
                            user.status
                            ?
                                <IconButton 
                                    sx={{
                                        fontSize: "1rem"
                                    }}
                                    onClick={() => {
                                        if (user.status !== null) {
                                            if (!user.status.favorites.includes(appContext.state.user.id)) {
                                                appContext.state.socket.emit("favoriteStatus", { statusId: user.status.id, userId: appContext.state.user.id });
                                            } else {
                                                appContext.state.socket.emit("unfavoriteStatus", { statusId: user.status.id, userId: appContext.state.user.id });
                                            }
                                        }
                                    }}>
                                    <Box 
                                        display="flex" 
                                        alignItems="center" 
                                        justifyContent="center">
                                        <FavoriteIcon 
                                            sx={{
                                                color: user.status.favorites.includes(appContext.state.user.id) ? '#FF0000' : null
                                            }}
                                            fontSize="1rem" />
                                        <Typography
                                            sx={{
                                                marginLeft: "0.2rem",
                                                fontSize: "0.75rem"
                                            }}
                                            component="span" >
                                            {user.status !== null ? user.status.favorites.length : 0}
                                        </Typography>
                                    </Box>
                                </IconButton>
                            :
                            null
                        } 
                        </Grid>
                    </Grid>
                    {
                        appContext.state.user.id === user.id && editing
                        ?
                        <TextField 
                            fullWidth
                            id="name" 
                            label="Status"
                            placeholder="Enter a new status..." 
                            variant="standard" 
                            multiline
                            rows={2}
                            InputProps={{
                                style: {
                                    fontSize: "0.875rem"
                                },
                                maxLength: 150
                            }}
                            inputProps={{
                                maxLength: 100
                            }}
                            autoFocus
                            value={status}
                            onChange={e => setStatus(e.target.value)} 
                            onKeyDown={e => {
                                if (e.keyCode === 13) {
                                    setEditing(false);
                                    appContext.state.socket.emit("updateUserStatus", { id: user.id, status: status });
                                    setStatus("");
                                }
                            }}
                        />
                        :
                        <React.Fragment>
                            <Typography 
                                variant="body2" 
                                color="text.secondary">
                                {user.status ? user.status.status : (appContext.state.user.id === user.id ? "You have not created a status yet!" : "This user has not set their status yet.") }
                            </Typography>
                            <Typography
                                fontSize="0.65rem"
                                variant="caption"
                                color="text.secondary">
                                {user.status ? timeSince(new Date(user.status.timestamp)) : "" }
                            </Typography>
                        </React.Fragment>
                    }
                </CardContent>
            {
                appContext.state.user.id === user.id && editing
                ?
                <CardActions>
                    <Grid 
                        container 
                        alignItems="center">
                        <Grid sx={{
                            marginLeft:"auto"
                        }}>
                            <Button 
                                id="save" 
                                size="small" 
                                color="primary" 
                                onClick={e => {
                                    setEditing(false);
                                    setStatus("");
                                }}>
                                Cancel
                            </Button>
                            <Button 
                                name="save" 
                                size="small" 
                                color="primary"
                                onClick={() => {
                                    setEditing(false);
                                    appContext.state.socket.emit("updateUserStatus", { id: user.id, status: status });
                                    setStatus("");
                                }}>
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </CardActions>
                :
                null
            }
            </Card>
        </React.Fragment>
    )
}

export default UserCard;
