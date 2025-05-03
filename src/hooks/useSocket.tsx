import React, { useCallback, useEffect, useState } from 'react'
import { RootState } from '../types';
import { useSelector } from 'react-redux';
import { Socket } from 'socket.io-client';

/**
 * Use socket hook from where if the usser is authenticated then socket connected from the backend
 * @returns 
 */
const useSocket = () => {
    const reduxSocket = useSelector((state: RootState) => state.socket);
    const [isSocketConnected, setIsSocketConnected] = useState(false);
    const [socket, setSocket] = useState<Socket | null>(null);


    /**
     * This function checks that socket is connected or not to the backend
     * If the socket is connected to the backend then change the socketConnected state and setThe socket
     */
    const checkThatTheSocketIsAlreadyConnectedOrNot = useCallback(() => {
        if (reduxSocket.isConnected) {
            setSocket(reduxSocket.socket);
            setIsSocketConnected(true);
        } else {
            setIsSocketConnected(false)
            setSocket(null);
        }
    }, [socket]);

    useEffect(() => {
        checkThatTheSocketIsAlreadyConnectedOrNot();
    }, [socket]);

    return { isSocketConnected }
}

export default useSocket