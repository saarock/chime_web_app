
// Start: Import necessary dependencies

import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
// import { Contact, Home, LoginPage, RegisterPage } from "./pages/nonProtectedIndex";
import { NonProtectedPageProtector, ProtectedPageProtector } from "./components";
import React from "react";


// Lazy load non-protected page
const HomePage = React.lazy(() => import('./pages/nonProtectedIndex').then(module => ({ default: module.default.Home })))
const LoginPage = React.lazy(() => import('./pages/nonProtectedIndex').then(module => ({ default: module.default.LoginPage })));
const RegisterPage = React.lazy(() => import('./pages/nonProtectedIndex').then(module => ({ default: module.default.RegisterPage })));
const ContactPage = React.lazy(() => import('./pages/nonProtectedIndex').then(module => ({ default: module.default.ContactPage })));

// Lazy loading protected page
const ChatsPage = React.lazy(() => import('./pages/protectedIndex').then(module => ({ default: module.default.ChatsPage })));
const ChimeProfilePage = React.lazy(() => import('./pages/protectedIndex').then(module => ({ default: module.default.ChimeProfilePage })));
const VideoCallPage = React.lazy(() => import('./pages/protectedIndex').then(module => ({ default: module.default.VideoCallPage })));

const App = () => {


  return (

    <div>

      <Routes>
        <Route path="/" element={<Layout />}>
          // Non-Protected page
          <Route index element={<NonProtectedPageProtector><HomePage /></NonProtectedPageProtector>} />
          <Route path="/contact" element={<NonProtectedPageProtector><ContactPage /></NonProtectedPageProtector>} />
          <Route path="/login" element={<NonProtectedPageProtector><LoginPage /></NonProtectedPageProtector>} />
          <Route path="/register" element={<NonProtectedPageProtector><RegisterPage /></NonProtectedPageProtector>} />

            // Protected page
          <Route path="/chats" element={<ProtectedPageProtector><ChatsPage /></ProtectedPageProtector>} />
          <Route path="/video-calls" element={<ProtectedPageProtector><VideoCallPage /></ProtectedPageProtector>} />
          <Route path="/profile" element={<ProtectedPageProtector><ChimeProfilePage /></ProtectedPageProtector>} />

        </Route>
      </Routes>


    </div>
  )
}

export default App