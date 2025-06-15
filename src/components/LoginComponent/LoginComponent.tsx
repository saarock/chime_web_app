// Import All the necessary dependencies here
import React, { JSX } from "react";
import "../../styles/components/LoginComponent.css";
import ComponentForLoginAndResgisterComponentForTop from "../ComponentForLoginAndResgisterComponentForTop/ComponentForLoginAndResgisterComponentForTop";
import LoginWithGoogleComponent from "../LoginWithGoogleComponent/LoginWithGoogleComponent";

/**
 * Chime higher level component
 * @returns JSX
 */
const LoginComponent: React.ComponentType = (): JSX.Element => {
  return (
    <div className="chime-login-container">
      <ComponentForLoginAndResgisterComponentForTop
        title="Sign In To Your Account"
        LoginWithGoogleComponent={LoginWithGoogleComponent}
      />
    </div>
  );
};

export default LoginComponent;
