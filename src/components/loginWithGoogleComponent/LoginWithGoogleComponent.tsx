// Import all the necessary dependencies here
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { serverLoginWithGoogle } from "../../apps";
import { AppDispatch } from "../../apps/store";
import "../../styles/components/LoginWithGoogle.css";
import React, { JSX, useState } from "react";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import { toast } from "react-toastify";

/**
 *
 * @returns Google Login button with response
 */
const LoginWithGoogleComponent: React.ComponentType = (): JSX.Element => {
  // All the hooks goes here
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  /**
   *
   * @param credentialsResponse [Google credentials with client-id]
   * @returns {void}
   */
  const loginWithGoogle = async (credentialsResponse: CredentialResponse) => {
    setLoading(true);
    // check the credentials propery if not fount then show one message and return
    if (!credentialsResponse.credential || !credentialsResponse.clientId) {
      alert("No credentials found");
      return;
    }
    try {



      // after checking the credentials loginFromTheGoogle
      await dispatch(
        serverLoginWithGoogle({
          credential: credentialsResponse.credential,
          clientId: credentialsResponse.clientId,
        }),
      ).unwrap();

      // if user login successfully navigate to the chats
      window.location.replace("/video-calls"); // dont show the prev history before login and after login to the user
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed");
      console.error(
        "Dispatch error",
        error instanceof Error ? error.message : error,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chime-login-with-google-container">
      <div className="chime-login-with-google-child-container">
        {loading ? (
          <LoadingComponent />
        ) : (
          <GoogleLogin
            useOneTap={true}
            onSuccess={(e) => loginWithGoogle(e)}
            onError={() => {
              console.error("Login Failed");
            }}
          />
        )}
      </div>
    </div>
  );
};

export default LoginWithGoogleComponent;
