import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

let chatSocket: Socket<DefaultEventsMap, DefaultEventsMap> | null = null;
let videoSocket: Socket<DefaultEventsMap, DefaultEventsMap> | null = null;

/**
 * Initialize both sockets with the token after user login
 */
export const initChatSocket = () => {
  if (!chatSocket) {
    chatSocket = io("http://localhost:8000/chat", {
      autoConnect: false,
      withCredentials: true,
    });
  }

  return { chatSocket };
};

export const initVideoSocket = () => {
  if (!videoSocket) {
    videoSocket = io("https://25c4-2404-7c00-43-c7da-a1fb-ef8b-bb6c-da93.ngrok-free.app/video", {
      autoConnect: false,
      withCredentials: true,
    });
  }
  return { videoSocket };
};

/**
 * Get chat socket instance
 */
export const getChatSocket = () => chatSocket;

/**
 * Get video socket instance
 */
export const getVideoSocket = () => videoSocket;

/**
 * Disconnect all sockets on logout
 */
export const disconnectSockets = () => {
  if (chatSocket) {
    chatSocket.disconnect();
    chatSocket = null;
  }
  if (videoSocket) {
    videoSocket.disconnect();
    videoSocket = null;
  }
};

/**
 * Disconnect video-socket
 */
export const disconnectVideoSocket = () => {
  if (videoSocket) {
    videoSocket.disconnect();
    videoSocket = null;
  }
};

/**
 * Disconnect chat-socket
 */
export const disconnectChatSocket = () => {
  if (chatSocket) {
    chatSocket.disconnect();
    chatSocket = null;
  }
};
