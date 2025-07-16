import { getChatSocket } from "../../config/socketManager";
import { AuthUtil } from "../../utils";
import { refreshTokens } from "../../manager";

export const initChatSocketEvents = () => {
  const chatSocket = getChatSocket();

  if (!chatSocket) return;


  chatSocket.connect();

  // handel error;
  chatSocket.on("connect_error", (err) => {
    if (err.message === "AUTH_EXPIRED") {
      try {
        // IIFI function
        (async () => {
          await refreshTokens();
          chatSocket.connect();
        })();
      } catch (error) {
        AuthUtil.clientSideLogout(); // logout the user if any error arrives
      }
    } else {
      AuthUtil.clientSideLogout(); // Logout the user from the client side
    }
  });

  /**
   * Socket chat events start from here ;
   */
};
