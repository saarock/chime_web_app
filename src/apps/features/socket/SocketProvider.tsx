// Import all the necessay dependencies;
import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { connect, disconnect } from './socketSlice';
import { useAuth, useSocket } from '../../../hooks';
import { SocketProviderProps } from '../../../types';


const SocketProvider = ({ children }: SocketProviderProps) => {
    const { isAuthenticated } = useAuth();
    const { isSocketConnected } = useSocket();

    const dispatch = useDispatch();

    const checkTheUserIsAuthenticatedOrNotIfYesThenMakeSocketConnectionIfNoThenDisconnect = useCallback(() => {
        // If the use is authenticated and the socket is not already connected then connected to the socket
        if (isAuthenticated && !isSocketConnected) {
            // If the user is valid or authenticated then connected to the socket by calling the socket action [connect() under the disptch]
            dispatch(connect());
        } else {
            // Else disconnecte the socket server 
            dispatch(disconnect());
        }
    }, [isAuthenticated, isSocketConnected]);


    useEffect(() => {
        checkTheUserIsAuthenticatedOrNotIfYesThenMakeSocketConnectionIfNoThenDisconnect();
    }, [isAuthenticated, isSocketConnected]);




    return (
        children
    )
}

export default SocketProvider