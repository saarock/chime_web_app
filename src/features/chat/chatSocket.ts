
import { getChatSocket } from '../../config/socketManager';
import { AuthUtil, cookieUtil } from '../../utils';
import { ACCESS_TOKEN_KEY_NAME } from '../../constant';
import { refreshTokens } from '../../manager';



export const initChatSocketEvents = () => {
  const chatSocket = getChatSocket();

  if (!chatSocket) return;


  const accessToken = cookieUtil.get(ACCESS_TOKEN_KEY_NAME);
  chatSocket.auth = { accessToken };

  chatSocket.connect();


  // handel error;
  chatSocket.on("connect_error", (err) => {
    if (err.message === "AUTH_EXPIRED") {
      try {
        // IIFI function
        ; (async () => {
          const newAccessoken = await refreshTokens();
          cookieUtil.set(ACCESS_TOKEN_KEY_NAME, newAccessoken);
          chatSocket.auth = { accessToken: newAccessoken }
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
