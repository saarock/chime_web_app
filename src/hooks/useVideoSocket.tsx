import { useEffect } from 'react'
import { cookieUtil } from '../utils';
import { ACCESS_TOKEN_KEY_NAME, REFRESH_TOKEN_KEY_NAME } from '../constant';
import { disconnectSockets, disconnectVideoSocket, initVideoSocket } from '../config';
import { initVideoSocketEvents } from '../features';

const useVideoSocket = () => {

    /**
     * This useEffet hook helps to connect to the socket by checking the token if the tokens is there then user should connected to the chatSocket
     * @note run when the page mount or reload
     */
    useEffect(() => {
        const accessToken = cookieUtil.get(ACCESS_TOKEN_KEY_NAME);
        const refreshToken = cookieUtil.get(REFRESH_TOKEN_KEY_NAME);
        if (accessToken && refreshToken) {
            initVideoSocket();
            initVideoSocketEvents();

        }

        // cleanup the video socket
        return (() => {
            disconnectVideoSocket();
        })
    }, []);
}

export default useVideoSocket