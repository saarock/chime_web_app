// Import All the necessary dependencies here

import ComponentForLoginAndResgisterComponentForTop from "../componentForLoginAndResgisterComponentForTop/componentForLoginAndResgisterComponentForTop"




/**
 * 
 * @returns JSX
 */
const RegisterComponent = () => {
  return (
    <div className="chime-login-container">
      <ComponentForLoginAndResgisterComponentForTop title="Sign Up To Your Account" secondTitle="Already have Account?   " path="/login" name="login"/>
    </div>
  )
}

export default RegisterComponent