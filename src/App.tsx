// Start: Import necessary dependencies

import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
// import { Contact, Home, LoginPage, RegisterPage } from "./pages/nonProtectedIndex";
import {
  NonProtectedPageProtector,
  ProtectedPageProtector,
} from "./components";
import {
  ChimeProfilePage,
  ContactPage,
  HomePage,
  LoginPage,
  NotFound
  ,
  VideoCallPage
} from "./lazyLoadingForPages";

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
            <NonProtectedPageProtector>
              <NotFound />
            </NonProtectedPageProtector>

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
