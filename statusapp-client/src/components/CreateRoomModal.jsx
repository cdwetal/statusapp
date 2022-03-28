import React, { useState, useContext } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { AppContext } from '../App';

const CreateRoomModal = () => {
    const appContext = useContext(AppContext);
    
    const [name, setName] = useState("");

    return (
        <React.Fragment>
            <Modal
                open={appContext.state.modals.isCreateRoomModalOpen}
                onClose={() => {
                    setName("");
                    appContext.dispatch({ type: "CLOSE_CREATE_ROOM_MODAL" });
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
                            id="modal-modal-title" 
                            variant="h6" component="h2">
                            Create Room
                        </Typography>
                        <Typography 
                            id="modal-modal-title" 
                            variant="body2" 
                            component="h2">
                            Create a new room with a custom title. You may delete this room at any time after it is created.
                        </Typography>
                    </Box>
                    <Box 
                        p={1}>
                        <TextField 
                            fullWidth 
                            id="name" 
                            label="Room Name" 
                            variant="standard" 
                            value={name} 
                            onChange={e => setName(e.target.value)} />
                    </Box>
                    <Box 
                        p={1} 
                        textAlign="center">
                        <Button 
                            id="cancel" 
                            onClick={() => {
                                setName("");
                                appContext.dispatch({ type: "CLOSE_CREATE_ROOM_MODAL" });
                            }}>
                            Cancel
                        </Button>
                        <Button 
                            id="create" 
                            onClick={() => {
                                appContext.state.socket.emit("createRoom", { room: { name: name, ownerId: appContext.state.user.id }});
                                setName("");
                                appContext.dispatch({ type: "CLOSE_CREATE_ROOM_MODAL" });
                            }}>
                            Create
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </React.Fragment>
    )
}

export default CreateRoomModal;