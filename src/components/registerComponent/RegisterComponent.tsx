// Import All the necessary dependencies here
import React from "react";
import ComponentForLoginAndResgisterComponentForTop from "../ComponentForLoginAndResgisterComponentForTop/ComponentForLoginAndResgisterComponentForTop"
import LoginWithGoogleComponent from "../LoginWithGoogleComponent/LoginWithGoogleComponent";


/**
 * Register main component
 * @returns JSX
 */
const RegisterComponent: React.ComponentType = () => {
  return (
    <div className="chime-register-container">
      <ComponentForLoginAndResgisterComponentForTop
        title="Sign Up To Your Account"
        secondTitle="Already have Account?    " 
        path="/login"
        name="login"
        LoginWithGoogleComponent={LoginWithGoogleComponent} />
    </div>
  )
}

export default RegisterComponent;
