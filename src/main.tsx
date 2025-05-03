import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux"; // import provider to reflect the stores at all the pages and components
import store from "./apps/store.ts";
import { SocketProvider } from "./apps/index.ts";
import {GoogleOAuthProvider} from "@react-oauth/google";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      
      <SocketProvider>
        <GoogleOAuthProvider clientId={`${import.meta.env.VITE_GOOGLE_CLIENT_ID}`}>
        <App/> 
        </GoogleOAuthProvider>

      </SocketProvider>
    </Provider>
  </StrictMode>,
);
