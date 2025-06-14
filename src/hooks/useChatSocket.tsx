// Import all the necessary dependencies here
import { useEffect, useState } from "react";
import { cookieUtil } from "../utils";
import { ACCESS_TOKEN_KEY_NAME, REFRESH_TOKEN_KEY_NAME } from "../constant";
import { getChatSocket, initChatSocket } from "../config";
import { initChatSocketEvents } from "../features";
import { Socket } from "socket.io-client";

const useChatSocket = ({
   isLocalStreamIsOn = false, 
   isUserVerify = false 
  }: { isLocalStreamIsOn?: boolean, isUserVerify?: boolean }) => {

  const [chatSocket, setChatSocket] = useState<Socket | null>(null);

  // All the hook goes here;
  /**
   * This useEffet hook helps to connect to the socket by checking the token if the tokens is there then user should connected to the chatSocket
   * @note run when the page mount or reload
   */
  useEffect(() => {
    if (!isLocalStreamIsOn || !isUserVerify) return; // If the localstream is off and user is not get verifyed from the server then don't allow to connected to the socket
    const accessToken = cookieUtil.get(ACCESS_TOKEN_KEY_NAME);
    const refreshToken = cookieUtil.get(REFRESH_TOKEN_KEY_NAME);
    if (accessToken && refreshToken) {
      initChatSocket();
      initChatSocketEvents();
      setChatSocket(getChatSocket());
    }
  }, []);


  return { chatSocket }
};

export default useChatSocket;
