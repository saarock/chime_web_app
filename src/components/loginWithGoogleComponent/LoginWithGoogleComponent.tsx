// <LoginWithGoogle /> 

// Import all the necessary dependencies here
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { serverLoginWithGoogle } from "../../apps";
import { AppDispatch } from "../../apps/store";
import "../../styles";
import { useState } from "react";
import LoadingComponent from "../loadingComponent/LoadingComponent";
import { toast } from "react-toastify";



/**
 * 
 * @returns Google Login button with response
 */
const LoginWithGoogleComponent = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  

  const loginWithGoogle = async (credentialsResponse: CredentialResponse) => {
    setLoading(true);
    // check the credentials propery if not fount then show one message and return
    if (!credentialsResponse.credential || !credentialsResponse.clientId) {
      alert("No credentials found");
      return;
    }
    try {

      // after checking the credentials loginFromTheGoogle
      await dispatch(serverLoginWithGoogle({
        credentials: credentialsResponse.credential,
        clientId: credentialsResponse.clientId
      })).unwrap();

      // if user login successfully navigate to the chats
      window.location.replace("/chats"); // dont show the prev history before login and after login to the user
    } catch (error) {

      toast.error(error instanceof Error ? error.message : "Login failed");
      console.error("Dispatch error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chime-login-with-google-container">
      <div className="chime-login-with-google-child-container">
        {
          loading ? <LoadingComponent /> : <GoogleLogin
            onSuccess={(e) => loginWithGoogle(e)}
            onError={() => {
              console.error("Login Failed");
            }}
          />
        }
      </div>
    </div>
  );
};

export default LoginWithGoogleComponent;
