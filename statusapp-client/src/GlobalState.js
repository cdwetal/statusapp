export const initialState = {
    user: null,
    socket: null,
    rooms: [],
    activeRoom: null,
    defaultRoom: null,
    modals: {
        isCreateRoomModalOpen: false,
        isDeleteRoomConfirmModalOpen: false
    },
    spinners: {
        isActiveRoomLoading: false
    }
}

export const appReducer = (state, action) => {
    const actions = action.type.split("&");

    let newState = state;
    
    for (let s of actions) {
        switch (s) {
            case "SET_USER":
                newState = {
                    ...newState,
                    user: action.data.user
                }
                break;
            case "SET_SOCKET":
                newState = {
                    ...newState,
                    socket: action.data.socket
                }
                break;
            case "SET_ROOMS":
                newState = {
                    ...newState,
                    rooms: action.data.rooms,
                    defaultRoom: action.data.rooms.find((room) => room.default),
                }
                break;
            case "SET_ACTIVE_ROOM":
                newState = {
                    ...newState,
                    activeRoom: action.data.activeRoom
                }
                break;
            case "SET_DEFAULT_ROOM":
                newState = {
                    ...newState,
                    defaultRoom: action.data.defaultRoom
                }
                break;
            case "START_ACTIVE_ROOM_LOADING":
                newState = {
                    ...newState,
                    spinners: {
                        ...newState.spinners,
                        isActiveRoomLoading: true
                    }
                }
                break;
            case "END_ACTIVE_ROOM_LOADING":
                newState = {
                    ...newState,
                    spinners: {
                        ...newState.spinners,
                        isActiveRoomLoading: false
                    }
                }
                break;
            case "OPEN_CREATE_ROOM_MODAL":
                newState = {
                    ...newState,
                    modals: {
                        ...newState.modals,
                        isCreateRoomModalOpen: true
                    }
                }
                break;
            case "CLOSE_CREATE_ROOM_MODAL":
                newState = {
                    ...newState,
                    modals: {
                        ...newState.modals,
                        isCreateRoomModalOpen: false
                    }
                }
                break;
            case "OPEN_DELETE_ROOM_CONFIRM_MODAL":
                newState = {
                    ...newState,
                    modals: {
                        ...newState.modals,
                        isDeleteRoomConfirmModalOpen: true
                    }
                }
                break;
            case "CLOSE_DELETE_ROOM_CONFIRM_MODAL":
                newState = {
                    ...newState,
                    modals: {
                        ...newState.modals,
                        isDeleteRoomConfirmModalOpen: false
                    }
                }
                break;
            case "RETURN_TO_DEFAULT_STATE":
                newState = initialState;
                break;
            default:
                break;
        }
    }

    if (newState.activeRoom && !newState.rooms.find((room) => room.id === newState.activeRoom.id)) {
        newState.spinners.isActiveRoomLoading = true;
        newState.socket.emit("leaveRoom", { id: newState.activeRoom.id });
        newState.socket.emit("joinRoom", { id: newState.defaultRoom.id });
        newState.activeRoom = newState.defaultRoom;
    }

    return newState;
}