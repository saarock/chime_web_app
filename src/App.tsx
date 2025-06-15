// Start: Import necessary dependencies

import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
// import { Contact, Home, LoginPage, RegisterPage } from "./pages/nonProtectedIndex";
import {
  NonProtectedPageProtector,
  ProtectedPageProtector,
} from "./components";
import React from "react";

// Lazy load non-protected page
const HomePage = React.lazy(() =>
  import("./pages/nonProtectedIndex").then((module) => ({
    default: module.default.Home,
  })),
);
const LoginPage = React.lazy(() =>
  import("./pages/nonProtectedIndex").then((module) => ({
    default: module.default.LoginPage,
  })),
);

const ContactPage = React.lazy(() =>
  import("./pages/nonProtectedIndex").then((module) => ({
    default: module.default.ContactPage,
  })),
);

// Lazy loading protected page
// const ChatsPage = React.lazy(() =>
//   import("./pages/protectedIndex").then((module) => ({
//     default: module.default.ChatsPage,
//   })),
// );
const ChimeProfilePage = React.lazy(() =>
  import("./pages/protectedIndex").then((module) => ({
    default: module.default.ChimeProfilePage,
  })),
);
const VideoCallPage = React.lazy(() =>
  import("./pages/protectedIndex").then((module) => ({
    default: module.default.VideoCallPage,
  })),
);

const NotFound = React.lazy(() =>
  import("./pages/FallBackIndex").then((module) => ({
    default: module.default.NotFound,
  })),
);

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
          // Non-Protected page
        <Route
          index
          element={
            <NonProtectedPageProtector>
              <HomePage />
            </NonProtectedPageProtector>
          }
        />
        <Route
          path="/contact"
          element={
            <NonProtectedPageProtector>
              <ContactPage />
            </NonProtectedPageProtector>
          }
        />
        <Route
          path="/login"
          element={
            <NonProtectedPageProtector>
              <LoginPage />
            </NonProtectedPageProtector>
          }
        />

        <Route
          path="*"
          element={
            <ProtectedPageProtector>
              <NotFound />
            </ProtectedPageProtector>

          }
        />


          // Protected page
        <Route
          path="/video-calls"
          element={
            <ProtectedPageProtector>
              <VideoCallPage />
            </ProtectedPageProtector>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedPageProtector>
              <ChimeProfilePage />
            </ProtectedPageProtector>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
