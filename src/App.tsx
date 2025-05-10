
// Start: Import necessary dependencies

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import { Contact, Home, LoginPage, RegisterPage } from "./pages/nonProtectedIndex";
import { NonProtectedPageProtector, PageProtector } from "./components";
import { ChatsPage, VideoCallPage } from "./pages/protectedIndex";
import { useEffect } from "react";
import { cookieUtil } from "./utils";
import { ACCESS_TOKEN_KEY_NAME, REFRESH_TOKEN_KEY_NAME } from "./constant";
import { initSocket } from "./config";
import { initChatSocketEvents, initVideoSocketEvents } from "./features";



const App = () => {

  /**
   * This useEffet hook helps to connect to the socket by checking the token if the tokens is there then user should connected to the socket
   * @note run when the page mount or reload
   */
  useEffect(() => {
    const accessToken = cookieUtil.get(ACCESS_TOKEN_KEY_NAME);
    const refreshToken = cookieUtil.get(REFRESH_TOKEN_KEY_NAME);
    if (accessToken && refreshToken) {
      initSocket(accessToken);
      initChatSocketEvents();
      initVideoSocketEvents();
    }
  }, []);

  return (

    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
          // Non-Protected page
            <Route index element={<NonProtectedPageProtector><Home /></NonProtectedPageProtector>} />
            <Route path="/contact" element={<NonProtectedPageProtector><Contact /></NonProtectedPageProtector>} />
            <Route path="/login" element={<NonProtectedPageProtector><LoginPage /></NonProtectedPageProtector>} />
            <Route path="/register" element={<NonProtectedPageProtector><RegisterPage /></NonProtectedPageProtector>} />

            // Protected page
            <Route path="/chats" element={<PageProtector><ChatsPage /></PageProtector>} />
            <Route path="/video-calls" element={<PageProtector><VideoCallPage /></PageProtector>} />

          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App