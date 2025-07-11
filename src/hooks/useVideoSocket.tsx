// Import all the necessary dependencies here
import { useEffect, useState } from "react";
import {
  disconnectVideoSocket,
  getVideoSocket,
  initVideoSocket,
} from "../config";
import { initVideoSocketEvents } from "../features";
import { Socket } from "socket.io-client";

const useVideoSocket = ({ isLocalStreamIsOn = false, isUserVerify = false }: { isLocalStreamIsOn?: boolean, isUserVerify?: boolean }) => {
  const [videoSocket, setVideoSocket] = useState<Socket | null>(null);


  /**
   * This useEffet hook helps to connect to the socket by checking the token if the tokens is there then user should connected to the chatSocket
   * @note run when the page mount or reload
   */
  useEffect(() => {
    if (!isLocalStreamIsOn || !isUserVerify) return; // If the localstream is off and user is not get verifyed from the server then don't allow to connected to the socket

    ;(() => {
      initVideoSocket();
      initVideoSocketEvents();
      setVideoSocket(getVideoSocket());
    })();


    // cleanup the video socket
    return () => {
      disconnectVideoSocket();
    };
  }, [isLocalStreamIsOn]);

  return { videoSocket };
};

export default useVideoSocket;
