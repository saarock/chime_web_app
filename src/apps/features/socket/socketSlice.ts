// Import all the necessary dependencies from Redux Toolkit, types, socket client and socketTypes
import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";
import { Socket } from "../../../types";




// Socket backned URL to make connection
const URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:8000";

// Initial state structure for the socket 
const initialState: Socket = {
    isConnected: false,
    socket: null
}

// Socket slice to handel the socket from all the pages 
const socketSlice = createSlice({
    name: "socket",
    initialState, // InitialState 
    reducers: {
        // Connect action to connect the socket backend [Server]
        connect: (state) => {
            if (!state.socket) {
                state.socket = io(URL);
                state.isConnected = true;
            }
        },
        //Disconnect action to disconnt the socket from the backend [Server]
        disconnect: (state) => {
            if (state.socket) {
                state.socket.disconnect();
                state.isConnected = false;
                state.socket = null;
            }
        }
    }
});


// Export the reducer and action from the socketSlice 
export const { connect, disconnect } = socketSlice.actions;
export default socketSlice.reducer;
