import { getVideoSocket } from "../../config/socketManager";
import { ACCESS_TOKEN_KEY_NAME } from "../../constant";
import { refreshTokens } from "../../manager";
import { AuthUtil, cookieUtil } from "../../utils";

export const initVideoSocketEvents = () => {
  const videoSocket = getVideoSocket();

  if (!videoSocket) return;

  const accessToken = cookieUtil.get(ACCESS_TOKEN_KEY_NAME);
  videoSocket.auth = { accessToken };

  // self connection
  videoSocket.connect();

  // handel error;
  videoSocket.on("connect_error", (err) => {
    if (err.message === "AUTH_EXPIRED") {
      try {
        // IIFI function
        (async () => {
          const newAccessoken = await refreshTokens();
          cookieUtil.set(ACCESS_TOKEN_KEY_NAME, newAccessoken);
          videoSocket.auth = { accessToken: newAccessoken };
          videoSocket.connect();
        })();
      } catch (error) {
        // AuthUtil.clientSideLogout(); // logout the user if any error arrives
      }
    } else {
      // AuthUtil.clientSideLogout(); // Logout the user from the client side
    }
  });
};
