import React, { useState } from 'react';
import { TextField, Button, Box, InputAdornment, Typography, Paper, Grid } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import CoPresentIcon from '@mui/icons-material/CoPresent';

const Join = ({ createUser }) => {
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [username, setUsername] = useState("");

    return (
        <React.Fragment>
            <Grid
                container
                spacing={0}
                direction="row"
                alignItems="center"
                justifyContent="center"
                sx={{ 
                    minHeight: '100vh' 
                }}
            >
                <Grid 
                    item 
                    lg={4}>
                    <Box 
                        p={5} 
                        textAlign="center">
                        <CoPresentIcon 
                            sx={{ 
                                fontSize: "220pt" 
                            }} />
                        <Typography 
                            variant="h2" 
                            component="div">
                            StatusApp
                        </Typography>
                        <Typography 
                            variant="body2" 
                            component="div">
                            Let the world know your status
                        </Typography>
                    </Box>
                </Grid>
                <Grid 
                    item 
                    lg={4}>
                    <Paper 
                        elevation={5} 
                        sx={{ 
                            width: "25em" 
                        }}>
                        <Box 
                            p={5} 
                            textAlign="center">
                            <Box 
                                p={1}>
                                <Typography 
                                    variant="h4" 
                                    component="div">
                                    Join StatusApp!
                                </Typography>
                                <Typography 
                                    variant="body2" 
                                    component="div">
                                    Create a username to join StatusApp
                                </Typography>
                            </Box>
                            <Box 
                                p={1}>
                                <TextField
                                    error={error}
                                    helperText={errorText}
                                    id="username"
                                    placeholder="Username"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AccountCircle />
                                            </InputAdornment>
                                        )
                                    }}
                                    inputProps={{
                                        maxLength: 50
                                    }}
                                    sx={{ 
                                        m: 1, 
                                        width: '12.5em' 
                                    }}
                                    variant="standard"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                />
                            </Box>
                            <Box p={1}>
                                <Button
                                    id="connect"
                                    onClick={async () => {
                                        if (username.trim() === "") {
                                            setError(true);
                                            setErrorText("You must enter a unsername");
                                        } else {
                                            setError(false);
                                            setErrorText("Enter a unique username");
                                            await createUser(username);
                                        }
                                    }}
                                >
                                    Join
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default Join;