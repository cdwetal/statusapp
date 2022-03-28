import React, { useContext } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { AppContext } from '../App';

const DeleteRoomConfirmModal = ({ room }) => {
    const appContext = useContext(AppContext);

    return (
        <React.Fragment>
            <Modal
                open={appContext.state.modals.isDeleteRoomConfirmModalOpen}
                onClose={() => {
                    appContext.dispatch({ type: "CLOSE_DELETE_ROOM_CONFIRM_MODAL" });
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '1px solid #000',
                    boxShadow: 24,
                    p: 3,
                }}>
                    <Box p={1}>
                        <Typography 
                            variant="h6" 
                            component="h2">
                            Delete Room
                        </Typography>
                        <Typography 
                            variant="body2" 
                            component="h2">
                            Are you sure you would like to delete the room {room.name}?
                        </Typography>
                    </Box>
                    <Box 
                        p={1} 
                        textAlign="center">
                        <Button 
                            id="cancel" 
                            onClick={() => {
                                appContext.dispatch({ type: "CLOSE_DELETE_ROOM_CONFIRM_MODAL" });
                            }}>
                            Cancel
                        </Button>
                        <Button 
                            id="delete" 
                            onClick={() => {
                                appContext.dispatch({ type: "START_ACTIVE_ROOM_LOADING&CLOSE_DELETE_ROOM_CONFIRM_MODAL" });
                                appContext.state.socket.emit("deleteRoom", { id: room.id });
                                if (appContext.state.activeRoom !== null) 
                                    appContext.state.socket.emit("leaveRoom", { id: appContext.state.activeRoom.id });
                                appContext.state.socket.emit("joinRoom", { id: appContext.state.defaultRoom.id });
                            }}>
                            Delete
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </React.Fragment>
    )
}

export default DeleteRoomConfirmModal;