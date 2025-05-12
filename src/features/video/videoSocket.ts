import { getSocket } from "../../config";

export const initVideoSocketEvents = () => {
  const socket = getSocket();

  if (!socket) return;

  socket.on('offer', (offer) => {
    // handle WebRTC offer
  });

  socket.on('answer', (answer) => {
    // handle WebRTC answer
  });

  socket.on('ice-candidate', (candidate) => {
    // handle ICE candidate
  });
};
