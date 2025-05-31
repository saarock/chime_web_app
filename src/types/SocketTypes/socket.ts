import { Socket } from "socket.io-client";

// Define the context with the socket type
export interface SocketContextType {
  socket: Socket;
}
