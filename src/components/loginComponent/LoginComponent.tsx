// Import All the necessary dependencies here
import "../../styles/index";
import ComponentForLoginAndResgisterComponentForTop from "../componentForLoginAndResgisterComponentForTop/ComponentForLoginAndResgisterComponentForTop"


/**
 * 
 * @returns JSX
 */
const LoginComponent = () => {
  return (
    <div className="chime-login-container">
      <ComponentForLoginAndResgisterComponentForTop title="Sign In To Your Account" secondTitle="Don't have Account?   " path="/register" name="register" />
    </div>
  )
}

export default LoginComponent