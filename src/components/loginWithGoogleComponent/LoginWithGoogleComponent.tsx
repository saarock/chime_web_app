// <LoginWithGoogle /> 

// Import all the necessary dependencies here
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { serverLoginWithGoogle } from "../../apps";
import { AppDispatch } from "../../apps/store";
import "../../styles";
import { useNavigate } from "react-router";



/**
 * 
 * @returns Google Login button with response
 */
const LoginWithGoogleComponent = () => {
  const navigate = useNavigate();


  const dispatch = useDispatch<AppDispatch>();

  const loginWithGoogle = async (credentialsResponse: CredentialResponse) => {
    try {
      // check the credentials propery if not fount then show one message and return
      if (!credentialsResponse.credential || !credentialsResponse.clientId) {
        alert("No credentials found");
        return;
      }


      // after checking the credentials loginFromTheGoogle
      await dispatch(serverLoginWithGoogle({
        credentials: credentialsResponse.credential,
        clientId: credentialsResponse.clientId
      }));

      // if user login successfully navigate to the chats
      navigate("/chats")
      


    } catch (error) {
      console.error("Dispatch error", error);
    }
  };

  return (
<div className="chime-login-with-google-container">
  <div className="chime-login-with-google-child-container">
  <GoogleLogin
      onSuccess={(e) => loginWithGoogle(e)}
      onError={() => {
        console.error("Login Failed");
      }}
    />
  </div>
</div>
  );
};

export default LoginWithGoogleComponent;
