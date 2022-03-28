import React, { useContext } from 'react';
import { Box, Grid, Typography, IconButton } from '@mui/material';
import UserCard from './UserCard';
import DeleteIcon from '@mui/icons-material/Delete';
import { AppContext } from '../App';
import DeleteRoomConfirmModal from './DeleteRoomConfirmModal';
import Spinner from './Spinner';

const Room = ({ room }) => {
    const appContext = useContext(AppContext);

    return (
        <React.Fragment>
        {
            appContext.state.spinners.isActiveRoomLoading
            ?
            <Spinner />
            :
            <React.Fragment>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center"
                    }}>
                    <Typography
                        variant="h5"
                        m={0} p={0}>
                        {room.name}
                    </Typography>
                {
                    !room.default && room.ownerId === appContext.state.user.id
                    ?
                    <React.Fragment>
                        <IconButton
                            sx={{
                                fontSize: "1rem",
                                marginLeft: '0.2rem',
                                padding: "0.1rem"
                            }}
                            onClick={() => {
                                appContext.dispatch({ type: "OPEN_DELETE_ROOM_CONFIRM_MODAL" });
                            }}>
                            <DeleteIcon
                                fontSize="1rem" />
                        </IconButton>
                    </React.Fragment>
                    :
                    null
                }
                </Box>
                <Grid
                    container
                    spacing={{
                        xs: 2,
                        md: 3
                    }}
                    columns={{
                        xs: 4,
                        sm: 8,
                        md: 12,
                        lg: 18
                    }}>
                    {
                        room.users.sort((u1, u2) => {
                            return (u1.id === appContext.state.user.id) - (u2.id === appContext.state.user.id)
                        }).reverse().map((user) => (
                            <Grid 
                                item 
                                xs={4} 
                                sm={8} 
                                md={6} 
                                lg={6} 
                                key={user.id}>
                                <UserCard user={user} />
                            </Grid>
                        ))
                    }
                </Grid>
                <DeleteRoomConfirmModal 
                    room={room} />
            </React.Fragment>
        }
        </React.Fragment>
    )
}

export default Room;