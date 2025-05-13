// Import All the necessary dependencies here
import "../../styles/index";
import ComponentForLoginAndResgisterComponentForTop from "../ComponentForLoginAndResgisterComponentForTop/ComponentForLoginAndResgisterComponentForTop"
import LoginWithGoogleComponent from "../loginWithGoogleComponent/LoginWithGoogleComponent";


/**
 * 
 * @returns JSX
 */
const LoginComponent = () => {
  return (
    <div className="chime-login-container">
      <ComponentForLoginAndResgisterComponentForTop title="Sign In To Your Account" secondTitle="Don't have Account?   " path="/register" name="register" LoginWithGoogleComponent={LoginWithGoogleComponent} />
    </div>
  )
}

export default LoginComponent