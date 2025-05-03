// Import All the necessary dependencies here

import ComponentForLoginAndResgisterComponentForTop from "../componentForLoginAndResgisterComponentForTop/componentForLoginAndResgisterComponentForTop"
import LoginWithGoogleComponent from "../loginWithGoogleComponent/LoginWithGoogleComponent"



/**
 * 
 * @returns JSX
 */
const RegisterComponent = () => {
  return (
    <div className="chime-login-container">
      <ComponentForLoginAndResgisterComponentForTop title="Sign Un To Your Account" secondTitle="Already have Account?   " path="/login" name="login"/>
        <LoginWithGoogleComponent />
    </div>
  )
}

export default RegisterComponent