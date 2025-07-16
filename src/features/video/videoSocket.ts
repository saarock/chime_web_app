import { getVideoSocket } from "../../config/socketManager";
import { refreshTokens } from "../../manager";
import { AuthUtil } from "../../utils";

export const initVideoSocketEvents = () => {
  const videoSocket = getVideoSocket();

  if (!videoSocket) return;

  // self connection
  videoSocket.connect();

  // handel error;
  videoSocket.on("connect_error", (err) => {
    if (err.message === "AUTH_EXPIRED") {
      try {
        // IIFI function
        (async () => {
          await refreshTokens(); // wait for the new access token 
          videoSocket.connect();
        })();
      } catch (error) {
        AuthUtil.clientSideLogout(); // logout the user if any error arrives
      }
    } else {
      AuthUtil.clientSideLogout(); // Logout the user from the client side
    }
  });
};
