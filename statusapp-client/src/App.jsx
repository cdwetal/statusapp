import React, { useState, useReducer, createContext, useEffect } from "react";
import io from "socket.io-client";
import Join from "./components/Join";
import { Toolbar, Box } from '@mui/material';
import Room from './components/Room';
import SideBar from "./components/SideBar";
import Header from './components/Header';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import CreateRoomModal from "./components/CreateRoomModal";
import { initialState, appReducer } from './GlobalState';
import BaseTheme from "./components/BaseTheme";
import Cookies from 'universal-cookie';
import axios from "axios";
import Spinner from "./components/Spinner";

const ENDPOINT = "http://localhost:3000";
const drawerWidth = 240;

export const AppContext = createContext();

const cookies = new Cookies();

export const ThemeContext = React.createContext({
    theme: cookies.get('theme'),
    setTheme: () => { }
});

const App = () => {
    const [state, dispatch] = useReducer(appReducer, initialState);
    const [theme, setTheme] = useState(cookies.get('theme'))
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (state.user !== null && state.socket === null) {
            connect(state.user.id);
        }
        if (state.activeRoom && location !== state.activeRoom.path) {
            navigate(state.activeRoom.path);
        }
        
    }, [state]);

    const createUser = async (username) => {
        let resCreate = await axios.post(`${ENDPOINT}/user`, { username: username });
        let resRead = await axios.get(`${ENDPOINT}/user/${resCreate.data.identifiers[0].id}`);
        dispatch({
            type: "SET_USER",
            data: {
                user: resRead.data
            }
        });
    }

    const connect = (id) => {
        const socket = io.connect(ENDPOINT, { query: `id=${id}` });
        socket.on("userConnected", async (data) => {
            dispatch({ 
                type: "SET_ROOMS&SET_ACTIVE_ROOM&SET_SOCKET", 
                data: { 
                    rooms: data.rooms,
                    socket: socket,
                    activeRoom: data.rooms.find((room) => room.default)
                }
            });
        });

        socket.on("userDisconnected", (data) => {
            dispatch( {
                type: "SET_ROOMS",
                data: {
                    rooms: data.rooms
                }
            });
        });

        socket.on("roomCreated", (data) => {
            dispatch( {
                type: "SET_ROOMS",
                data: {
                    rooms: data.rooms
                }
            });
        });

        socket.on("roomDeleted", (data) => {
            dispatch( {
                type: "SET_ROOMS",
                data: {
                    rooms: data.rooms
                }
            });
        });
    
        socket.on('userJoinedRoom', (data) => {
            dispatch({
                type: "SET_ROOMS",
                data: {
                    rooms: data.rooms
                }
            });
        });
    
        socket.on('userLeftRoom', (data) => {
            dispatch({
                type: "SET_ROOMS",
                data: {
                    rooms: data.rooms
                }
            });
        });

        socket.on("joinedRoom", (data) => {
            dispatch({
                type: "SET_ROOMS&SET_ACTIVE_ROOM&END_ACTIVE_ROOM_LOADING",
                data: {
                    rooms: data.rooms,
                    activeRoom: data.joinedRoom
                }
            });
            navigate(data.joinedRoom.path);
        });

        socket.on("userStatusUpdated", (data) => {
            dispatch( {
                type: "SET_ROOMS",
                data: {
                    rooms: data.rooms
                }
            });
        });

        socket.on("statusFavorited", (data) => {
            dispatch( {
                type: "SET_ROOMS",
                data: {
                    rooms: data.rooms
                }
            });
        });

        socket.on("statusUnfavorited", (data) => {
            dispatch( {
                type: "SET_ROOMS",
                data: {
                    rooms: data.rooms
                }
            });
        });
    }

    return (
        <React.Fragment>
            <AppContext.Provider value={{ state: state, dispatch: dispatch }}>
                <ThemeContext.Provider value={{ theme: theme, setTheme: setTheme }}>
                    
                    {
                        state.user === null
                        ?
                        <Join connect={connect} createUser={createUser} />
                        :
                        state.socket === null
                        ?
                        <BaseTheme>
                            <Spinner />
                        </BaseTheme>
                        :
                        <BaseTheme>
                            <Box sx={{ display: 'flex' }}>
                                <Header drawerWidth={drawerWidth} />
                                <SideBar drawerWidth={drawerWidth} />
                                <Box
                                    component="main"
                                    sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
                                >
                                    <Toolbar />

                                    <Routes>
                                        {state.rooms.map(room => (
                                            <Route key={room.id} path={room.path} element={<Room room={room} />} />
                                        ))}
                                    </Routes>

                                    <CreateRoomModal />
                                </Box>
                            </Box>
                        </BaseTheme>
                    }
                </ThemeContext.Provider>
            </AppContext.Provider>
        </React.Fragment>
    )
}

export default App;