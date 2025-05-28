// Import all the necessary dependencies here
import { useEffect, useState } from "react";
import { cookieUtil } from "../utils";
import { ACCESS_TOKEN_KEY_NAME, REFRESH_TOKEN_KEY_NAME } from "../constant";
import {
  disconnectVideoSocket,
  getVideoSocket,
  initVideoSocket,
} from "../config";
import { initVideoSocketEvents } from "../features";
import { Socket } from "socket.io-client";

const useVideoSocket = ({ isLocalStreamIsOn = false }: { isLocalStreamIsOn?: boolean }) => {
  const [videoSocket, setVideoSocket] = useState<Socket | null>(null);

  /**
   * This useEffet hook helps to connect to the socket by checking the token if the tokens is there then user should connected to the chatSocket
   * @note run when the page mount or reload
   */
  useEffect(() => {
    if (!isLocalStreamIsOn) return;
    const accessToken = cookieUtil.get(ACCESS_TOKEN_KEY_NAME);
    const refreshToken = cookieUtil.get(REFRESH_TOKEN_KEY_NAME);
    if (accessToken && refreshToken) {
      initVideoSocket();
      initVideoSocketEvents();
      setVideoSocket(getVideoSocket());
    }

    // cleanup the video socket
    return () => {
      disconnectVideoSocket();
    };
  }, [isLocalStreamIsOn]);

  return { videoSocket };
};

export default useVideoSocket;
