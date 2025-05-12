import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

let socket: Socket<DefaultEventsMap | DefaultEventsMap> | null = null;


/**
 * This function helps to initialize the socket after the user login
 * @param accessToken AccessToken for authentication
 * @returns SOCKET
 */
export const initSocket = (accessToken: string) => {
    if (!socket) {
        socket = io("http://localhost:8000/", {
            auth: { accessToken }
        })
    }

    return socket;
}

/**
 * 
 * @returns Socket<DefaultEventsMap | DefaultEventsMap> if the userIsLogin other wise return null
 */
export const getSocket = () => socket;



/**
 * This function helps to disconnect the socket when the user is logout
 */
export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
}

