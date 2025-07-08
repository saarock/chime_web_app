// Import all the necessary dependencies here
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { serverLoginWithGoogle } from "../../apps";
import { AppDispatch } from "../../apps/store";
import "../../styles/components/LoginWithGoogle.css";
import React, { JSX } from "react";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import { useErrorHandlerAtPageAndComponentLevel, useLoading } from "../../hooks";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";


/**
 *
 * @returns Google Login button with response
 */
const LoginWithGoogleComponent: React.ComponentType = (): JSX.Element => {
  // All the hooks goes here
  const { isLoading } = useLoading();
  const dispatch = useDispatch<AppDispatch>();
  const { setErrorMessageFallBack } = useErrorHandlerAtPageAndComponentLevel();
  const navigate = useNavigate();

  /**
   *
   * @param credentialsResponse [Google credentials with client-id]
   * @returns {void}
   */
  const loginWithGoogle = async (credentialsResponse: CredentialResponse) => {
    // check the credentials propery if not fount then show one message and return
    if (!credentialsResponse.credential || !credentialsResponse.clientId) {
      toast.info("No credentials found, Pleased try again later!");
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
      navigate("/video-calls", { replace: true });     // dont show the prev history before login and after login to the user
    } catch (error) {
      setErrorMessageFallBack(error);
      console.error(
        "Dispatch error",
        error instanceof Error ? error.message : error,
      );
    }
  };

  return (
    <div className="chime-login-with-google-container">
      <div className="chime-login-with-google-child-container">
        {isLoading ? (
          // Show the loading component if the isLoading is true
          <LoadingComponent />
        ) : (
          // Other-wise render the googleLogin component
          <GoogleLogin
            useOneTap={true}
            onSuccess={(credentialResponse) => loginWithGoogle(credentialResponse)}
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
