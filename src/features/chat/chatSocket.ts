import { getSocket } from '../../config';


export const initChatSocketEvents = () => {
  const socket = getSocket();

  if (!socket) return;

  socket.on('chat-message', (msg) => {
 
  });

  socket.on('user-joined', (user) => {
    console.log(`${user} joined the chat`);
  });

  // more chat events...
};
