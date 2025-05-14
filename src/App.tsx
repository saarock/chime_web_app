
// Start: Import necessary dependencies

import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
// import { Contact, Home, LoginPage, RegisterPage } from "./pages/nonProtectedIndex";
import { NonProtectedPageProtector, ProtectedPageProtector } from "./components";
import React, { useEffect } from "react";
import { cookieUtil } from "./utils";
import { ACCESS_TOKEN_KEY_NAME, REFRESH_TOKEN_KEY_NAME } from "./constant";
import { initSocket } from "./config";
import { initChatSocketEvents, initVideoSocketEvents } from "./features";

// Lazy load non-protected page
const Home = React.lazy(() => import('./pages/nonProtectedIndex').then(module => ({ default: module.default.Home })))
const LoginPage = React.lazy(() => import('./pages/nonProtectedIndex').then(module => ({ default: module.default.LoginPage })));
const RegisterPage = React.lazy(() => import('./pages/nonProtectedIndex').then(module => ({ default: module.default.RegisterPage })));
const Contact = React.lazy(() => import('./pages/nonProtectedIndex').then(module => ({ default: module.default.Contact })));

// Lazy loading protected page
const ChatsPage = React.lazy(() => import('./pages/protectedIndex').then(module => ({ default: module.default.ChatsPage })));
const ChimeProfilePage = React.lazy(() => import('./pages/protectedIndex').then(module => ({ default: module.default.ChimeProfilePage })));
const VideoCallPage = React.lazy(() => import('./pages/protectedIndex').then(module => ({ default: module.default.VideoCallPage })));

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

      <Routes>
        <Route path="/" element={<Layout />}>
          // Non-Protected page
          <Route index element={<NonProtectedPageProtector><Home /></NonProtectedPageProtector>} />
          <Route path="/contact" element={<NonProtectedPageProtector><Contact /></NonProtectedPageProtector>} />
          <Route path="/login" element={<NonProtectedPageProtector><LoginPage /></NonProtectedPageProtector>} />
          <Route path="/register" element={<NonProtectedPageProtector><RegisterPage /></NonProtectedPageProtector>} />

            // Protected page
          <Route path="/chats" element={<ProtectedPageProtector><ChatsPage /></ProtectedPageProtector>} />
          <Route path="/video-calls" element={<ProtectedPageProtector><VideoCallPage /></ProtectedPageProtector>} />
          <Route path="/profile" element={<ProtectedPageProtector><ChimeProfilePage /></ProtectedPageProtector>} />

        </Route>
      </Routes>


    </>
  )
}

export default App